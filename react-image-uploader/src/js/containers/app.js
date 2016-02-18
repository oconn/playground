import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileUploader from '../components/file-uploader';

class App extends React.Component {

    renderDropzone() {
        return <FileUploader
            multiple={true}
            url="http://localhost:8081/test"
            thumbnailWidth="150px"
            thumbnailHeight="150px"
        />
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
