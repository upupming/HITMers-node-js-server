const config = require('../../config');

let nextYear = new Date().getFullYear() + 1;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.shifts).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.shifts).insert([
        {
          id: 'L004',
          name: '李四',
          month: 8,
          day: 2,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 9,
          day: 2,
          morning: false,
          afternoon: true
        },
        {
          id: 'L004',
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
          month: 10,
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
        },
        {
          id: 'Z003',
          name: '张三',
          month: 9,
          day: 3,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 10,
          day: 29,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 11,
          day: 2,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z003',
          name: '张三',
          month: 11,
          day: 3,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 11,
          day: 2,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 11,
          day: 2,
          morning: true,
          afternoon: false
        },
        {
          id: 'Z003',
          name: '张三',
          month: 11,
          day: 3,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z003',
          name: '张三',
          month: 11,
          day: 3,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z003',
          name: '张三',
          month: 11,
          day: 3,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z003',
          name: '张三',
          month: 11,
          day: 3,
          morning: false,
          afternoon: true
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 11,
          day: 3,
          morning: false,
          afternoon: true,
          status: 'waiting'
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 12,
          day: 3,
          morning: false,
          afternoon: true,
          status: 'waiting'
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 12,
          day: 20,
          morning: false,
          afternoon: true,
          status: 'waiting'
        },
        {
          id: 'Z006',
          name: '赵六',
          month: 12,
          day: 3,
          morning: false,
          afternoon: true,
          status: 'waiting'
        },
        {
          year: nextYear,
          id: 'Z006',
          name: '赵六',
          month: 1,
          day: 3,
          morning: false,
          afternoon: true,
          status: 'waiting'
        },
        {
          year: nextYear,
          id: 'Z006',
          name: '赵六',
          month: 2,
          day: 3,
          morning: false,
          afternoon: true,
          status: 'waiting'
        }
      ]);
    });
};
