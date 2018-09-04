module.exports = {
  port: process.env.PORT || 5757,
  db: {
    users: 'users',
    shifts: 'shifts',
    checks: 'checks'
  },
  secret: process.env.SECRET || 'supersecret',
  superIdentifies: [
    '老师',
    '队长'
  ],
  registerCode: process.env.REGISTER_CODE || 'sampleRegisterCode'
};