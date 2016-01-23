const auth: Function = (req) => {
    const token = window.localStorage.getItem('github-token');

    req.query({
        access_token: token
    });
};

export default auth;
