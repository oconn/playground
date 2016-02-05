import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/root';

const logger = createLogger({
    collapsed: true,
    level: 'info'
});

const createStoreWith = compose(
    applyMiddleware(thunkMiddleware, logger)
)(createStore);

const configureStore = (initialState) => {
    return createStoreWith(rootReducer, initialState);
};

export default configureStore;

