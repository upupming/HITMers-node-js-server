module.exports = {
  port: process.env.PORT || 5757,
  db: {
    users: 'users',
    shifts: 'shifts',
    checks: 'checks',
    notices: 'notices',
    stream_videos: 'videos',
    visitors: 'visitors'
  },
  secret: process.env.secret || 'supersecret',
  superIdentifies: [
    '老师',
    '队长'
  ],
  registerCode: process.env.register_code || 'sampleRegisterCode',
  streamAPI: 'https://api.streamable.com',
  streamCDN: 'https://cdn-b-east.streamable.com/video/mp4/',
  streamUsername: process.env.stream_username,
  streamPassword: process.env.stream_password,

  url2pdf: 'https://html-pdf-api.herokuapp.com'
};