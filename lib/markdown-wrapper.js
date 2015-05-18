'use strict';

var Chalk = require('chalk');
var marked = require('marked');
var renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  var render;

  switch (level) {
    case 1:
      render = Chalk.blue.bold(text.toUpperCase() + '<hr>');
      break;
    case 2:
      render = Chalk.green(text.toUpperCase()) + '<br>';
      break;

    default:
      render = text;
  }

  return render;
};

renderer.strong = function(text) {
  return Chalk.bold(text);
};

renderer.image = function(href, title, text) {
  return Chalk.bold('Image: ') + Chalk.underline(href) + '<br>';
};

marked.setOptions({
  renderer: renderer
});

exports = module.exports = marked;
