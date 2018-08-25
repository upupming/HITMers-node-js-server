const config = require('../../config');
const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.users).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.users).insert([
        {
          id: 'Z003',
          name: '张三',
          phone_number: 13849045786,
          language: '中英',
          session: 14,
          password: bcrypt.hashSync('13849045786'),
          password_changed_times: 0,
          reputation: 0
        },
        {
          id: 'L004',
          name: '李四',
          phone_number: 13848888786,
          language: '韩文',
          session: 13,
          password: bcrypt.hashSync('13848888786'),
          password_changed_times: 0,
          reputation: 0
        },
        {
          id: 'W005',
          name: '王五',
          phone_number: 10009045786,
          language: '俄语',
          session: 15,
          password: bcrypt.hashSync('10009045786'),
          password_changed_times: 0,
          reputation: 0
        },
        {
          id: 'Z006',
          name: '赵六',
          phone_number: 13877745786,
          language: '日语',
          session: 16,
          password: bcrypt.hashSync('13877745786'),
          password_changed_times: 0,
          reputation: 0
        },
      ]);
    });
};
