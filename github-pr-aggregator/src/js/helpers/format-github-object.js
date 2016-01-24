import { is, map } from 'ramda';
import formatEndpoint from './format-endpoint';
import isUrl from './is-url';

/**
 * Modifies a github response object and recursively transforms each url
 * into a function.
 *
 * Object -> Object
 *
 * @method formatGithubObject
 * @return {Function}
 */
const formatGithubObject = map(prop => {
    if (is(Object, prop)) {
        return formatGithubObject(prop);
    } else if (isUrl(prop)) {
        return formatEndpoint(prop);
    }

    return prop;
});

export default formatGithubObject;
