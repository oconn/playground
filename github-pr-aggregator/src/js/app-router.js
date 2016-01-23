import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/app';
import Dashboard from './containers/dashboard';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="/dashboard" component={Dashboard} />
                </Route>
            </Router>
        );
    }
}
