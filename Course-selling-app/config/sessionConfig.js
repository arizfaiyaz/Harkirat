require('dotenv').config();
const MongoStore = require('connect-mongo');
const { Cookie } = require('express-session');

const MONGO_URL = process.env.MONGO_URL;
const SESSION_ADMIN_SECRET = process.env.JWT_ADMIN_PASSWORD;
const SESSION_USER_SECRET = process.env.JWT_USER_PASSWORD;

adminSessionConfig = {
    secret: SESSION_ADMIN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
    }),
};

userSessionConfig = {
    secret: SESSION_USER_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
};

module.exports = {
    adminSessionConfig,
    userSessionConfig,
};