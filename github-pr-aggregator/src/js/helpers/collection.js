import { append, find, map, propEq } from 'ramda';

export const updateOrAddItemById = (id, item, collection) => {
    const oldItem = find(propEq('id', id), collection);

    return oldItem ?
        map((i) => i.id === id ? item : i)(collection) :
        append(item, collection);
};
