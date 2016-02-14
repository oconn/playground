import React, { PropTypes } from 'react';
import cx from 'classnames';
import {
    add,
    append,
    equals,
    filter,
    head,
    identity,
    isEmpty,
    map,
    not,
    omit,
    prop,
    replace,
    subtract
} from 'ramda';
import DropzoneThumbnail from './dropzone-thumbnail';
import request from 'superagent';
import Task from 'data.task';

const uploadStates = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    PAUSED: 'PAUSED',
    COMPLETE: 'COMPLETE'
};

export default class Dropzone extends React.Component {

    static propTypes = {
        autoUpload: PropTypes.bool,
        multiple: PropTypes.bool,
        numberConcurrent: PropTypes.number,
        onClick: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        renderImageThumbnails: PropTypes.bool,
        thumbnailHeight: PropTypes.string,
        thumbnailWidth: PropTypes.string,
        url: PropTypes.string.isRequired,
        xhrMethod: PropTypes.oneOf(['post', 'put'])
    };

    static defaultProps = {
        autoUpload: false,
        multiple: false,
        numberConcurrent: 3,
        onClick: identity,
        onDragEnter: identity,
        onDragLeave: identity,
        onDrop: identity,
        renderImageThumbnails: true,
        thumbnailHeight: 200,
        thumbnailWidth: 200,
        xhrMethod: 'post'
    };

    constructor(props, context) {
        super(props);

        this.state = {
            files: [],
            numberQueued: 0,
            supportsFileAPI: true,
            uploadState: uploadStates.PENDING
        }
    }

    componentDidMount() {
        const { File, FileList, FileReader } = window;

        if (!File || !FileList || !FileReader) {
            this.setState({ supportsFileAPI: false });
        }

        this.refs.hiddenInput.addEventListener('change', ::this.onFilesAdded, false);

        window.addEventListener('dragover', this.preventBrowserDefault, false);
        window.addEventListener('drop', this.preventBrowserDefault, false);
    }

    componentWillUnmount() {
        this.refs.hiddenInput.removeEventListener('change', this.onFilesAdded);

        window.removeEventListener('dragover', this.preventBrowserDefault);
        window.removeEventListener('drop', this.preventBrowserDefault);
    }

    componentDidUpdate(prevProps, prevState) {
        const { numberQueued, uploadState } = this.state;
        const { numberConcurrent } = this.props;
        const { numberQueued: previousQueueCount } = prevState;

        if (numberQueued < numberConcurrent && equals(uploadState, uploadStates.IN_PROGRESS)) {
            this.uploadNext();
        }

        if (previousQueueCount > 0 && equals(numberQueued, 0) && uploadStates.IN_PROGRESS) {
            this.setState({ uploadState: uploadStates.COMPLETE });
        }
    }

    /**
     * Prevents dropped items form opening in new window.
     *
     * @param {Event} e event
     * @method preventBrowserDefault
     * @return {undefined} undefined
     */
    preventBrowserDefault(e) {
        e.preventDefault();
    }

    /**
     * onClick event:
     *
     * @param {Event} e event
     * @method onClick
     * @return {undefined} undefined
     */
    onClick(e) {
        this.refs.hiddenInput.click();
        this.props.onClick(e);
    }

    /**
     * onDragEnter event:
     *
     * @param {Event} e event
     * @method onDragEnter
     * @return {undefined} undefined
     */
    onDragEnter(e) {
        this.props.onDragEnter(e);
    }

    /**
     * onDragLeave event:
     *
     * @param {Event} e event
     * @method onDragLeave
     * @return {undefined} undefined
     */
    onDragLeave(e) {
        this.props.onDragLeave(e);
    }

    /**
     * onDrop event: Sets files to state.
     *
     * @param {Event} e event
     * @method onDrop
     * @return {undefined} undefined
     */
    onDrop(e) {
        const files = this.getFilesFromEvent(e);

        this.setState({ files: this.filesToThumbnails(files) }, () => {
            this.props.onDrop(files, e);
        });
    }

    /**
     * onFilesAdded event: Custom event used to handel click to add files.
     *
     * @param {Event} e event
     * @method onFilesAdded
     * @return {undefined} undefined
     */
    onFilesAdded(e) {
        const files = this.getFilesFromEvent(e);

        this.setState({ files: this.filesToThumbnails(files) });
    }

    /**
     * Pulls any files out of an event if they exist.
     *
     * @param {Event} e event
     * @method getFilesFromEvent
     * @return {Array} File
     */
    getFilesFromEvent(e) {
        return this.fileListToFiles(e.target.files || e.dataTransfer.files);
    }

    /**
     * Returns the react element by parsing the file and querying refs.
     *
     * @param {Object} file object
     * @method getFileRef
     * @return {Element} component
     */
    getFileRef(file) {
        return this.refs[file.key];
    }

    /**
     * Iterates through a filelist provided to an event and
     * reads each file returning them in array.
     *
     * @param {Files} fileList FileList
     * @method fileListToFiles
     * @return {Array} Files
     */
    fileListToFiles(fileList) {
        const numFiles = fileList.length;
        let files = [];

        for (let i = 0; i < numFiles; i++) {
            files = append(fileList.item(i), files);
        }

        return files;
    }

    filesToThumbnails(files) {
        const { thumbnailHeight, thumbnailWidth } = this.props;

        return map(file => {
            const thumbnailKey = this.generateFileSpecificKey(file);

            return {
                key: thumbnailKey,
                file: file,
                removeFile: this.removeFile.bind(this, thumbnailKey),
                thumbnailHeight: thumbnailHeight,
                thumbnailWidth: thumbnailWidth
            };
        }, files);
    }

    /**
     * Generates a unique, consistant, key based on a files properties.
     *
     * @param {File} file File Object
     * @method generateFileSpecificKey
     * @return {String} key
     */
    generateFileSpecificKey(file) {
        const sanitizedFilename = replace(/\W/g, '', file.name);

        return `${sanitizedFilename}-${file.size}`;
    }

    /**
     * Removes a selected file before upload.
     *
     * @param {String} thumbnailKey Thumbnail key
     * @method removeFile
     * @return {undefined} undefined
     */
    removeFile(thumbnailKey) {
        const files = filter(currentFile => {
            return not(equals(thumbnailKey, prop('key', currentFile)));
        }, this.state.files);

        this.setState({ files: files });
    }

    getOnDeck() {
        const isPending = file => {
            const ref = this.getFileRef(file);

            return (ref.getFileState() === uploadStates.PENDING);
        };

        return head(filter(isPending, this.state.files));
    }

    uploadFile(file) {
        return new Task((reject, resolve) => {
            const { FormData } = window;
            const { xhrMethod, url } = this.props;
            const formData = new FormData();
            const ref = this.getFileRef(file);

            formData.append(file.name, file, file.name);

            const fileProgress = (event) => ref.updateProgress(event.percent);
            const fileComplete = () => ref.markSuccess();
            const fileError = () => ref.markFailure();
            const fileAbort = () => ref.markCanceled();

            request[xhrMethod](url)
                .send(formData)
                .on('progress', fileProgress)
                .end((err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        fileComplete();
                        resolve(response);
                    }
                });
        });
    }

    uploadComplete() {
        this.setState({
            numberQueued: subtract(this.state.numberQueued, 1)
        });
    }

    reportFileError(file, error) {
        // TODO handle error
        this.uploadComplete()
    }

    reportFileSuccess(file, success) {
        this.uploadComplete()
    }

    uploadNext() {
        const { numberQueued } = this.state;
        const file = this.getOnDeck();

        if (not(file)) {
            return null;
        }

        const ref = this.getFileRef(file);

        ref.startUpload();

        this.setState({
            numberQueued: add(numberQueued, 1)
        }, () => {
            this.uploadFile(file).fork(
                this.reportFileError.bind(this, file),
                this.reportFileSuccess.bind(this, file)
            );
        });
    }

    /**
     * Renders instructions for selecting files.
     *
     * @method renderInstructions
     * @return {Element} element
     */
    renderInstructions() {
        return (
            <div className="instructions">
                <p>Drap and drop</p>

                <button className="file-select-btn"
                    onClick={::this.onClick}>or click here</button>

                <p>to upload your images.</p>
            </div>
        );
    }

    /**
     * Starts the upload process
     *
     * @method startUpload
     * @return {undefined} undefined
     */
    startUpload() {
        this.setState({ uploadState: uploadStates.IN_PROGRESS });
    }

    /**
     * Pauses the upload process
     *
     * @method pauseUpload
     * @return {undefined} undefined
     */
    pauseUpload() {
        this.setState({ uploadState: uploadStates.PAUSED });
    }

    /**
     * Marks the upload process as complete
     *
     * @method completeUpload
     * @return {undefined} undefined
     */
    completeUpload() {
        this.setState({ uploadState: uploadStates.COMPLETE });
    }

    /**
     * Renders the upload button for non auto upload dropzones.
     *
     * @method renderUploadButton
     * @return {Element} element
     */
    renderUploadButton() {
        const { autoUpload } = this.props;
        const { files, uploadState } = this.state;
        const uploadInProgress = uploadState === uploadStates.UPLOADING;

        return (not(isEmpty(files)) && not(autoUpload)) ? (
            <button className="upload-files-btn"
                onClick={::this.startUpload}
                disabled={uploadInProgress}>
                {uploadInProgress ? 'Uploading' : 'Start Upload'}
            </button>
        ) : null;
    }

    /**
     * Renders the files stored in state.
     *
     * @method renderSelectedFiles
     * @return {Element} element
     */
    renderSelectedFiles() {
        const { uploadState } = this.state;
        const { files } = this.state;

        if (isEmpty(files)) {
            return this.renderInstructions();
        }

        return (

            <div className="thumbnail-preview-container">
                {map(file => {
                    const props = omit(['key'], file);

                    return (
                        <DropzoneThumbnail
                            key={file.key}
                            ref={file.key}
                            uploadInProgress={uploadState === uploadStates.IN_PROGRESS}
                            {...props}
                        />
                    );
                }, files)}
            </div>
        );
    }

    render() {
        const { multiple } = this.props;
        const className = cx('dropzone-container', this.props.className);

        return (
            <div className={className}
                onDragEnter={::this.onDragEnter}
                onDragLeave={::this.onDragLeave}
                onDrop={::this.onDrop}
            >
                <input type="file"
                    ref="hiddenInput"
                    name="files[]"
                    multiple={multiple}
                    style={{ display: 'none' }}
                />

                {this.renderUploadButton()}

                <div className="preview-container">
                    {this.renderSelectedFiles()}
                </div>
            </div>
        );
    }
}
