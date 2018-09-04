const router = require('koa-router')({ prefix: '/v1' });
const controllers = require('../controllers');

// Register
router.post('/register', controllers['ctx-logger'], controllers.register);
// Login verification
router.post('/login', controllers['ctx-logger'], controllers.login);

// User information
router.get('/user/all', controllers['ctx-logger'], controllers.verify, controllers.user.getUsers);
router.get('/user/:id', controllers['ctx-logger'], controllers.verify, controllers.user.getUser);
router.post('/user', controllers['ctx-logger'], controllers.verify, controllers.user.postUsers);
router.delete('/user', controllers['ctx-logger'], controllers.verify, controllers.user.deleteUsers);
router.put('/user', controllers['ctx-logger'], controllers.verify, controllers.user.putUsers);
router.put('/user/:id', controllers['ctx-logger'], controllers.verify, controllers.user.putUser);

// Check
router.post('/check', controllers['ctx-logger'], controllers.verify, controllers.check.postCheck);
router.get('/check/:id', controllers['ctx-logger'], controllers.verify, controllers.check.getChecksByYearAndMonth);

// Shift
router.post('/shift', controllers['ctx-logger'], controllers.verify, controllers.shift.postShift);
router.get('/shift', controllers['ctx-logger'], controllers.verify, controllers.shift.getShifts);
router.get('/shift/:id', controllers['ctx-logger'], controllers.verify, controllers.shift.getShift);
router.delete('/shift/:shift_id', controllers['ctx-logger'], controllers.verify, controllers.shift.deleteShift);

module.exports = router;
