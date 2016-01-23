import { fetchRepositories } from '../api/repositories';
import { map } from 'ramda';
import { error, log } from '../helpers/logging';

/*eslint-disable */
const sampleRepo = {
    "id": 40978919,
    "name": "salix-web",
    "full_name": "willowtreeapps/salix-web",
    "owner": {
        "login": "willowtreeapps",
        "id": 557680,
        "avatar_url": "https://avatars.githubusercontent.com/u/557680?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/willowtreeapps",
        "html_url": "https://github.com/willowtreeapps",
        "followers_url": "https://api.github.com/users/willowtreeapps/followers",
        "following_url": "https://api.github.com/users/willowtreeapps/following{/other_user}",
        "gists_url": "https://api.github.com/users/willowtreeapps/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/willowtreeapps/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/willowtreeapps/subscriptions",
        "organizations_url": "https://api.github.com/users/willowtreeapps/orgs",
        "repos_url": "https://api.github.com/users/willowtreeapps/repos",
        "events_url": "https://api.github.com/users/willowtreeapps/events{/privacy}",
        "received_events_url": "https://api.github.com/users/willowtreeapps/received_events",
        "type": "Organization",
        "site_admin": false
    },
    "private": true,
    "html_url": "https://github.com/willowtreeapps/salix-web",
    "description": "",
    "fork": false,
    "url": "https://api.github.com/repos/willowtreeapps/salix-web",
    "forks_url": "https://api.github.com/repos/willowtreeapps/salix-web/forks",
    "keys_url": "https://api.github.com/repos/willowtreeapps/salix-web/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/willowtreeapps/salix-web/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/willowtreeapps/salix-web/teams",
    "hooks_url": "https://api.github.com/repos/willowtreeapps/salix-web/hooks",
    "issue_events_url": "https://api.github.com/repos/willowtreeapps/salix-web/issues/events{/number}",
    "events_url": "https://api.github.com/repos/willowtreeapps/salix-web/events",
    "assignees_url": "https://api.github.com/repos/willowtreeapps/salix-web/assignees{/user}",
    "branches_url": "https://api.github.com/repos/willowtreeapps/salix-web/branches{/branch}",
    "tags_url": "https://api.github.com/repos/willowtreeapps/salix-web/tags",
    "blobs_url": "https://api.github.com/repos/willowtreeapps/salix-web/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/willowtreeapps/salix-web/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/willowtreeapps/salix-web/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/willowtreeapps/salix-web/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/willowtreeapps/salix-web/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/willowtreeapps/salix-web/languages",
    "stargazers_url": "https://api.github.com/repos/willowtreeapps/salix-web/stargazers",
    "contributors_url": "https://api.github.com/repos/willowtreeapps/salix-web/contributors",
    "subscribers_url": "https://api.github.com/repos/willowtreeapps/salix-web/subscribers",
    "subscription_url": "https://api.github.com/repos/willowtreeapps/salix-web/subscription",
    "commits_url": "https://api.github.com/repos/willowtreeapps/salix-web/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/willowtreeapps/salix-web/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/willowtreeapps/salix-web/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/willowtreeapps/salix-web/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/willowtreeapps/salix-web/contents/{+path}",
    "compare_url": "https://api.github.com/repos/willowtreeapps/salix-web/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/willowtreeapps/salix-web/merges",
    "archive_url": "https://api.github.com/repos/willowtreeapps/salix-web/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/willowtreeapps/salix-web/downloads",
    "issues_url": "https://api.github.com/repos/willowtreeapps/salix-web/issues{/number}",
    "pulls_url": "https://api.github.com/repos/willowtreeapps/salix-web/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/willowtreeapps/salix-web/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/willowtreeapps/salix-web/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/willowtreeapps/salix-web/labels{/name}",
    "releases_url": "https://api.github.com/repos/willowtreeapps/salix-web/releases{/id}",
    "deployments_url": "https://api.github.com/repos/willowtreeapps/salix-web/deployments",
    "created_at": "2015-08-18T15:07:58Z",
    "updated_at": "2016-01-11T15:45:07Z",
    "pushed_at": "2016-01-22T18:39:33Z",
    "git_url": "git://github.com/willowtreeapps/salix-web.git",
    "ssh_url": "git@github.com:willowtreeapps/salix-web.git",
    "clone_url": "https://github.com/willowtreeapps/salix-web.git",
    "svn_url": "https://github.com/willowtreeapps/salix-web",
    "homepage": null,
    "size": 1432,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "JavaScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 5,
    "forks": 0,
    "open_issues": 5,
    "watchers": 0,
    "default_branch": "develop",
    "permissions": {
        "admin": true,
        "push": true,
        "pull": true
    },
    "organization": {
        "login": "willowtreeapps",
        "id": 557680,
        "avatar_url": "https://avatars.githubusercontent.com/u/557680?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/willowtreeapps",
        "html_url": "https://github.com/willowtreeapps",
        "followers_url": "https://api.github.com/users/willowtreeapps/followers",
        "following_url": "https://api.github.com/users/willowtreeapps/following{/other_user}",
        "gists_url": "https://api.github.com/users/willowtreeapps/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/willowtreeapps/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/willowtreeapps/subscriptions",
        "organizations_url": "https://api.github.com/users/willowtreeapps/orgs",
        "repos_url": "https://api.github.com/users/willowtreeapps/repos",
        "events_url": "https://api.github.com/users/willowtreeapps/events{/privacy}",
        "received_events_url": "https://api.github.com/users/willowtreeapps/received_events",
        "type": "Organization",
        "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 42
}
/*eslint-enable */

export const initializeRepos = (repos) => {
    return (dispatch, getState) => {
        const { repository_url } = getState().githubAPI;
        const routes = map(r => repository_url.apply(this, r), repos);

        // fetchRepositories(routes).fork(error, map(task => {
        //     task.fork(error, log);
        // }));

        const addRepository = (repo) => {

        };

        addRepository(sampleRepo);
    };
};
