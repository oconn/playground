import '../scss/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './app-router';
import configureStore from './stores/main';

const store = configureStore();

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
    }
}

ReactDOM.render(<Main />, window.document.getElementById('app'));
