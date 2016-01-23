import { prop } from 'ramda';

const parseBody = (req) => {
    return prop('body', req);
};

export default parseBody;
