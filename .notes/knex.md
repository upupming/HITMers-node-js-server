# CLI commands

## migration cheet sheet

```
knex migrate:latest --env development
knex seed:run --env development
```

## Create a new table

1. Create a new migration

    ```bash
    knex migrate:make visitors
    ```

2. Edit the migration file `20181030122247_visitors.js` to define table columns:

    ```js
    const config = require('../../config');

    exports.up = function(knex) {
    return knex.schema.createTable(config.db.visitors, function(table) {
        table.increments('visitor_id');
        table.string('name').collate('utf8_unicode_ci');
        table.integer('year').defaultTo(new Date().getFullYear());
        table.integer('month');
        table.integer('day');
        table.dateTime('arriving');
        table.dateTime('leaving');
    });
    };

    exports.down = function(knex) {
    return knex.schema.dropTable(config.db.visitors);
    };

    ```

3. Run the migration file

    ```bash
    knex migrate:latest 
    ```

    undo:

    ```bash
    knex migrate:rollback
    ```

## Useful links

1. http://perkframework.com/v1/guides/database-migrations-knex.html