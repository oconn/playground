/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './app-router';
import configureStore from './stores/main';

const store: any = configureStore();

class Main extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return <Provider store={store}>
            <AppRouter />
        </Provider>;
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
