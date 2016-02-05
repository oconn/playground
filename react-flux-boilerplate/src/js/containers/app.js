import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return <div>
            <h1>Initial Setup</h1>
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
