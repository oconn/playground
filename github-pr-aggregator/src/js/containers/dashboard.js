import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeRepos } from '../actions/repositories';
import { length, map, prop, values } from 'ramda';
import RepositoryViewer from '../components/repository-viewer';

class Dashboard extends React.Component {

    componentDidMount() {
        const repos = map(repo => {
            return [prop('user', repo), prop('name', repo)];
        }, this.props.config.selectedRepos);

        this.props.actions.initializeRepos(repos);
    }

    renderRepos() {
        return map((repo) => {
            return <RepositoryViewer key={repo.id} repo={repo} />;
        }, values(this.props.repositories));
    }

    renderSetupInstructions() {
        return (
            <div>
                <h2>Setup Required</h2>
                <p>Visit the setup page and add one or more repositories to get started.</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1>{ this.props.config.dashboardName }</h1>
                {length(this.props.config.selectedRepos) ?
                    this.renderRepos() :
                    this.renderSetupInstructions()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            config: state.config,
            repositories: state.repositories
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({ initializeRepos }, dispatch)
        };
    }
)(Dashboard);
