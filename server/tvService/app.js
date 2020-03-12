const express = require('express');
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => console.log(`TV server running on port ${port}`));