import * as actionTypes from '../actions/github';

const githubAPIReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.ADD_ENDPOINTS:
        return action.endpoints;
    default:
        return state;
    }
};

export default githubAPIReducer;
