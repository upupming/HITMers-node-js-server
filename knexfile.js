require('dotenv').config();
const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'db');

let pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  test: {
    client: 'mysql',
    connection: { 
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'data4upupming!',
      database: 'hitmers_test'
    },
    pool: {
      min: 0,
      max: 15
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    debug: true
  },
  development: {
    client: 'mysql',
    connection: { 
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'data4upupming!',
      database: 'hitmers'
    },
    pool: {
      min: 0,
      max: 15
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    debug: true
  },
  // For `heroku local web`
  staging: {
    client: 'postgresql',
    connection: process.env.database_url,
    pool: {
      min: 0,
      max: 15
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.database_url,
    pool: {
      min: 0,
      max: 15
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds-production')
    }
  }
};
