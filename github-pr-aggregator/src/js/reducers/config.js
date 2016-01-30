import * as actionTypes from '../actions/config';
import { merge } from 'ramda';
import { removeItemByPropName, updateOrAddItemById } from '../helpers/collection';

const configReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.INITIALIZE_CONFIG:
        return action.config;
    case actionTypes.ADD_REPOSITORY_TO_CONFIG:
        return merge(state, {
            selectedRepos: updateOrAddItemById(
                action.repo.id,
                action.repo,
                state.selectedRepos
            )
        });
    case actionTypes.REMOVE_REPOSITORY_FROM_CONFIG:
        return merge(state, {
            selectedRepos: removeItemByPropName(
                'id',
                action.id,
                state.selectedRepos
            )
        });

    case actionTypes.UPDATE_CONFIG:
        return action.config;
    default:
        return state;
    }
};

export default configReducer;
