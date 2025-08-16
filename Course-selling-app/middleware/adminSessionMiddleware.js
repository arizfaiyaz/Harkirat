const session = require('express-session');
const { adminSessionConfig } = require('../config/sessionConfig.js');

const adminSessionMiddleware = session(adminSessionConfig);

module.exports = {
    adminSessionMiddleware,
}