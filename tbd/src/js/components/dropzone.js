import React, { PropTypes } from 'react';
import cx from 'classnames';
import {
    append,
    difference,
    equals,
    filter,
    identity,
    isEmpty,
    map,
    not,
    replace,
    test
} from 'ramda';
import DropzoneThumbnail from './dropzone-thumbnail';
import request from 'superagent';
import { forEachIndexed } from '../helpers/utils';
import Task from 'data.task';

export default class Dropzone extends React.Component {

    static propTypes = {
        autoUpload: PropTypes.bool,
        multiple: PropTypes.bool,
        onClick: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        renderImageThumbnails: PropTypes.bool,
        thumbnailHeight: PropTypes.number,
        thumbnailWidth: PropTypes.number,
        url: PropTypes.string.isRequired,
        xhrMethod: PropTypes.oneOf(['post', 'put'])
    };

    static defaultProps = {
        autoUpload: false,
        multiple: false,
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
            supportsFileAPI: true,
            files: []
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

        this.setState({ files: files }, () => {
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
        this.setState({ files: this.getFilesFromEvent(e) });
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
     * @param {Object} file File object
     * @method removeFile
     * @return {undefined} undefined
     */
    removeFile(file) {
        const files = filter(currentFile => not(equals(file, currentFile)), this.state.files);

        this.setState({ files: files });
    }

    uploadFiles() {
        return new Task((reject, resolve) => {
            const { FormData, File } = window;

            const { xhrMethod, url } = this.props;
            const { files } = this.state;

            const formData = new FormData();

            forEachIndexed((file, idx) => {
                if (file instanceof File) {
                    formData.append(idx, file, file.name);
                }
            }, files);

            request[xhrMethod](url)
                .send(formData)
                .end((err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
        });
    }

    /**
     * Renders the text preview of a file.
     *
     * @param {File} file File object
     * @method renderTextPreview
     * @return {Element} element
     */
    renderTextPreview(file) {
        // TODO Merge with ThumbnailPreview or maybe not...
        return (
            <div className="text-preview-item" key={this.generateFileSpecificKey(file)}>
                <p className="filename">{file.name}</p>
            </div>
        );
    }

    /**
     * Renders the thumbnail preview of an image.
     *
     * @param {File} file File object
     * @method renderThumbnailPreview
     * @return {Element} element
     */
    renderThumbnailPreview(file) {
        const { thumbnailHeight, thumbnailWidth } = this.props;
        const thumbnailKey = this.generateFileSpecificKey(file);

        return (
            <DropzoneThumbnail key={thumbnailKey}
                file={file}
                removeFile={this.removeFile.bind(this, file)}
                thumbnailHeight={thumbnailHeight}
                thumbnailWidth={thumbnailWidth}
            />
        );
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
     * Renders the upload button for non auto upload dropzones.
     *
     * @method renderUploadButton
     * @return {Element} element
     */
    renderUploadButton() {
        const { files } = this.state;
        const { autoUpload } = this.props;

        const upload = () => {
            this.uploadFiles().fork((err) => {

            }, (res) => {

            });
        }

        return (not(isEmpty(files)) && not(autoUpload)) ? (
            <button className="upload-files-btn"
                onClick={upload}>
                Start Upload
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
        const { renderImageThumbnails } = this.props;
        const { files } = this.state;
        const images = filter(file => test(/^image/, file.type))(files);
        const otherMedia = difference(files, images);

        if (isEmpty(files)) {
            return this.renderInstructions();
        }

        return renderImageThumbnails ? (
            <div>
                <div className="thumbnail-preview-container">
                    {map(file => this.renderThumbnailPreview(file), images)}
                </div>

                <div className="text-preview-container">
                    {map(file => this.renderTextPreview(file), otherMedia)}
                </div>
            </div>
        ) : (
            <div className="preview-container">
                <div className="text-preview-container">
                    {map(file => this.renderTextPreview(file), files)}
                </div>
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
