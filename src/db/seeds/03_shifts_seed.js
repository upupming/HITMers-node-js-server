const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.shifts).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.shifts).insert([
        {
          id: 'Z006',
          name: '赵六',
          month: 9,
          day: 2,
          morning: false,
          afternoon: true
        },
        {
          id: 'L0904',
          name: '李四',
          month: 9,
          day: 3,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 9,
          day: 4,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 9,
          day: 4,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 9,
          day: 5,
          morning: true,
          afternoon: false
        }
      ]);
    });
};
