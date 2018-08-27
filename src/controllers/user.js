const config = require('../config');
const queries = require('../db/queries/users');
const bcrypt = require('bcryptjs');

module.exports = {
  getUsers: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify)) {
      ctx.body = 'This user is not permitted to access all users.';
      ctx.status = 403; 
      return;
    }
    ctx.body = await queries.getAllUsers();
  },
  getUser: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify) && ctx.params.id !== ctx.req.user.id) {
      ctx.body = 'This user is not permitted to access other users.';
      ctx.status = 403;
      return;
    }
    ctx.body = (await queries.findUser({id: ctx.params.id}))[0];
  },
  postUsers: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify)) {
      ctx.body = 'This user is not permitted to add new users.';
      ctx.status = 403; 
      return;
    }
    let users = ctx.request.body;
    users.forEach(user => {
      user.password = bcrypt.hashSync(user.phone_number.toString());
    });
    await queries.addUsers(users);
    ctx.body = 'Users have been added successfully.';
  },
  deleteUsers: async(ctx) => {

  },
  deleteUser: async(ctx) => {

  },
  putUsers: async(ctx) => {

  },
  putUser: async(ctx) => {

  }
};