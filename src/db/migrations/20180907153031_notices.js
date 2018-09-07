const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.notices, function(table) {
    table.increments('notice_id');
    table.string('created_by').collate('utf8_unicode_ci');
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.text('subject');
    table.text('content');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.notices);
};
