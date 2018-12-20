const knex = require('../connection');
const config = require('../../config');

function minifyShift(shift) {
  let properties = ['shift_id', 'id', 'name', 'year', 'month', 'day', 'morning', 'afternoon', 'status'];
  let minifiedShift = {};
  for(let property of properties) {
    minifiedShift[property] = shift[property];
  }
  return minifiedShift;
}

function numberify(filter) {
  filter.year = filter.year - 0;
  filter.startMonth = filter.startMonth - 0;
  filter.startDay = filter.startDay - 0;
  filter.endMonth = filter.endMonth - 0;
  filter.endDay = filter.endDay - 0;
  return filter;
}

module.exports = {
  /**
   * @param {Object} filter a filter object of shift information.
   */
  async addShift(filter) {
    let res = filter;
    res.afternoon = !res.morning;
    res = minifyShift(res);
    res.shift_id = (await knex(config.db.shifts).insert(res).returning('shift_id'))[0];
    let inserted = (await knex(config.db.shifts).where('shift_id', res.shift_id).select())[0];
    [res.status, res.morning, res.afternoon] = [inserted.status, inserted.morning, inserted.afternoon];
    return res;
  },
  /**
   * Get all shifts in specified period.
   * @param {*} filter period filter.
   */
  getShiftsDuring(filter) {
    const thisYear = new Date().getFullYear();
    filter = numberify(filter);
    // Only one month
    if(filter.startMonth === filter.endMonth) {
      return knex(config.db.shifts)
        .where(function() {
          if(filter.id) {
            this.where('id', filter.id);
          }
          if(filter.morning) {
            this.where('morning', filter.morning);
          }
          if(filter.status) {
            this.where('status', filter.status);
          }
          this.where('year', filter.year || thisYear)
              .where('month',  filter.startMonth)
              .whereBetween('day', [filter.startDay, filter.endDay]);
        });
    }
    // Serveral months
    else if(filter.startMonth < filter.endMonth) {
      return knex(config.db.shifts)
        .where(function() {
          if(filter.id) {
            console.error(filter);
            this.where('id', filter.id);
          }
          if(filter.morning) {
            this.where('morning', filter.morning);
          }
          if(filter.status) {
            this.where('status', filter.status);
          }
        })
        .andWhere(function() {
              // First month
          this.where('year', filter.year || thisYear)
              .where('month', filter.startMonth)
              .where('day', '>=', filter.startDay)
              // Months between
              .orWhere(function() {
                this.where('month', '>=', filter.startMonth - 0 + 1)
                    .where('month', '<=',  filter.endMonth - 1);
              })
              // Last month
              .orWhere(function() {
                this.where('month', filter.endMonth)
                    .where('day', '<=', filter.endDay);
              });
        });
    }
    // If endMonth < startMonth, then we think client want to get shifts between two years
    else {
      return knex(config.db.shifts)
        .where(function() {
          if(filter.id) {
            console.error(filter);
            this.where('id', filter.id);
          }
          if(filter.morning) {
            this.where('morning', filter.morning);
          }
          if(filter.status) {
            this.where('status', filter.status);
          }
        })
        .andWhere(function() {
              // First month
          this.where('year', filter.year || thisYear)
              .where('month', filter.startMonth)
              .where('day', '>=', filter.startDay)
              // Months between - first year
              .orWhere(function() {
                if(filter.startMonth <= 11) {
                  this.where('year', filter.year || thisYear)
                      .where('month', '>=', filter.startMonth - 0 + 1)
                      .where('month', '<=', 12);
                }
              })
              // Months between - second year
              .orWhere(function() {
                if(filter.endMonth >= 2) {
                  this.where('year', (filter.year || thisYear)+1)
                      .where('month', '>=', 1)
                      .where('month', '<=', filter.endMonth - 1);
                }
              })
              // Last month
              .orWhere(function() {
                this.where('year', (filter.year || thisYear) + 1)
                    .where('month', filter.endMonth)
                    .where('day', '<=', filter.endDay);
              });
        });
    }
  },
  async deleteShift(shift_id) {
    let res = (await knex(config.db.shifts).where({shift_id}).select())[0];
    await knex(config.db.shifts).where({shift_id}).del();
    return res;
  }
};