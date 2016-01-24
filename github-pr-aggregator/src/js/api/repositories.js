import Task from 'data.task';
import * as request from 'superagent';
import defaultTaskReturn from '../helpers/default-task-return';
import auth from './middleware/auth';
import { map } from 'ramda';

export const fetchRepositories = (repos) => {
    return Task.of(map(fetchRepository, repos));
};

export const fetchRepository = (url) => {
    return new Task((reject, resolve) => {
        request.get(url)
            .use(auth)
            .end(defaultTaskReturn(reject, resolve));
    });
};

export const fetchAllRepositoryPRs = (url) => {
    return new Task((reject, resolve) => {
        request.get(url)
            .use(auth)
            .end(defaultTaskReturn(reject, resolve));
    });
};
