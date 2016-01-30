import store from 'store';

export const clearConfig = () => {
    return store.set('config', {});
}

export const getToken = () => {
    return getConfig().githubAPIToken;
}

export const getConfig = () => {
    return store.get('config') || {};
}

export const setConfig = (config) => {
    store.set('config', config);
}
