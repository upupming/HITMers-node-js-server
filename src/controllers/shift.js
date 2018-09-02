const queries = require('../db/queries/shifts');

module.exports = async ctx => {
  if(ctx.request.body.id !== ctx.req.user.id) {
    ctx.body = 'User is not allowed to add shifts for other users.';
    ctx.status = 403;
    return;
  }
  ctx.request.body.name = ctx.req.user.name;
  ctx.body = await queries.addShift(ctx.request.body);
};