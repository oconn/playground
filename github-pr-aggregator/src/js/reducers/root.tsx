/// <reference path="../../../typings/tsd.d.ts" />

import {combineReducers} from 'redux';

import repositories from './repositories';

const rootReducer: any = combineReducers({
    repositories: repositories
});

export default rootReducer;
