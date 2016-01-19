import {compose, curry, map, prop, slice, tap} from 'ramda';
import superagent from 'superagent';
import Task from 'data.task';

const trace = tap(x => console.log(x));

const printErr = err => console.log(err);

const log = data => console.log(data);

/* ************************************** */

const hnAPIBase = 'https://hacker-news.firebaseio.com/v0/';

// fetchItem :: postId -> Future err response
const fetchItem = id => {
    return new Task((reject, resolve) => {
        superagent.get(`${hnAPIBase}item/${id}.json`).end((err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

// fetchUpdates :: _ -> Future err response
const fetchUpdates = () => new Task((reject, resolve) => {
    superagent.get(`${hnAPIBase}topstories.json`).end((err, res) => {
        if (err) return reject(err);
        else resolve(res);
    });
});

// parseStories :: response -> [postIds]
const parseStories = compose(slice(0, 10), prop('body'));

// parseItem :: item -> object
const parseItem = prop('body');

// fetchAllPosts :: _ -> Future err posts
const fetchAllPosts = () => {
    return compose(
        map(parseStories),
        fetchUpdates
    );
}

compose(
    // Task err ([Task err object])
    map(map(map(parseItem))),
    // Task err ([Task err res])
    map(map(fetchItem)),
    // Task err [ids]
    map(parseStories),
    // Task err res
    fetchUpdates
)().fork(log, map(x => x.fork(log, log)));








