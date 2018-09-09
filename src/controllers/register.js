const config = require('../config');
const queries = require('../db/queries/users');
const bcrypt = require('bcryptjs');

module.exports = async ctx => {
  if(ctx.request.body.registerCode !== config.registerCode) {
    ctx.status = 403;
    ctx.body = 'Please provide correct register code.';
    return;
  }
  ctx.request.body.user.password = bcrypt.hashSync(ctx.request.body.user.password);
  try {
    await queries.addUsers([ctx.request.body.user]);
    ctx.body = 'The user has been added successfully.';
  } catch(err) {
    ctx.status = 409;
    ctx.body = 'The user already exists.';
  }
};