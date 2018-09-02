const knex = require('../connection');
const config = require('../../config');

module.exports = {
  /**
   * Add a new check.
   * @param {Object} filter a filter object of check information.
   */
  async addCheck(filter) {
    let res = {
      id: filter.id,
      name:  filter.name,
      date_time: new Date(),
      check_in: filter.in,
      check_out: !filter.in,
      morning: filter.morning,
      afternoon: !filter.morning
    };
    await knex(config.db.checks).insert(res);
    return res;
  }
};