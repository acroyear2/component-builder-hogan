
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

function buildScripts (tree, options, cb) {
  build.scripts(tree)
    .use('scripts', build.plugins.js())
    .use('templates', require('..')(options))
    .end(function (err, string) {
      if (err) throw err;
      cb(string);
    });
}

describe('hogan', function () {

  it('should accept options', function (done) {
    resolve(fixture('options'), {install: true}, function (err, tree) {
      if (err) throw err;
      buildScripts(tree, {delimiters: '<% %>'}, function (string) {
        var fn = vm.runInNewContext(req(string, tree));
        fn({message: 'hola'}).trim().should.eql('<div>hola</div>');
        done();
      });
    });
  });

  it('should render partials', function (done) {
    resolve(fixture('partials'), {install: true}, function (err, tree) {
      if (err) throw err;     
      buildScripts(tree, {}, function (string) {
        var fn = vm.runInNewContext(req(string, tree));
        fn({items: [{message: 'hola1'}, {message: 'hola2'}]}).trim()
          .should.eql('<ul><li>hola1</li><li>hola2</li></ul>');
        done();
      });
    });
  });

  it('should override inherited templates', function (done) {
    resolve(fixture('override'), {install: true}, function (err, tree) {
      if (err) throw err;     
      buildScripts(tree, {}, function (string) {
        var fn = vm.runInNewContext(req(string, tree));
        fn({}).trim().should.eql('default one, override two');
        done();
      });
    });
  });

  it('should match expected recursive output', function (done) {
    resolve(fixture('recursion'), {install: true}, function (err, tree) {
      if (err) throw err;     
      buildScripts(tree, {}, function (string) {
        var fn = vm.runInNewContext(req(string, tree));
        fn({}).trim().should.eql('override override override don\'t recurse');
        done();
      });
    });
  });

});
