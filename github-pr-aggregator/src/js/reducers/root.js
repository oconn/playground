import { combineReducers } from 'redux';
import githubAPI from './github-api';
import repositories from './repositories';

const rootReducer = combineReducers({
    githubAPI: githubAPI,
    repositories: repositories
});

export default rootReducer;
