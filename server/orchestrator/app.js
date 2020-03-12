const express = require('express');
const router = require('./routes/router');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`orchsestrator server on port ${port}`);
});