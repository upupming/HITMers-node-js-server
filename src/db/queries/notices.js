const knex = require('../connection');
const config = require('../../config');

function minifyNotice(notice) {
  let properties = ['notice_id', 'created_by', 'created_at', 'subject', 'content'];
  let minifiedNotice = {};
  for(let property of properties) {
    minifiedNotice[property] = notice[property];
  }
  return minifiedNotice;
}

module.exports = {
  /**
   * @param {Object} filter a filter object of notice information.
   */
  async addNotice(filter) {
    console.log(filter);
    let res = minifyNotice(filter);
    console.log(res);
    res.notice_id = (await knex(config.db.notices).insert(res).returning('notice_id'))[0];
    let inserted = (await knex(config.db.notices).where('notice_id', res.notice_id).select())[0];
    return inserted;
  },
  
  /**
   * Get all notices, form newer to older.
   */
  getNotices() {
    return knex(config.db.notices).select().then(data => data.reverse());
  },

  async deleteNotice(notice_id) {
    let res = (await knex(config.db.notices).where({notice_id}).select())[0];
    await knex(config.db.notices).where({notice_id}).del();
    return res;
  }
};