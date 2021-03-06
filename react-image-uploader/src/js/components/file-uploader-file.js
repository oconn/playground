import React, { PropTypes } from 'react';
import Task from 'data.task';
import Loading from './loading';
import { contains, divide, multiply, test} from 'ramda';

const uploadStates = {
    PENDING: 'PENDING',
    UPLOADING: 'UPLOADING',
    UPLOAD_CANCELED: 'UPLOAD_CANCELED',
    UPLOAD_FAIL: 'UPLOAD_FAIL',
    UPLOAD_SUCCESS: 'UPLOAD_SUCCESS'
};

export default class FileUploaderFile extends React.Component {
    static propTypes = {
        file: PropTypes.object.isRequired,
        removeFile: PropTypes.func,
        thumbnailHeight: PropTypes.string,
        thumbnailWidth: PropTypes.string
    };

    static defaultProps = {
        removeFile: () => {},
        thumbnailHeight: '200px',
        thumbnailWidth: '200px'
    };

    static uploadStates = uploadStates;

    constructor(props, context) {
        super(props, context);

        this.state = {
            component: <Loading className="loading"/>,
            uploadProgress: 0,
            uploadState: uploadStates.PENDING
        };
    }

    componentDidMount() {
        this.loadThumbnail();
    }

    getFileState() {
        return this.state.uploadState;
    }

    hasUploaded() {
        const { uploadState } = this.state;
        const completedStates = [
            uploadStates.UPLOAD_CANCELED,
            uploadStates.UPLOAD_SUCCESS,
            uploadStates.UPLOAD_FAIL
        ];

        return contains(uploadState, completedStates);
    }

    updateProgress(percent) {
        this.setState({
            uploadProgress: percent
        });
    }

    updateUploadState(state) {
        this.setState({
            uploadState: state
        });
    }

    markCanceled() {
        this.updateUploadState(uploadStates.UPLOAD_CANCELED);
    }

    markFailure() {
        this.updateUploadState(uploadStates.UPLOAD_FAIL);
    }

    markSuccess() {
        this.updateUploadState(uploadStates.UPLOAD_SUCCESS);
    }

    startUpload() {
        this.updateUploadState(uploadStates.UPLOADING);
    }

    /**
     * Calls geerateThumbnail and handles the updating of the displayed
     * component
     *
     * @method loadThumbnail
     * @return {undefined} undefined
     */
    loadThumbnail() {
        this.generateThumbnail(this.props.file).fork((error) => {
            this.setState({
                component: <div>Error</div>
            });
        }, (dataURL) => {
            this.setState({
                component: <img className="thumbnail" src={dataURL} />
            });
        });
    }

    /**
     * Generates an image element used as a thumbnail.
     *
     * @param {File} file File object
     * @method generateThumbnail
     * @return {Task} task
     */
    generateThumbnail(file) {
        const { FileReader } = window;
        const reader = new FileReader();

        return new Task((reject, resolve) => {
            if (this.isImage(file)) {
                reader.onload = e => resolve(e.target.result);
                reader.onerror = e => reject();

                reader.readAsDataURL(file);
            } else {
                resolve();
            }
        });
    }

    /**
     * Tests if a file is of type image.
     *
     * @param {File} file file object
     * @method isImage
     * @return {Boolean}
     */
    isImage(file) {
        return test(/^image\//, file.type);
    }

    renderInfo() {
        const disabled = this.props.uploadInProgress;
        const { uploadState, uploadProgress } = this.state;
        const width = { width: `${uploadProgress}%` };
        let content;

        if (uploadState === uploadStates.PENDING) {
            content = (
                <button onClick={this.props.removeFile}
                    className="remove-item-btn"
                    disabled={disabled}>Remove
                </button>
            );
        }

        if (uploadState === uploadStates.UPLOADING) {
            content = (
                <div className="progress-bar-container">
                    <div style={ width } className="progress-bar-percent" />
                </div>
            );
        }

        if (uploadState === uploadStates.UPLOAD_SUCCESS) {
            content = (
                <div className="progress-bar-container">
                    <div style={ width }
                        className="progress-bar-percent">
                        <i className="fa fa-check done" />
                    </div>
                </div>
            );
        }

        return (
            <div className="thumbnail-info">
                {content}
            </div>
        );
    }

    renderFileDetails() {
        const {name, size, type} = this.props.file;

        const toMB = (bytes) => {
            const bytesInKB = 1024;
            const bytesInMB = multiply(bytesInKB, bytesInKB);

            return divide(bytes, bytesInMB);
        };

        return (
            <div className="file-details">
                <h3 className="file-name">{name}</h3>
                <p className="file-type">{type}</p>
                <p className="file-size">{toMB(size).toFixed(2)}MB</p>
            </div>
        );
    }

    renderProgressIndicator() {
        const { uploadProgress, uploadState } = this.state;
        const width = { width: `${uploadProgress}%` };
        const done = uploadState === uploadStates.UPLOAD_SUCCESS

        return (
            <div className="progress-bar-container">
                <div style={ width }
                    className="progress-bar-percent">
                    { done ? <i className="fa fa-check done" /> : null }
                </div>
            </div>
        );
    }

    render() {
        const { thumbnailHeight, thumbnailWidth } = this.props;

        const styles = {
            maxHeight: thumbnailHeight,
            maxWidth: thumbnailWidth
        }

        return (
            <div className="file-container">
                <div className="thumbnail-container">
                    {this.state.component}
                </div>

                <div className="file-information">
                    {this.renderFileDetails()}
                    {this.renderProgressIndicator()}
                </div>

                {/*this.renderInfo()*/}
            </div>
        );
    }
}
