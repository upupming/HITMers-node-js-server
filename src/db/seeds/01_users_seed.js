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
          identify: '老师',
          phone_number: 13849045786,
          language: '中英',
          session: 14,
          email: 'zhangsan@qq.com',
          school: '经管学院',
          password: bcrypt.hashSync('13849045786'),
          password_changed_times: 0,
          reputation: 0
        },
        {
          id: 'L004',
          name: '李四',
          identify: '讲解员',
          phone_number: 13848888786,
          language: '韩文',
          session: 13,
          email: 'lisi@163.com',
          school: '人文',
          password: bcrypt.hashSync('13848888786'),
          password_changed_times: 0,
          reputation: 0
        },
        {
          id: 'W005',
          name: '王五',
          identify: '馆藏人员',
          phone_number: 10009045786,
          language: '俄文',
          session: 15,
          email: 'wangwu@qq.com',
          school: '计算机学院',
          password: bcrypt.hashSync('10009045786'),
          password_changed_times: 0,
          reputation: 0
        },
        {
          id: 'Z006',
          name: '赵六',
          identify: '讲解员',
          phone_number: 13877745786,
          language: '日文',
          session: 16,
          email: 'zhaoliu@gmail.com',
          school: '材料学院',
          password: bcrypt.hashSync('13877745786'),
          password_changed_times: 0,
          reputation: 0
        }
      ]);
    });
};
