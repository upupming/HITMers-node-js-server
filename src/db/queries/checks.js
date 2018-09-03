const knex = require('../connection');
const config = require('../../config');

module.exports = {
  /**
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
  },
  /**
   * Get all checks in the specified year and month, if year/month is undefined, don't use year/month filter.
   */
  getChecksByYearAndMonth(id, year, month) {
    return knex(config.db.checks)
      .where({id, check_out: true})
      .select()
      .then(data => {
        return data.filter(check => {
          let date = check.date_time;
          return (year ? date.getFullYear() == year : true) &&
            (month ? date.getMonth() == (month -1) : true);
        });
      });
  }
};