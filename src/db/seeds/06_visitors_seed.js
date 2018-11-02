const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.visitors).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.visitors).insert([
        {
          identity: '10.3m计算机学院大一新生',
          arriving: new Date(2018, 10, 3, 12, 20),
          number_of_people: 50,
          appointer: '李同学',
          appointer_phone_number: '12388889999'
        },
        {
          identity: '10.3m哈尔滨某中学学生',
          arriving: new Date(2018, 10, 3, 12),
          number_of_people: 70,
          appointer: '张老师',
          appointer_phone_number: '12366669999',
          guided_by: '赵六'
        },
        {
          identity: '10.3a哈佛大学教授',
          arriving: new Date(2018, 10, 3, 14),
          number_of_people: 10,
          appointer: '张老师',
          appointer_phone_number: '10066669999',
          guided_by: '王五'
        },
        {
          identity: '10.3a哈佛大学教授',
          arriving: new Date(2018, 10, 3, 15),
          number_of_people: 10,
          appointer: '张老师',
          appointer_phone_number: '10066669999',
          guided_by: '王五'
        },
        {
          identity: '10.3a哈佛大学教授',
          arriving: new Date(2018, 10, 3, 13),
          number_of_people: 10,
          appointer: '张老师',
          appointer_phone_number: '10066669999',
          guided_by: '王五'
        },
        {
          identity: '10.4m材料党支部',
          arriving: new Date(2018, 10, 4, 2, 30),
          number_of_people: 50,
          appointer: '李同学',
          appointer_phone_number: '12388889999'
        },
        {
          identity: '10.4m天津大学教授',
          arriving: new Date(2018, 10, 4, 12),
          number_of_people: 70,
          appointer: '张老师',
          appointer_phone_number: '12366669999',
          guided_by: '赵六'
        },
        {
          identity: '10.4m武汉大学学生',
          arriving: new Date(2018, 10, 4, 8),
          number_of_people: 10,
          appointer: '张老师',
          appointer_phone_number: '10066669999',
          guided_by: '王五'
        },
        {
          identity: '10.14m澳大利亚外教',
          arriving: new Date(2018, 10, 14, 6),
          number_of_people: 50,
          appointer: '李同学',
          appointer_phone_number: '12388889999'
        },
        {
          identity: '10.13m韩国留学生',
          arriving: new Date(2018, 10, 13, 6),
          number_of_people: 45,
          appointer: '李同学',
          appointer_phone_number: '12388889999'
        },
        {
          identity: '10.5m哈尔滨某中学学生',
          arriving: new Date(2018, 10, 5),
          number_of_people: 70,
          appointer: '张老师',
          appointer_phone_number: '12366669999',
          guided_by: '赵六'
        },
        {
          identity: '10.5m哈佛大学教授',
          arriving: new Date(2018, 10, 5, 12, 30),
          number_of_people: 10,
          appointer: '张老师',
          appointer_phone_number: '10066669999',
          guided_by: '王五'
        }
      ]);
    });
};
