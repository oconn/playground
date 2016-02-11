import React, { PropTypes } from 'react';
import Task from 'data.task';
import Loading from './loading';

const uploadStates = {
    PENDING: 'PENDING',
    UPLOADING: 'UPLOADING',
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

    getFile() {
        return this.props.file;
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

                <button onClick={this.props.removeFile}
                    className="remove-item-btn">Remove
                </button>
            </div>
        );
    }
}
