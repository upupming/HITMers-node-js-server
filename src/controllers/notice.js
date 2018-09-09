const queries = require('../db/queries/notices');
const users = require('../db/queries/users');

module.exports = {
  async postNotice(ctx) {
    console.log(ctx.request.body);
    ctx.request.body.created_by = ctx.req.user.id;
    ctx.body = await queries.addNotice(ctx.request.body);
    ctx.body.user = (await users.findUser({id: ctx.body.created_by}))[0];
  },
  async getNotices(ctx) {
    let notices = await queries.getNotices();

    for(let notice of notices) {
      notice.user = (await users.findUser({id: notice.created_by}))[0];
    }

    ctx.response.body = notices; 
  },

  async deleteNotice(ctx) {
    ctx.body = await queries.deleteNotice(ctx.params.notice_id);
    if(!ctx.body || ctx.body == '') {
      ctx.status = 404;
      ctx.body = 'No such notice id.';
    } else {
      ctx.body.user = (await users.findUser({id: ctx.body.created_by}))[0];
    }
  }
};