const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.stream_videos, function(table) {
    table.increments('video_id');
    table.string('created_by').collate('utf8_unicode_ci');
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.string('video_code');
    table.text('subject').collate('utf8_unicode_ci');
    table.text('desc').collate('utf8_unicode_ci');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.stream_videos);
};
