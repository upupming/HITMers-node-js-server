module.exports = {
  port: process.env.PORT || 5757,
  db: {
    users: 'users',
    shifts: 'shifts',
    checks: 'checks',
    notices: 'notices'
  },
  secret: process.env.SECRET || 'supersecret',
  superIdentifies: [
    '老师',
    '队长'
  ],
  registerCode: process.env.REGISTER_CODE || 'sampleRegisterCode',
  streamAPI: 'https://api.streamable.com',
  streamCDN: 'https://cdn-b-east.streamable.com',
  streamUsername: process.env.STREAM_USERNAME,
  streamPassword: process.env.STREAM_PASSWORD
};