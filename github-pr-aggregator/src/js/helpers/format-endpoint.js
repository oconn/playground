import {
    append,
    compose,
    curryN,
    equals,
    filter,
    inc,
    join,
    length,
    match,
    not,
    reduce,
    split
} from 'ramda';

const userInputRegExp = /({.*?})/gi;
const isOptionalRegExp = /\?|\&/;

const isUserInput = compose(equals(1), length, match(userInputRegExp));
const isOptionalInput = compose(equals(1), length, match(isOptionalRegExp));
const isRequiredInput = compose(not, isOptionalInput);
const isRouteSegment = compose(not, isUserInput);

// String -> Array<String>
const segmentRoute = split(userInputRegExp);

// Array -> Array<String>
const filterNulls = filter((segment => length(segment)));

// Array -> Function
const formatEndpoint = (segments => {
    const variableSegments = filter(isUserInput, segments);
    const requiredSegments = filter(isRequiredInput, variableSegments);

    return curryN(length(requiredSegments), (...args) => {
        let argCount = 0;

        const transformSegments = reduce((memo, segment) => {
            if (isRouteSegment(segment)) {
                return append(segment, memo)
            } else if (isRequiredInput(segment)) {
                const segmentPlaceholder = append(args[argCount], memo);

                argCount = inc(argCount);
                return segmentPlaceholder;
            }

            return memo;
        }, []);

        return join('', transformSegments(segments));
    });
});

// String -> Function
export default compose(
    formatEndpoint,
    filterNulls,
    segmentRoute
);
