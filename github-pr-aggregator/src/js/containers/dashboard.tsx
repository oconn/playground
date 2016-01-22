/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchRepos} from '../actions/repositories';

interface IDashboardActions {
    fetchRepos: Function;
}

interface IDashboardProps {
    actions: IDashboardActions;
}

class Dashboard extends React.Component<IDashboardProps, {}> {

    public componentDidMount(): void {
        this.props.actions.fetchRepos();
    }

    public render(): React.ReactElement<{}> {
        return (
           <div>
                <h1>Dashboard</h1>
           </div>
        );
    }
}

export default connect(
    (state: Object) => {
        return {};
    },
    (dispatch: any) => {
        return {
            actions: bindActionCreators({fetchRepos}, dispatch)
        };
    }
)(Dashboard);
