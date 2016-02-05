import { compose, equals, is, length, match } from 'ramda';

export default (a) => {
    const isUrl = compose(
        equals(1),
        length,
        match(/^http/)
    );

    return is(String, a) ? isUrl(a) : false;
};
