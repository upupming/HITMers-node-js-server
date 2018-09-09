const knex = require('../connection');
const config = require('../../config');

function minifyVideo(video) {
  let properties = ['video_id', 'created_by', 'created_at', 'subject', 'desc', 'video_code'];
  let minifiedVideo = {};
  for(let property of properties) {
    minifiedVideo[property] = video[property];
  }
  return minifiedVideo;
}

module.exports = {
  /**
   * @param {Object} filter a filter object of video information.
   */
  async addVideo(filter) {
    console.log(filter);
    let res = minifyVideo(filter);
    console.log(res);
    res.video_id = (await knex(config.db.stream_videos).insert(res).returning('video_id'))[0];
    let inserted = (await knex(config.db.stream_videos).where('video_id', res.video_id).select())[0];
    return inserted;
  },
  
  /**
   * Get all videos, form newer to older.
   */
  getVideos() {
    return knex(config.db.stream_videos).select().then(data => data.reverse());
  },

  async deleteVideo(video_id) {
    let res = (await knex(config.db.stream_videos).where({video_id}).select())[0];
    await knex(config.db.stream_videos).where({video_id}).del();
    return res;
  }
};