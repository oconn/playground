import { getToken } from '../../helpers/local-storage';

const auth: Function = (req) => {
    req.query({
        access_token: getToken()
    });
};

export default auth;
