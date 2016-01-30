import { SELECTED_REPOS } from '../constants/api';
import { filter, head, last, prop, propEq, split } from 'ramda';

/**
 * Returns a repo store in the config file base on a
 * given full name i.e. oconn/github-pr-aggregator
 *
 * String -> Object
 *
 * @param {String} fullName full repo name (user/name)
 * @method getRepo
 * @return {Object} repository config
 */
export const getRepo = (fullName) => {
    const target = split('/', fullName);

    return head(filter(repo => {
        return propEq('user', head(target)) &&
            propEq('name', last(target));
    }, SELECTED_REPOS));
};

/**
 * Pull the mergable criteria prop from a repo's config.
 *
 * String -> Array
 *
 * @param {String} fullName full repo name (user/name)
 * @method getMergableCriteria
 * @return {Array} github labels
 */
export const getMergableCriteria = (fullName) => {
    return prop('mergeableCriteria', getRepo(fullName));
};

/**
 * Pull the gtihubHook prop off the repo's config
 *
 * String -> String
 *
 * @param {String} fullName full repo name (user/name)
 * @method getGithubHook
 * @return {String} github hook URL
 */
export const getGithubHook = (fullName) => {
    return prop('githubHook', getRepo(fullName));
};
