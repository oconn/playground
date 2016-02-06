import React, { PropTypes } from 'react';
import cx from 'classnames';
import { append, difference, filter, identity, map, merge, replace, test } from 'ramda';
import Task from 'data.task';

export default class Dropzone extends React.Component {

    static propTypes = {
        multiple: PropTypes.bool,
        onClick: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        renderImageThumbnails: PropTypes.bool
    };

    static defaultProps = {
        multiple: false,
        onClick: identity,
        onDragEnter: identity,
        onDragLeave: identity,
        onDrop: identity,
        renderImageThumbnails: true
    };

    constructor(props, context) {
        super(props);

        this.state = {
            supportsFileAPI: true,
            files: [],
            thumbnails: {}
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
     * Generates an image element used as a thumbnail.
     *
     * @param {File} file File object
     * @method generateThumbnail
     * @return {Element} image element
     */
    generateThumbnail(file) {
        return new Task((reject, resolve) => {
            const { FileReader } = window;
            const reader = new FileReader();

            reader.onload = e => {
                const dataURL = e.target.result;

                resolve(<img className="thumbnail" src={dataURL} />);
            }

            reader.onerror = e => {
                reject(<div>ERROR</div>);
            }

            reader.readAsDataURL(file);
        });
    }

    renderTextPreview(file) {
        return (
            <div className="text-preview-item" key={this.generateFileSpecificKey(file)}>
                <p className="filename">{file.name}</p>
            </div>
        );
    }

    renderThumbnailPreview(file) {
        const thumbnailKey = this.generateFileSpecificKey(file);
        const ThumbnailComponent = this.state.thumbnails[thumbnailKey];

        console.log(ThumbnailComponent);

        if (!ThumbnailComponent) {
            const { thumbnails } = this.state;

            // this.generateThumbnail(file).fork((ErrorComponent) => {
            //     const error = { [thumbnailKey]: ErrorComponent };

            //     this.setState({ thumbnails: merge(thumbnails, error) });
            // }, (ImageComponent) => {
            //     const thumbnail = { [thumbnailKey]: ImageComponent };

            //     this.setState({ thumbnails: merge(thumbnails, thumbnail) });
            // });
        }

        return <ThumbnailComponent key={thumbnailKey} /> ||
            <div className="loading" key={thumbnailKey}>Loading</div>;
    }

    renderSelectedFiles() {
        const { renderImageThumbnails } = this.props;
        const { files } = this.state;
        const images = filter(file => test(/^image/, file.type))(files);
        const otherMedia = difference(files, images);

        return renderImageThumbnails ? (
            <div className="preview-container">
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
                    {map(file => this.renderFilePreview(file), files)}
                </div>
            </div>
        );
    }

    render() {
        const { multiple } = this.props;
        const className = cx('dropzone-container', this.props.className);

        return (
            <div className={className}
                onClick={::this.onClick}
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

                {this.renderSelectedFiles()}
            </div>
        );
    }
}
