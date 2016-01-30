import {
    getConfig,
    clearConfig,
    setConfig
} from '../helpers/local-storage';
import { guid } from '../helpers/guid';

export const INITIALIZE_CONFIG = 'INITIALIZE_CONFIG';

export const initializeConfig = () => {
    return (dispatch, getState) => {
        const config = getConfig()

        const resetConfig = () => {
            clearConfig();

            return {
                githubAPIToken: null,
                dashboardName: null,
                selectedRepos: []
            };
        };

        dispatch({
            type: INITIALIZE_CONFIG,
            config: config.githubAPIToken ? config : resetConfig()
        });
    };
}

export const ADD_REPOSITORY_TO_CONFIG = 'ADD_REPOSITORY_TO_CONFIG';

export const addRepository = () => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_REPOSITORY_TO_CONFIG,
            repo: {
                id: guid()
            }
        });
    };
}

export const REMOVE_REPOSITORY_FROM_CONFIG = 'REMOVE_REPOSITORY_FROM_CONFIG';

export const removeRepository = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_REPOSITORY_FROM_CONFIG,
            id: id
        });
    };
}

export const UPDATE_CONFIG = 'UPDATE_CONFIG';

export const updateConfig = (update) => {
    setConfig(update);

    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CONFIG,
            config: update
        });
    };
}
