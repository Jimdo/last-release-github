'use strict';

const GitHubApi = require('github4');
const parseGithubRepoUrl = require('parse-github-repo-url');
const github = new GitHubApi();


module.exports = function getLatestRelease(pluginConfig, config, callback) {
    github.authenticate({
        type: 'oauth',
        token: config.env.GH_TOKEN,
    });

    const githubRepo = parseGithubRepoUrl(config.pkg.repository.url);

    github.repos.getLatestRelease({
        user: githubRepo[0],
        repo: githubRepo[1],
    }, (err, latestRelease) => {
        if (err) {
            return callback(err);
        }

        callback(null, {
          version: latestRelease.tag_name,
          gitHead: latestRelease.target_commitish,
        });
    });
};
