var resolve = require('component-resolver');
var build = require('component-builder');
var path = require('path');
var vm = require('vm');

function fixture(name) {
  return path.join(__dirname, 'fixtures', name);
}

function req(string, tree) {
  return build.scripts.require + string
    + 'require("' + build.scripts.canonical(tree).canonical + '")';
}

describe('hogan', function () {
  it('simple', function (done) {

    resolve(fixture('simple'), {install: true}, function (err, tree) {
      if (err) throw err;
      
      build.scripts(tree)
        .use('scripts', build.plugins.js())
        .use('templates', require('..')())
        .end(function (err, string) {
          if (err) throw err;
          var fn = vm.runInNewContext(req(string, tree));
          fn({message: 'hola'}).trim().should.eql('<div>hola</div>');
          done();
        });
    });

  });
});
