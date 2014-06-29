
var Hogan = require('hogan.js');

var extname = /\.(hogan|hg|mustache|ms)$/;

var defaults = {
  asString: true
};

module.exports = function (options) {
  options = options || {};
  options = extend(options, defaults);

  return function hogan (file, done) {
    if (!extname.test(file.path)) return done();

    file.read(function (err, text) {
      file.extension = 'js';
      file.string = wrap(Hogan.compile(text, options), text);
      done();
    });
  };
};

function extend (obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function (source) {
    if (!source) return;

    for (var key in source) {
      obj[key] = source[key];
    }
  });

  return obj;
}

function wrap (codeObj, text) {
  return 'var Hogan = require(\'hogan.js\'); module.exports = new Hogan.Template(' + codeObj + ', \"' + text +'\", Hogan);';
}

