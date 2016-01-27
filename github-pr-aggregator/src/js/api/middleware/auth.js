const auth: Function = (req) => {
    const token = process.env.GITHUB_API_KEY;

    req.query({
        access_token: token
    });
};

export default auth;
