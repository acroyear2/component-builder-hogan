var fs = require('fs-extra');
var path = require('path');
var resolve = require('component-resolver');
var build = require('component-builder');

function req(string, tree) {
  return build.scripts.require + string;
}

resolve(__dirname, {
  install: true,
  out: path.resolve(__dirname, 'components')
}, function(err, tree) {
  build.scripts(tree)
    .use('scripts', build.plugins.js())
    .use('templates', require('component-builder-hogan')({}))
    .end(function(err, string) {
      fs.outputFileSync(path.resolve(__dirname, 'build/build.js'), 
        req(string, tree));
    });
});