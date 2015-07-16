'use strict';

var Program = require('commander');
var MdOpen = require('./md-open');

Program
  .version(require('../package.json').version)
  .arguments('<file> [options]')
  .option('--interactive', 'TODO')
  .action(function(file, options) {

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
  if (process.stdin.isTTY) {
    // Display the application help.
    Program.outputHelp();
  } else {
    // log incoming stdin data
    var input = '';
    process.stdin.on('data', function (d){
      input += '' + d;
    })
    process.stdin.on('close', function (){
      // parse it and display it on stdout
      var text = MdOpen.parseFile(input);
      process.stdout.write(text + '\n');
    })
  }
}
