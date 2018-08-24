const CONF = {
  port: process.env.PORT || 5757,
  db: {
    users: 'users',
    shifts: 'shifts',
    checks: 'checks'
  }
};

module.exports = CONF;
