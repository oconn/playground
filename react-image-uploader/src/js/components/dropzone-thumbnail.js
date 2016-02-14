import React, { PropTypes } from 'react';
import Task from 'data.task';
import Loading from './loading';

const uploadStates = {
    PENDING: 'PENDING',
    UPLOADING: 'UPLOADING',
    UPLOAD_CANCELED: 'UPLOAD_CANCELED',
    UPLOAD_FAIL: 'UPLOAD_FAIL',
    UPLOAD_SUCCESS: 'UPLOAD_SUCCESS'
};

export default class DropzoneThumbnail extends React.Component {
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
        this.generateThumbnail(this.props.file).fork((ErrorComponent) => {
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
        return new Task((reject, resolve) => {
            const { FileReader } = window;
            const reader = new FileReader();

            reader.onload = e => {
                resolve(e.target.result);
            }

            reader.onerror = e => {
                reject();
            }

            reader.readAsDataURL(file);
        });
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

    render() {
        const { thumbnailHeight, thumbnailWidth } = this.props;

        const styles = {
            height: thumbnailHeight,
            width: thumbnailWidth
        }

        return (
            <div className="thumbnail-preview-item">
                <div className="thumbnail-container" style={styles}>
                    {this.state.component}
                </div>

                {this.renderInfo()}
            </div>
        );
    }
}
