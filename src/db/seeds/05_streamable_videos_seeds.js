const config = require('../../config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(config.db.stream_videos).del()
    .then(function() {
      // Inserts seed entries
      return knex(config.db.stream_videos).insert([
        {
          created_by: 'Z003',
          created_at: new Date(2018, 8, 7),
          video_code: 'c9zrn',
          subject: '视频标题',
          desc: '视频描述'
        }
      ]);
    });
};
