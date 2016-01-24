import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeRepos } from '../actions/repositories';
import { SELECTED_REPOS } from '../constants/api';
import { map, values } from 'ramda';
import PRViewer from '../components/pr-viewer';

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.actions.initializeRepos(SELECTED_REPOS);
    }

    renderRepos() {
        return map((repo) => {
            return <PRViewer key={repo.id} repository={repo} />;
        }, values(this.props.repositories));
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
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
