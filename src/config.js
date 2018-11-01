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
  secret: process.env.SECRET || 'supersecret',
  superIdentifies: [
    '老师',
    '队长'
  ],
  registerCode: process.env.REGISTER_CODE || 'sampleRegisterCode',
  streamAPI: 'https://api.streamable.com',
  streamCDN: 'https://cdn-b-east.streamable.com/video/mp4/',
  streamUsername: process.env.STREAM_USERNAME,
  streamPassword: process.env.STREAM_PASSWORD,

  url2pdf: 'https://html-pdf-api.herokuapp.com'
};