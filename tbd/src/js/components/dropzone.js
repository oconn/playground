import React, { PropTypes } from 'react';
import Dropzone from 'dropzone';
import { mapObjIndexed } from 'ramda';

class ReactDropzone extends React.Component {
    static propTypes = {
        dropzoneEvents: PropTypes.shape({
            addedfile: PropTypes.func,
            canceled: PropTypes.func,
            canceledmultiple: PropTypes.func,
            complete: PropTypes.func,
            completemultiple: PropTypes.func,
            dragend: PropTypes.func,
            dragenter: PropTypes.func,
            dragleave: PropTypes.func,
            dragover: PropTypes.func,
            dragstart: PropTypes.func,
            drop: PropTypes.func,
            error: PropTypes.func,
            maxfilesexceeded: PropTypes.func,
            maxfilesreached: PropTypes.func,
            processing: PropTypes.func,
            processingmultiple: PropTypes.func,
            removedfile: PropTypes.func,
            reset: PropTypes.func,
            sending: PropTypes.func,
            sendingmultiple: PropTypes.func,
            success: PropTypes.func,
            successmultiple: PropTypes.func,
            thumbnail: PropTypes.func,
            totaluploadprogress: PropTypes.func,
            uploadprogress: PropTypes.func,
            queuecomplete: PropTypes.func
        }),
        dropzoneOptions: PropTypes.shape({
            accept: PropTypes.func,
            acceptedFiles: PropTypes.string,
            addRemoveLinks: PropTypes.bool,
            autoProcessQueue: PropTypes.bool,
            autoQueue: PropTypes.bool,
            capture: PropTypes.oneOf([
                'camera',
                'microphone',
                'camcorder'
            ]),
            clickable: PropTypes.bool,
            createImageThumbnails: PropTypes.bool,
            dictCancelUpload: PropTypes.string,
            dictCancelUploadConfirmation: PropTypes.string,
            dictDefaultMessage: PropTypes.string,
            dictFallbackMessage: PropTypes.string,
            dictFallbackText: PropTypes.string,
            dictFileTooBig: PropTypes.string,
            dictInvalidFileType: PropTypes.string,
            dictMaxFilesExceeded: PropTypes.string,
            dictRemoveFile: PropTypes.string,
            dictRemoveFileConfirmation: PropTypes.string,
            dictResponseError: PropTypes.string,

            fallback: PropTypes.func,
            filesizeBase: PropTypes.number,
            forceFallback: PropTypes.bool,
            headers: PropTypes.object,
            hiddenInputContainer: PropTypes.string,
            ignoreHiddenFiles: PropTypes.bool,
            init: PropTypes.func,
            maxFiles: PropTypes.number,
            maxFilesize: PropTypes.number,
            maxThumbnailFilesize: PropTypes.number,
            method: PropTypes.string,
            parallelUploads: PropTypes.number,
            paramName: PropTypes.string,
            params: PropTypes.object,
            previewsContainer: PropTypes.string,
            previewTemplate: PropTypes.string,
            resize: PropTypes.func,
            thumbnailHeight: PropTypes.number,
            thumbnailWidth: PropTypes.number,
            uploadMultiple: PropTypes.bool,
            url: PropTypes.string.isRequired
        }).isRequired
    };

    static defaultProps = {
        dropzoneEvents: {},
        dropzoneOptions: {
            accept: (file, done) => {done()},
            acceptedFiles: null,
            addRemoveLinks: false,
            autoProcessQueue: true,
            autoQueue: true,
            capture: null,
            clickable: true,
            createImageThumbnails: true,
            dictCancelUpload: 'Cancel upload',
            dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
            dictDefaultMessage: 'Drop files here to upload',
            dictFallbackMessage: 'Your browser does not support drag\'n\'drop file uploads.',
            dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
            dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
            dictInvalidFileType: 'You can\'t upload files of this type.',
            dictMaxFilesExceeded: 'You can not upload any more files.',
            dictRemoveFile: 'Remove file',
            dictRemoveFileConfirmation: null,
            dictResponseError: 'Server responded with {{statusCode}} code.',
            filesizeBase: 1000,
            forceFallback: false,
            headers: {},
            hiddenInputContainer: 'body',
            ignoreHiddenFiles: true,
            init: () => {},
            maxFiles: null,
            maxFilesize: 256,
            maxThumbnailFilesize: 10,
            method: 'post',
            parallelUploads: 2,
            paramName: 'file',
            params: {},
            previewsContainer: null,
            previewTemplate: null,
            thumbnailHeight: 120,
            thumbnailWidth: 120,
            uploadMultiple: false
        }
    };

    componentDidMount() {
        this.initializeDropzone();
    }

    initializeDropzone() {
        const dropzone = new Dropzone('div#dropzone', this.props.dropzoneOptions);

        this.initializeEvents(dropzone);
    }

    initializeEvents(dropzone) {
        mapObjIndexed((event, eventName) => {
            dropzone.on(eventName, event);
        }, this.props.dropzoneEvents);
    }

    render() {
        return (
            <div id="dropzone">
                <i className="fa fa-camera fa-5x"/>
            </div>
        );
    }
}

export default ReactDropzone;
