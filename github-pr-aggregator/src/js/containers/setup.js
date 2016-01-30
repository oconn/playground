import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRepository, removeRepository, updateConfig } from '../actions/config';
import SetupForm from '../forms/setup';

class Setup extends React.Component {
    render() {
        return (
            <div>
                <SetupForm
                    actions={{
                        addRepository: this.props.actions.addRepository,
                        removeRepository: this.props.actions.removeRepository,
                        updateConfig: this.props.actions.updateConfig
                    }}
                    defaultValues={this.props.config}
                />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            config: state.config
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                addRepository,
                removeRepository,
                updateConfig
            }, dispatch)
        };
    }
)(Setup);
