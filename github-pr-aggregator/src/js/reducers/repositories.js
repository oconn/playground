import * as actionTypes from '../actions/repositories';
import { assoc, prop } from 'ramda';
import { updateOrAddItemById } from '../helpers/collection';

const updateSubcollection = (subCollectionName, subCollectionItem, parentObject) => {
    const initialSubCollection = prop(subCollectionName, parentObject) || [];
    const updatedSubCollection = updateOrAddItemById(
        subCollectionItem.id, subCollectionItem, initialSubCollection);

    return assoc(subCollectionName, updatedSubCollection, parentObject);
};

const repositoriesReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.ADD_REPO:
        return assoc(action.repo.full_name, action.repo, state);
    case actionTypes.ADD_PULL_REQUEST_TO_REPO:
        return assoc(
            action.repoName,
            updateSubcollection(
                'pullRequests',
                action.pullRequest,
                prop(action.repoName, state)
            ),
            state
        );
    case actionTypes.ADD_ISSUES_TO_REPO:
        return assoc(
            action.repoName,
            updateSubcollection(
                'issues',
                action.issue,
                prop(action.repoName, state)
            ),
            state
        );
    default:
        return state;
    }
};

export default repositoriesReducer;
