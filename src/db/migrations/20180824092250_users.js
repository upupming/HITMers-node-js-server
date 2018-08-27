const config = require('../../config');

exports.up = function(knex) {
  return knex.schema.createTable(config.db.users, function(table) {
    table.increments('user_id');
    table.string('id').unique().collate('utf8_unicode_ci');
    table.string('name').collate('utf8_unicode_ci');
    table.string('identify').collate('utf8_unicode_ci');
    table.bigInteger('phone_number', 13);
    table.string('language').collate('utf8_unicode_ci');
    table.integer('session');
    table.string('password').collate('utf8_unicode_ci');
    table.integer('password_changed_times').defaultTo(0);
    table.integer('reputation').defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(config.db.users);
};
