require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const config = require('./config');
require('./prototypes');

app.use(bodyParser());

const router = require('./routes');
app.use(router.routes());

const proxy = require('koa-proxies');
app.use(proxy('/videos', {
  target: config.streamAPI,
  changeOrigin: true,
  logs: true
}));
app.use(proxy('/video/mp4'), {
  target: config.streamCDN,
  changeOrigin: true,
  logs: true
});

const server = app.listen(config.port, () => {
  console.log(`HITMers-server is running on port ${config.port}`);
});

module.exports = server;