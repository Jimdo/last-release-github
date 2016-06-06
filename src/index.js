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

        return github.gitdata.getReference(
            {
                ref: `tags/${latestRelease.tag_name}`,
                user: githubRepo[0],
                repo: githubRepo[1],
            },
            (refErr, ref) => {
                if (refErr) {
                    return callback(refErr);
                }

                return callback(null, {
                    version: latestRelease.tag_name,
                    gitHead: ref.object.sha,
                });
            });
    });
};
