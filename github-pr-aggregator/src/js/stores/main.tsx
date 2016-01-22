/// <reference path="../../../typings/tsd.d.ts" />

import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/root';

const logger: any = createLogger({
    collapsed: true,
    level: 'info'
});

const createStoreWith: any = compose(
    applyMiddleware(thunkMiddleware, logger)
)(createStore);

const configureStore: any = (initialState: Object) => {
    return createStoreWith(rootReducer, initialState);
};

export default configureStore;

