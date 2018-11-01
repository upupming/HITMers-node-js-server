const queries = require('../db/queries/visitors');

module.exports = {
  async postVisitor(ctx) {
    ctx.body = await queries.addVisitor(ctx.request.body);
  },
  async getVisitors(ctx) {
    ctx.response.body = await queries.getVisitorsDuring(ctx.query);
  },

  async deleteVisitor(ctx) {
    ctx.body = await queries.deleteVisitor(ctx.params.visitor_id);
    if(!ctx.body || ctx.body == '') {
      ctx.status = 404;
      ctx.body = 'No such visitor id.';
    }
  }
};