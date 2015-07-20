'use strict';

var Chalk = require('chalk');
var marked = require('marked');
var renderer = new marked.Renderer();

/**
 * Override the headings format.
 *
 * @param {String} text
 * @param {Number} level
 * @return {String}
 */
renderer.heading = function(text, level) {
  var render;
  // Set the maximum amount of columns for the header to be 81.
  var linesAmount = (process.stdout.columns < 81) ? process.stdout.columns : 81;

  switch (level) {
    case 1:
      render = Chalk.blue.bold(text.toUpperCase(), '\n' + Array(linesAmount).join('='), '<br><br>');
      break;
    case 2:
      render = Chalk.green(text.toUpperCase(), '\n' + Array(linesAmount).join('-'), '<br><br>');
      break;

    case 3:
      render = Chalk.green('###', text.toUpperCase()) + '<br>';
      break;

    // Levels 4, 5 and 6 follows the same pattern.
    default:
      render = Chalk.green.dim(new Array(level).join('#') + ' ' + text) + '<br>';
  }

  return render;
};

/**
 * Override the block of code.
 *
 * @param {String} text
 * @return {String}
 */
// renderer.code = function(text) {
//   text = text.replace(/\n\r/, new Array(4).join(' ') + '<br>');
//
//   return new Array(4).join(' ') + text + '<br>';
// };

renderer.codespan = function(text) {
  return Chalk.magenta(text);
};

/**
 * Override the strong span.
 *
 * @param {String} text
 * @return {String}
 */
renderer.strong = function(text) {
  return Chalk.bold(text);
};

/**
 * Override the image span. Display a `Image: {URL}` text.
 *
 * @param {String} href
 * @param {String} title
 * @param {String} text
 * @return {String}
 */
renderer.image = function(href, title, text) {
  return Chalk.bold('Image: ') + Chalk.underline(href) + '<br>';
};

// Set the wrapper of the current marked instance to render with the new renderer.
marked.setOptions({
  renderer: renderer,
  terminal: true
});

// Export the marked wrapper.
exports = module.exports = marked;
