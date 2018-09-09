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
          subject: '通知',
          content: '这是第一条通知'
        },
        {
          created_by: 'L004',
          created_at: new Date(2018, 8, 7),
          subject: '通知',
          content: '这是第二条通知'
        },
        {
          created_by: 'Z003',
          created_at: new Date(2018, 8, 7),
          subject: '值班规则',
          content: `1. 研二、大四的同学可以每周只值一次班。
          2. 其他年级的同学每周至少值两次班。
          3. 连续两周不排值班表，将受到警告。
          4. 值班状态：绿色表示值班，红色表示待命，蓝色表示背稿
          5. 目前暂不采用待命的排班形式，请不要选择待命。
          6. 对于已填写的格子，点击自己的班次将删除，点击其他人的班次将继续添加自己的班次并高度自适应。`
        },
      ]);
    });
};
