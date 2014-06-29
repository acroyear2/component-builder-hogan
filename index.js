
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

    file.read(function (err, string) {
      file.extension = 'js';
      file.string = wrap(Hogan.compile(string, options));
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

function wrap (template) {
  return (
    'var t = new (require(\'hogan.js/lib/template.js\')).Template(' + template + ');' +
    'module.exports = {' +
    '  render: function () { return t.render.apply(t, arguments); },' +
    '  r: function () { return t.r.apply(t, arguments); },' +
    '  ri: function () { return t.ri.apply(t, arguments); },' +
    '  ib: function () { return t.ib.apply(t, arguments); }' +
    '};'
  );
}
