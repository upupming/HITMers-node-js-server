const config = require('../config');
const queries = require('../db/queries/users');

module.exports = {
  getUsers: async(ctx) => {
    if(!config.superIdentifies.includes(ctx.req.user.identify)) {
      ctx.body = 'User is not permitted to access all users.';
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
    
  },
  postUser: async(ctx) => {

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