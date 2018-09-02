const queries = require('../db/queries/checks');

module.exports = async ctx => {
  if(ctx.request.body.id !== ctx.req.user.id) {
    ctx.body = 'User is not allowed to add checks for other users.';
    ctx.status = 403;
    return;
  }
  ctx.request.body.name = ctx.req.user.name;
  ctx.body = await queries.check(ctx.request.body);
};