module.exports = function(ctx) {
  return require('./ul.mustache').render(ctx, {li: require('./li.mustache')});
};