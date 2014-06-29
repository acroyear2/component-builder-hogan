module.exports = function(ctx) {
  return require('./index.mustache').render(ctx, {
    include: require('./include.mustache'),
    include2: require('./include2.mustache')
  });
};