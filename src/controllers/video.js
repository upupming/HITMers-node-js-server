const queries = require('../db/queries/videos');
const users = require('../db/queries/users');

module.exports = {
  async postVideo(ctx) {
    console.log(ctx.request.body);
    ctx.request.body.created_by = ctx.req.user.id;
    ctx.body = await queries.addVideo(ctx.request.body);
    ctx.body.user = (await users.findUser({id: ctx.body.created_by}))[0];
  },
  async getVideos(ctx) {
    let videos = await queries.getVideos();

    for(let video of videos) {
      video.user = (await users.findUser({id: video.created_by}))[0];
    }

    ctx.response.body = videos; 
  },

  async deleteVideo(ctx) {
    ctx.body = await queries.deleteVideo(ctx.params.video_id);
    if(!ctx.body || ctx.body == '') {
      ctx.status = 404;
      ctx.body = 'No such video id.';
    } else {
      ctx.body.user = (await users.findUser({id: ctx.body.created_by}))[0];
    }
  }
};