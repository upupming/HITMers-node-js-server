const knex = require('../connection');
const config = require('../../config');

module.exports = {
  /**
   * 
   * @param {Object} filter a filter object of shift information.
   */
  async addShift(filter) {
    let res = filter;
    res.afternoon = !res.morning;
    await knex(config.db.shifts).insert(res);
    return res;
  }
};