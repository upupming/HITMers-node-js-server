require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const config = require('./config');

let pg = require('pg');
pg.defaults.ssl = true;

const checkModel = require('./models/checkModel');
checkModel();
const loginModel = require('./models/loginModel');
loginModel();
const shiftsModel = require('./models/shiftsModel');
shiftsModel();

// 解析请求体
app.use(bodyParser());

// 引入路由分发
const router = require('./routes');
app.use(router.routes());

// 启动程序，监听端口
app.listen(config.port, () => {
  console.log(`HITMers-server is running on port ${config.port}`);
});
