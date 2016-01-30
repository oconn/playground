import {
    fetchRepositories,
    // fetchRepositoryHooks,
    fetchAllRepositoryPRs,
    fetchAllRepositoryIssues
} from '../api/repositories';
import { error } from '../helpers/logging';
import { map } from 'ramda';
import formatGithubObject from '../helpers/format-github-object';
// import { mockIssues, mockPrs, mockRepos } from '../mocks/repositories';

export const ADD_REPO = 'ADD_REPO';

export const initializeRepos = (repos) => {
    return (dispatch, getState) => {
        const { repository_url } = getState().githubAPI;
        const routes = map(r => repository_url.apply(this, r), repos);

        const addRepository = (repo) => {
            dispatch({
                repo: formatGithubObject(repo),
                type: ADD_REPO
            });
        };

        fetchRepositories(routes).fork(error, map(task => task.fork(error, addRepository)));
        // map(addRepository, mockRepos); // MOCK
    };
};

export const ADD_PULL_REQUEST_TO_REPO = 'ADD_PULL_REQUEST_TO_REPO';

export const initializeRepositoryPRs = (repo) => {
    return (dispatch, getState) => {
        const { pulls_url } = repo;

        const addPullRequest = (pr) => {
            dispatch({
                repoName: repo.full_name,
                pullRequest: formatGithubObject(pr),
                type: ADD_PULL_REQUEST_TO_REPO
            });
        };

        fetchAllRepositoryPRs(pulls_url('')).fork(error, map(addPullRequest));
        // map(addPullRequest, mockPrs); // MOCK
    };
};

export const ADD_ISSUES_TO_REPO = 'ADD_ISSUES_TO_REPO';

export const initializeRepositoryIssues = (repo) => {
    return (dispatch, getState) => {
        const { issues_url } = repo;

        const addIssue = (issue) => {
            dispatch({
                repoName: repo.full_name,
                issue: formatGithubObject(issue),
                type: ADD_ISSUES_TO_REPO
            });
        };

        fetchAllRepositoryIssues(issues_url('')).fork(error, map(addIssue));
        // map(addIssue, mockIssues); // MOCK
    };
}

export const createRepositoryWebhook = (repo) => {
    return (dispatch, getState) => {
        // TODO
        // const { hooks_url } = repo;

        // const addHooks = (hooks) => {
        //
        // };

        // fetchRepositoryHooks(hooks_url()).fork(error, addHooks);
    };
}
