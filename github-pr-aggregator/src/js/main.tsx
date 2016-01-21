/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';
import AppRouter from './app-router';
// import configureStore from './stores/main';

class App extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return <AppRouter />;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
