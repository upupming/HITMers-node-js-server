const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.notices).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.notices).insert([
        {
          created_by: 'Z003',
          created_at: new Date(2018, 8, 7),
          content: '这是第一条通知'
        },
        {
          created_by: 'L003',
          created_at: new Date(2018, 8, 7),
          content: '这是第二条通知'
        },
      ]);
    });
};
