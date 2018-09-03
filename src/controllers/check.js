const queries = require('../db/queries/checks');

module.exports = {
  async postCheck(ctx) {
    if(ctx.request.body.id !== ctx.req.user.id) {
      ctx.body = 'User is not allowed to add checks for other users.';
      ctx.status = 403;
      return;
    }
    ctx.request.body.name = ctx.req.user.name;
    ctx.body = await queries.addCheck(ctx.request.body);
  },
  async getChecksByYearAndMonth(ctx) {
    if(ctx.params.id !== ctx.req.user.id) {
      ctx.body = 'User is not allowed to get checks of other users.';
      ctx.status = 403;
      return;
    }
    ctx.body = await queries.getChecksByYearAndMonth(ctx.params.id, ctx.query.year, ctx.query.month);
  }
};