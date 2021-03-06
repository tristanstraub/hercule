// Generated by CoffeeScript 1.8.0
(function() {
  var async, dashdash, e, fs, help, main, md, opts, parser;

  md = require('./transclude');

  dashdash = require('dashdash');

  fs = require('fs');

  async = require('async');

  parser = dashdash.createParser({
    options: [
      {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Print this help and exit.'
      }, {
        names: ['verbose', 'v'],
        type: 'arrayOfBool',
        help: 'Verbose output. Use multiple times for more verbose.'
      }, {
        names: ['output', 'o'],
        type: 'string',
        help: 'File to output',
        helpArg: 'FILE'
      }
    ]
  });

  try {
    opts = parser.parse(process.argv);
  } catch (_error) {
    e = _error;
    console.error("md-transclude: error: " + e.message);
    process.exit(1);
  }

  if (opts.help) {
    help = parser.help({
      includeEnv: true
    }).trimRight();
    console.log("usage: md-transclude [OPTIONS]\noptions:\n" + help);
    process.exit();
  }

  main = function() {
    var output;
    output = "";
    return async.eachSeries(opts._args, function(input, cb) {
      return md.transclude(input, null, null, opts.verbose, function(err, document) {
        if (err) {
          return cb(err);
        }
        output += document;
        return cb(null);
      });
    }, function(err) {
      if (err) {
        throw err;
      }
      if (opts.output) {
        return fs.writeFile(opts.output, output, function(err) {
          if (err) {
            throw err;
          }
        });
      } else {
        return console.log(output);
      }
    });
  };

  main();

}).call(this);
