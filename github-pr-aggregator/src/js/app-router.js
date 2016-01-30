import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/app';
import Dashboard from './containers/dashboard';
import Setup from './containers/setup';
import { getToken } from './helpers/local-storage';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="/setup" component={Setup} />
                    <Route
                        path="/dashboard"
                        component={Dashboard}
                        onEnter={(nextState, replaceState) => {
                            if (!getToken()) {
                                replaceState('/setup');
                            }
                        }}
                    />
                </Route>
            </Router>
        );
    }
}
