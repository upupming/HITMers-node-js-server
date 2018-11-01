const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.visitors).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.visitors).insert([
        {
          identity: '计算机学院大一新生',
          arriving: new Date(2018, 10, 3)
        },
        {
          identity: '哈尔滨某中学学生',
          arriving: new Date(2018, 10, 4)
        },
        {
          identity: '哈佛大学教授',
          arriving: new Date(2018, 10, 5)
        }
      ]);
    });
};
