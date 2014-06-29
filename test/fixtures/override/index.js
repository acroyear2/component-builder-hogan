module.exports = function(ctx) {
  return require('./index.mustache').render(ctx, {
    partial: require('./partial.mustache')
  });
};