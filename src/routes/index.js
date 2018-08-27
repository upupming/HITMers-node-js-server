const router = require('koa-router')({ prefix: '/v1' });
const controllers = require('../controllers');

// Login varification
router.post('/login', controllers.login);

// // User information
router.get('/user/all', controllers['ctx-logger'], controllers.verify, controllers.user.getUsers);
// router.get('/user/:id', controllers.user.get.id);
// router.put('/user', controllers.user);

// // 提交考勤信息
// router.post('/cinsert', controllers.cinsert);

// // 个人值班查询
// router.get('/checks', controllers.checks);

// // 值班表查询
// router.get('/shifts', controllers.getShifts.all);
// router.get('/shifts/:id', controllers.getShifts.id);
// // 值班表新建
// router.post('/shifts', controllers.newShifts);
// // 值班表删除
// router.delete('/shifts', controllers.deleteShifts);

module.exports = router;
