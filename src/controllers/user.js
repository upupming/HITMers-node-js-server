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
    try {
      await queries.addUsers(users);
    } catch(err) {
      ctx.body = 'All or some users you want to add already exist.';
      ctx.status = 409; 
      return;
    }
    ctx.body = 'Users have been added successfully.';
  },
  deleteUsers: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify)) {
      ctx.body = 'This user is not permitted to delete users.';
      ctx.status = 403; 
      return;
    }
    let deletedUsers = [];
    // `forEach` cannot be used for `await`!!!
    // See this post: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
    // So we use `asyncForEach` and add `await` in the front of block
    await ctx.request.body.asyncForEach(async filter => {
      let temp = await queries.deleteUsers(filter);
      deletedUsers = deletedUsers.concat(temp);
      console.log(deletedUsers);
    });
    ctx.body = deletedUsers;
  },
  putUsers: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify)) {
      ctx.body = 'This user is not permitted to modify other users.';
      ctx.status = 403;
      return;
    }
    let updatedUsers = [];
    await ctx.request.body.asyncForEach(async user => {
      user.password = bcrypt.hashSync(user.password);
      updatedUsers = updatedUsers.concat(await queries.updateUser(user, user.id));
    });
    ctx.body = updatedUsers;
  },
  putUser: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify) && ctx.params.id !== ctx.req.user.id) {
      ctx.body = 'This user is not permitted to modify other users.';
      ctx.status = 403;
      return;
    }
    let user = ctx.request.body;
    user.password = bcrypt.hashSync(user.password);
    ctx.body = (await queries.updateUser(user, ctx.params.id))[0];
  }
};