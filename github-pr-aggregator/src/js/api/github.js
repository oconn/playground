import Task from 'data.task';
import * as request from 'superagent';
import { GITHUB_API_BASE } from '../constants/api';
import defaultTaskReturn from '../helpers/parse-body';

export const fetchGithubRootAPI = () => {
    return new Task((reject, resolve) => {
        request.get(`${GITHUB_API_BASE}`)
            .end(defaultTaskReturn(reject, resolve));
    });
};

