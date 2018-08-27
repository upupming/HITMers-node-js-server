const config = require('../config');
const queries = require('../db/queries/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setErrorStatus(ctx, status) {
  ctx.status = status;
  ctx.body = {
    auth: false,
    token: null
  };
}

module.exports = async (ctx) => {
  try {
    let password = ctx.request.body.password || '';
    if(password) delete ctx.request.body.password;
    const users = await queries.findUser(ctx.request.body);
    console.log(users);
    // Check if the user exists
    if(users.length !== 1) {
      setErrorStatus(ctx, 404);
    } else {
      let user = users[0];
      // Check if the password is valid
      let passwordIsValid = bcrypt.compareSync(password, user.password);
      if(!passwordIsValid) {
        setErrorStatus(ctx, 401);
      } else {
        // Create a token if the password is valid
        let token = jwt.sign({id: user.user_id}, config.secret);
        ctx.body = {
          auth: true,
          token: token
        };
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = 'Error on the server.';
  }
};