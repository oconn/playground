import { combineReducers } from 'redux';
import config from './config';
import githubAPI from './github-api';
import repositories from './repositories';

const rootReducer = combineReducers({
    config: config,
    githubAPI: githubAPI,
    repositories: repositories
});

export default rootReducer;
