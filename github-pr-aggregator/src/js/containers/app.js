import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeGithubAPIRoutes } from '../actions/github';
import { initializeConfig } from '../actions/config';
import { keys, length, prop } from 'ramda';
import Navbar from '../components/navbar';

class App extends React.Component {

    componentDidMount() {
        this.props.actions.initializeGithubAPIRoutes();
        this.props.actions.initializeConfig();
    }

    onBootstrapComplete() {
        const loadedGithubAPI = length(keys(this.props.githubApi));
        const loadedConfig = this.props.config;

        return loadedGithubAPI && loadedConfig;
    }

    render() {
        return this.onBootstrapComplete() ? (
            <div className="app-wrapper">
                <Navbar />
                {this.props.children}
            </div>
        ) : null;
    }
}

export default connect(
    (state) => {
        return {
            config: state.config,
            githubApi: prop('githubAPI', state)
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                initializeConfig,
                initializeGithubAPIRoutes
            }, dispatch)
        };
    }
)(App);
