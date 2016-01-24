import * as actionTypes from '../actions/repositories';
import { assoc, prop } from 'ramda';
import { updateOrAddItemById } from '../helpers/collection';

const addPrToRepo = (pr, repo) => {
    const currentPullRequests = prop('pullRequests', repo) || [];
    const updatedPullRequests = updateOrAddItemById(pr.id, pr, currentPullRequests);

    return assoc('pullRequests', updatedPullRequests, repo);
};

const repositoriesReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.ADD_REPO:
        return assoc(action.repo.full_name, action.repo, state);
    case actionTypes.ADD_PULL_REQUEST_TO_REPO:
        return assoc(
            action.repoName,
            addPrToRepo(action.pullRequest, prop(action.repoName, state)),
            state
        );
    default:
        return state;
    }
};

export default repositoriesReducer;
