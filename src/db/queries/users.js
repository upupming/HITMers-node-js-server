const knex = require('../connection');
const config = require('../../config');

module.exports = {
  findUser() {
    return knex(config.db.users).where(arguments[0]).select();
  }
};