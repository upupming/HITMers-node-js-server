const config = require('../config');
const queries = require('../db/queries/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  getUsers: async(ctx) => {
    ctx.body = await queries.getAllUsers();
  },
  getUser: async(ctx) => {

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