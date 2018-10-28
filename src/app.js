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
const nginx = require('koa-nginx').proxy({
  proxies: [
    {
      host: config.streamCDN,
      context: 'mp4'
    },
    {
      host: config.url2pdf,
      context: 'url2pdf'
    }
  ]
});
app.use(nginx);

const server = app.listen(config.port, () => {
  console.log(`HITMers-server is running on port ${config.port}`);
});

module.exports = server;