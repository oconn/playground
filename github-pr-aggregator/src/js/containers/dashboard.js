import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeRepos } from '../actions/repositories';
import { SELECTED_REPOS } from '../constants/api';

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.actions.initializeRepos(SELECTED_REPOS);
    }

    render() {
        return (
           <div>
                <h1>Dashboard</h1>
           </div>
        );
    }
}

export default connect(
    (state) => {
        return {};
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({ initializeRepos }, dispatch)
        };
    }
)(Dashboard);
