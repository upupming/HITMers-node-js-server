const knex = require('../connection');
const config = require('../../config');

module.exports = {
  /**
   * @param
   * @param filter A filter object of user information
   * @return An array of users that match the filter
   */
  findUser(filter) {
    return knex(config.db.users).where(filter).select();
  },

  /**
   * @return All users in the database
   */
  getAllUsers() {
    return knex(config.db.users).select();
  }
};