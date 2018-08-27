let jwt = require('jsonwebtoken');
let config = require('../config');
let queries = require('../db/queries/users');

module.exports = async(ctx, next) => {
  let token = ctx.header['x-access-token'];
  console.log(token);
  let decoded;

  try {
    decoded = await jwt.verify(token, config.secret);
  } catch(err) {
    console.error(err);
    if(err.message === 'invalid token' || err.message === 'jwt malformed') {
      ctx.body = 'Wrong token.';
      ctx.status = 401;
    } else if(err.message === 'jwt must be provided') {
      ctx.body = 'No token provided.';
      ctx.status = 401;
    } else {
      ctx.body = 'Error on the server.';
      ctx.status = 500;
    }
    return;
  }

  let users = await queries.findUser({user_id: decoded.id});
  if(users.length !== 1) {
    ctx.body = 'Wrong token.';
    ctx.status = 401; 
    return;
  }
  
  /* Token is right.*/
  ctx.req.user = users[0];
  console.log(users[0]);
  await next();
};