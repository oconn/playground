import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeGithubAPIRoutes } from '../actions/github';
import { keys, length, prop } from 'ramda';

class App extends React.Component {

    componentDidMount() {
        this.props.actions.initializeGithubAPIRoutes();
    }

    render() {
        return length(keys(this.props.githubApi)) ? (
            <div className="app-wrapper">
                {this.props.children}
            </div>
        ) : null;
    }
}

export default connect(
    (state) => {
        return {
            githubApi: prop('githubAPI', state)
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({ initializeGithubAPIRoutes }, dispatch)
        };
    }
)(App);
