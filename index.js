
var Hogan = require('hogan.js');

var extname = /\.(hogan|hg|mustache|ms)$/;

module.exports = function (options) {
  options = options || {};
  options = extend(options, {asString: true});

  return function hogan (file, done) {
    if (!extname.test(file.path)) return done();

    file.read(function (err, text) {
      var codeObj = Hogan.compile(text, options);

      var string;
      if (options.disableLambda) {
        string = 'module.exports = new (require(\'hogan.js\')).Template(' + codeObj + ');';
      } else {
        string = 'var Hogan = require(\'hogan.js\'); module.exports = new Hogan.Template(' + codeObj + ', \"' + text +'\", Hogan);';
      }

      file.extension = 'js';
      file.string = string;
      
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
