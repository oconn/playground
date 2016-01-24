import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initializeRepositoryPRs } from '../actions/repositories';

class PRViewer extends React.Component {

    componentDidMount() {
        this.props.actions.initializeRepositoryPRs(this.props.repository);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    () => {return {}},
    (dispatch) => {
        return {
            actions: bindActionCreators({ initializeRepositoryPRs }, dispatch)
        };
    }
)(PRViewer);
