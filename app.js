require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const SQliteStore = require('connect-sqlite3')(session);

const app = express();

app.locals.pluralize = require('pluralize');

module.exports = app;