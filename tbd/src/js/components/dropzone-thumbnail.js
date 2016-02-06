import React, { PropTypes } from 'react';
import Task from 'data.task';
import Loading from './loading';

export default class DropzoneThumbnail extends React.Component {
    static propTypes = {
        file: PropTypes.object.isRequired,
        thumbnailHeight: PropTypes.number,
        thumbnailWidth: PropTypes.number
    };

    constructor(props, context) {
        super(props, context);

        this.state = { component: <Loading /> };
    }

    componentDidMount() {
        this.loadThumbnail();
    }

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
     * @return {Element} image element
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
            display: 'flex',
            alignItems: 'center',
            height: thumbnailHeight,
            width: thumbnailWidth,
            justifyContent: 'center'
        };

        return (
            <div className="thumbnail-preview-item" style={styles}>
                {this.state.component}
            </div>
        );
    }
}
