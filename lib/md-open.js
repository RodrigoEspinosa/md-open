'use strict';

var Fs = require('fs');
var marked = require('./markdown-wrapper');
var htmlToText = require('html-to-text');

/**
 * Parse the file contents.
 *
 * @param {String} fileContents
 * @return {String}
 */
var parseFile = function(fileContents) {
  // Parse the file contents with marked.
  var html = marked(fileContents);

  // Replace the missing HTML nodes with the htmlToText module.
  var text = htmlToText.fromString(html);

  // Return the parsed text.
  return text;
};


/**
 * Read and parse the specified file.
 *
 * @param {String} filePath
 * @return {Void}
 */
var readFile = function(filePath) {

  // Ensure that filePath parameter is valid.
  if (typeof filePath !== 'string') {
    throw new TypeError('The filePath parameter should be a String.');
  }

  // TODO Check if the file exists.


  // Read the file contents.
  Fs.readFile(filePath, {encoding: 'utf8'}, function(err, contents) {

    if (err) {
      console.log('There was an error.');
      return undefined;
    }

    // Parse the text.
    var text = parseFile(contents);

    // Write the processing result on the stdout.
    process.stdout.write(text + '\n');
  });

};

// Read the file, dummy version.
var filePath = process.argv[2];
readFile(filePath);
