import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeRepos } from '../actions/repositories';
import { SELECTED_REPOS } from '../constants/api';
import { map, values } from 'ramda';
import RepositoryViewer from '../components/repository-viewer';
import { DASHBOARD_NAME } from '../constants/api';

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.actions.initializeRepos(SELECTED_REPOS);
    }

    renderRepos() {
        return map((repo) => {
            return <RepositoryViewer key={repo.id} repo={repo} />;
        }, values(this.props.repositories));
    }

    render() {
        return (
            <div>
                <h1>{DASHBOARD_NAME}</h1>
                { this.renderRepos() }
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            repositories: state.repositories
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({ initializeRepos }, dispatch)
        };
    }
)(Dashboard);
