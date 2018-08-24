const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.checks, function(table) {
    table.increments('check_id');
    table.string('id').collate('utf8_unicode_ci');
    table.string('name').collate('utf8_unicode_ci');
    table.dateTime('date_time').defaultTo(knex.fn.now());
    table.boolean('check_in');
    table.boolean('check_out');
    table.boolean('morning');
    table.boolean('afternoon');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.checks);
};
