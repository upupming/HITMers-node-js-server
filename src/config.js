module.exports = {
  port: process.env.PORT || 5757,
  db: {
    users: 'users',
    shifts: 'shifts',
    checks: 'checks'
  },
  secret: process.env.SECRET || 'supersecret'
};