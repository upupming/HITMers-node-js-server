const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.checks).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.checks).insert([
        {
          id: 'Z003',
          name: '张三',
          date_time: new Date(2018, 8, 3),
          check_in: false,
          check_out: true,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z003',
          name: '张三',
          date_time: new Date(2018, 6, 3),
          check_in: false,
          check_out: true,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z003',
          name: '张三',
          date_time: new Date(2018, 7, 3),
          check_in: false,
          check_out: true,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z003',
          name: '张三',
          date_time: new Date(2018, 6, 6),
          check_in: false,
          check_out: true,
          morning: false,
          afternoon: true
        }
      ]);
    });
};
