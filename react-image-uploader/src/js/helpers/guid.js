export const guid = () => {
    const mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const replaceWith = (char) => {
        const r = Math.random()*16|0;
        const v = char == 'x' ? r : (r&0x3|0x8);

        return v.toString(16);
    };

    return mask.replace(/[xy]/g, replaceWith);
}
