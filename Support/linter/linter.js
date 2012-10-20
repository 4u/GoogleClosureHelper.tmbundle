// #teaser

var util = require("util");
var exec = require('child_process').exec;
var fs = require('fs');
var env = process.env;
var Parser = require("./parser").Parser;
var string = require("./string");

var BUILDER_PATH  = '/Users/maxnikitin/Development/Source/Closure/closure-library/closure/bin/build/closurebuilder.py';
var COMPILER_PATH  = '/Users/maxnikitin/Development/Source/Closure/closure-library/closure/bin/build/compiler.jar';
var CLOSURE_LIBRARY_PATH  = '/Users/maxnikitin/Development/Source/Closure/closure-library/closure/goog/';
var CLOSURE_LIBRARY_THIRD_PARTY_PATH  = '/Users/maxnikitin/Development/Source/Closure/closure-library/third_party/closure/goog/';
var CONTRIB_ROOT = env.TM_PROJECT_DIRECTORY + '/djangoproj/static/js_contrib/ojster';
var ROOT = env.TM_PROJECT_DIRECTORY + '/djangoproj/static/js_src/';

var cmd = [BUILDER_PATH,
  '--compiler_jar=' + COMPILER_PATH,
  '--root=' + CLOSURE_LIBRARY_PATH,
  '--root=' + CLOSURE_LIBRARY_THIRD_PARTY_PATH,
  '--root=' + CONTRIB_ROOT,
  '--root=' + ROOT,
  '--output_mode=compiled',
  '--input=' + env.TM_FILEPATH,
  '-f "--compilation_level=ADVANCED_OPTIMIZATIONS"',
  '-f "--warning_level=VERBOSE"',
  '-f "--jscomp_warning=accessControls"',
  '-f "--jscomp_warning=checkRegExp"',
  '-f "--jscomp_warning=checkTypes"',
  '-f "--jscomp_warning=checkVars"',
  '-f "--jscomp_warning=deprecated"',
  '-f "--jscomp_warning=fileoverviewTags"',
  '-f "--jscomp_warning=invalidCasts"',
  '-f "--jscomp_warning=missingProperties"',
  '-f "--jscomp_warning=nonStandardJsDocs"',
  '-f "--jscomp_warning=strictModuleDepCheck"',
  '-f "--jscomp_warning=undefinedVars"',
  '-f "--jscomp_warning=unknownDefines"',
  '> /dev/null'
];

//util.puts(cmd.join("\n") + "\n\n");

exec(cmd.join(" "), function (error, stdout, stderr) {
  if (stdout) {
    util.puts('<pre>' + util.puts + '</pre>');
  } else if (stderr) {
    try {
      var result = new Parser(stderr, env.TM_FILEPATH);
      util.puts(result);
    } catch(err) {
      util.puts('<pre>' + string.newLineToBr(string.htmlEscape(new String(stderr))) + '</pre>');
    }
  } else if (error !== null) {
    util.puts('<pre>' + error + '</pre>');
  }
});