const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.visitors, function(table) {
    table.increments('visitor_id');
    table.string('identity').collate('utf8_unicode_ci');
    table.dateTime('arriving');
    table.integer('number_of_people');
    table.string('appointer').collate('utf8_unicode_ci');
    table.string('appointer_phone_number');
    table.string('guided_by').collate('utf8_unicode_ci');
    table.string('comment').collate('utf8_unicode_ci');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.visitors);
};
