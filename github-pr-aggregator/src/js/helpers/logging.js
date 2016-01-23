export const log = (a) => {
    window.console.log(a);
    return log;
};

export const error = (a) => {
    window.console.error(a);
};
