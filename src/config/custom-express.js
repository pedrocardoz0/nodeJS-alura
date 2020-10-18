require('marko/node-require').install();
require('marko/express');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;