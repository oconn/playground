import '../scss/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router';
import configureStore from './store';

const store = configureStore();

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

ReactDOM.render(<Main />, window.document.getElementById('app'));
