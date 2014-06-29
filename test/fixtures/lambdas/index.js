module.exports = function(ctx) {
  return require('./child.mustache').render(ctx, {
    parent: require('./parent.mustache'),
    older: require('./older.mustache'),
    grandparent: '{{$a}}g{{/a}} - {{$b}}g{{/b}} - {{$c}}g{{/c}} - {{#lambda}}g{{/lambda}}'
  });
};