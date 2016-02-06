import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from '../components/dropzone';

class App extends React.Component {

    renderDropzone() {
        return <Dropzone
            multiple={true}
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
