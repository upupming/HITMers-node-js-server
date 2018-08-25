const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[environment];

console.log('Current NODE_ENV: ' + environment);
console.log('Using knex config: ' + JSON.stringify(config));

module.exports = require('knex')(config);