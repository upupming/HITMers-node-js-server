module.exports = async function(ctx, next) {
  console.log(ctx);
  await next();
};