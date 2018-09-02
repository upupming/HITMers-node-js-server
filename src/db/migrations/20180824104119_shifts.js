const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.shifts, function(table) {
    table.increments('shift_id');
    table.string('id').collate('utf8_unicode_ci');
    table.string('name').collate('utf8_unicode_ci');
    table.string('year').defaultTo(new Date().getFullYear());
    table.integer('month');
    table.integer('day');
    table.boolean('morning');
    table.boolean('afternoon');
    table.string('status').collate('utf8_unicode_ci').defaultTo('working');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.shifts);
};
