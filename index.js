'use strict';

const lastRelaseGithub = require('./src/index');

lastRelaseGithub({}, Object.assign(process, { pkg: require('./package.json') }), console.log.bind(console));
