
var domify = require('domify');
var index = require('./index.mustache');
var base = require('./base.mustache');
var header = require('./header.mustache');
var item = require('./item.mustache');

var res = index.render(
  {
    title: 'ehlo world',
    items: [
     {
      label: 'ar'
     },
     {
      label: 'jan'
     },
     {
      label: 'tin'
     }
    ]
  }, 
  
  {
    base: base,
    header: header,
    item: item
  }
);

document.body.appendChild(domify(res));