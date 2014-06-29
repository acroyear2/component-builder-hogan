module.exports = function(ctx) {
  return require('./child.mustache').render(ctx, {
    parent: '{{<older}}{{$a}}p{{/a}}{{$b}}{{#lambda}}p{{/lambda}}{{/b}}{{/older}}',
    older: '{{<grandParent}}{{$a}}o{{/a}}{{$c}}{{#lambda}}o{{/lambda}}{{/c}}{{/grandParent}}',
    grandParent: '{{$a}}g{{/a}} - {{$b}}g{{/b}} - {{$c}}g{{/c}} - {{#lambda}}g{{/lambda}}'
  });
};