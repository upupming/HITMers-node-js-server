const router = require('koa-router')({ prefix: '/v1' });
const controllers = require('../controllers');

// Login varification
router.post('/login', controllers['ctx-logger'], controllers.login);

// User information
router.get('/user/all', controllers['ctx-logger'], controllers.verify, controllers.user.getUsers);
router.get('/user/:id', controllers['ctx-logger'], controllers.verify, controllers.user.getUser);
router.post('/user', controllers['ctx-logger'], controllers.verify, controllers.user.postUsers);
router.delete('/user', controllers['ctx-logger'], controllers.verify, controllers.user.deleteUsers);
router.put('/user', controllers['ctx-logger'], controllers.verify, controllers.user.putUsers);
router.put('/user/:id', controllers['ctx-logger'], controllers.verify, controllers.user.putUser);

// Check
router.post('/check', controllers['ctx-logger'], controllers.verify, controllers.check);

// Shift
router.post('/shift', controllers['ctx-logger'], controllers.verify, controllers.shift);
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
