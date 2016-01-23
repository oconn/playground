import parseBody from './parse-body';

const defaultTaskReturn = (reject, resolve) => {
    return (err, res) => {
        if (err) {
            reject(err);
        } else {
            resolve(parseBody(res));
        }
    };
}

export default defaultTaskReturn;
