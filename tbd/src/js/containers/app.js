import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from '../components/dropzone';

class App extends React.Component {

    renderDropzone() {
        const options = {
            autoProcessQueue: false,
            uploadMultiple: true,
            url: '/test'
        };

        const events = {

        };

        return (
            <Dropzone
                dropzoneOptions={options}
                dropzoneEvents={events}
            />
        );
    }

    render() {
        return <div>
            <h1>Initial Setup</h1>

            {this.renderDropzone()}
        </div>
    }
}

export default connect(
    (state) => {
        return {};
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({}, dispatch)
        };
    }
)(App);
