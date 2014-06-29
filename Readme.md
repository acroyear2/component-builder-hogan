# component-builder-hogan [![Build Status](https://travis-ci.org/tetsuo/component-builder-hogan.svg?branch=master)](https://travis-ci.org/tetsuo/component-builder-hogan)

[hogan.js](http://twitter.github.io/hogan.js/) plugin for [component-builder](https://www.npmjs.org/package/component-builder).

## Installation

```sh
npm install component-builder-hogan
```

## Usage

  Add your `.mustache`, `.hogan`, `.ms` or `.hg` files to the `templates` array in your `component.json`:

  ```js
  {
    "templates": [
      "one.mustache",
      "two.mustache"
    ]
  }
  ```

  Use the plugin during your build process:

  ```js
  var write = require('fs').writeFileSync;
  var resolve = require('component-resolver');
  var build = require('component-builder');

  function req(string, tree) {
    return build.scripts.require + string;
  }

  resolve(__dirname, {
    install: true
  }, function(err, tree) {
    build.scripts(tree)
      .use('scripts', build.plugins.js())
      .use('templates', hogan())
      .end(function(err, string) {
        write(file, req(string, tree));
      });
  });
  ```

  And then require the files in your Javascript:

  ```js
  var template = require('one.mustache');
  template.render(ctx, partials);
  ```

  __Note:__ You need to add hogan and the runtime yourself. For a full working example take a look at `./example`.

## License

The MIT License (MIT)

Copyright (c) 2014 Onur Gunduz ogunduz@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.