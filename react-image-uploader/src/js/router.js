import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/app';

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} />
            </Router>
        );
    }
}
