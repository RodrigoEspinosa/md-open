'use strict';

var Program = require('commander');

Program
  .version(require('../package.json').version)
  .arguments('<file> [options]')
  .option('--interactive', 'TODO')
  .action(function(file, options) {

    var MdOpen = require('./md-open');

    // Check if there is a token on the arguments.
    if (Program.interactive) {
      // MdOpen.interactiveOpen(file);
    } else {
      MdOpen.readFile(file);
    }
  })
  .parse(process.argv);

// Check if there are no arguments.
if (!process.argv.slice(2).length) {
  // Display the application help.
  Program.outputHelp();
}
