const knex = require('../connection');
const config = require('../../config');

function minifyVisitor(visitor) {
  let properties = ['visitor_id', 'identity', 'arriving'];
  let minifiedVisitor = {};
  for(let property of properties) {
    minifiedVisitor[property] = visitor[property];
  }
  return minifiedVisitor;
}

module.exports = {
  /**
   * @param {Object} filter a filter object of visitor information.
   */
  async addVisitor(filter) {
    let res = filter;
    res = minifyVisitor(res);
    res.visitor_id = (await knex(config.db.visitors).insert(res).returning('visitor_id'))[0];
    return res;
  },
  /**
   * Get all visitors in specified period.
   * @param {*} filter period filter which is has {startDateTime, endDateTime}
   */
  getVisitorsDuring(filter) {
    return knex(config.db.visitors)
      .where('arriving', '>=', filter.startDateTime || new Date())
      .where('arriving', '<=', filter.endDateTime || new Date());
  },
  async deleteVisitor(visitor_id) {
    let res = (await knex(config.db.visitors).where({visitor_id}).select())[0];
    await knex(config.db.visitors).where({visitor_id}).del();
    return res;
  }
};