import { append, filter, find, map, not, propEq } from 'ramda';

export const updateOrAddItemById = (id, item, collection, propName = 'id') => {
    const oldItem = find(propEq(propName, id), collection);

    return oldItem ?
        map((i) => i.id === id ? item : i)(collection) :
        append(item, collection);
};

export const removeItemByPropName = (propName, value, collection) => {
    return filter(item => not(propEq(propName, value, item)), collection);
};
