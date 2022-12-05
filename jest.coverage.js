const config = require('./jest.config');
// for generating badges, we don't need to enforce threshold
delete config.coverageThreshold;
// make sure apps are included in the coverage report
config.collectCoverageFrom.push('App/**/*.ts?(x)');
module.exports = config;
