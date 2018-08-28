require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const config = require('./config');
require('./prototypes');

app.use(bodyParser());

const router = require('./routes');
app.use(router.routes());

const server = app.listen(config.port, () => {
  console.log(`HITMers-server is running on port ${config.port}`);
});

module.exports = server;