module.exports = {
  apps : [{
    name: 'HITMers Node.js Server',
    script: './src/app.js',
    instances: '1',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};