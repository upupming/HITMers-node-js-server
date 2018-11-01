const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.visitors, function(table) {
    table.increments('visitor_id');
    table.string('identity').collate('utf8_unicode_ci');
    table.dateTime('arriving');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.visitors);
};
