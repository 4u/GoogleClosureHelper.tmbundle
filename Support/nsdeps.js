var fs = require('fs');
var util = require('util');

var NsDeps = function(depsPath) {
  this.ns = [];
  this.readDeps(depsPath);
};
module.exports = NsDeps;

NsDeps.prototype.readDeps = function(depsPaths) {
  depsPaths = depsPaths instanceof Array ? depsPaths : [depsPaths];

  var _this = this;
  var goog = {};
  goog.addDependency = function(relPath, provides, requires) {
    for (var i = 0; provide = provides[i]; i++) {
      _this.add(provide);
    }
  };


  for (var i = 0; depsPath = depsPaths[i]; i++) {
    var data = new String(fs.readFileSync(depsPath));
    eval("\n" + data);
  }
};

NsDeps.prototype.add = function(ns) {
  if (-1 != this.ns.indexOf(ns)) {
    return;
  }

  this.ns.push(ns);
};

NsDeps.prototype.search = function(str) {
  var ret = [];

  this.ns.forEach(function(ns) {
    if (-1 != ns.indexOf(str)) {
      ret.push(ns);
    }
  }, this);
};

NsDeps.prototype.writeToFile = function(path) {
  var ret = '';

  ret += '<?xml version="1.0" encoding="UTF-8"?>' + "\n";
  ret += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' + "\n";
  ret += '<plist version="1.0">' + "\n";
  ret += '<array>' + "\n";
  this.ns.forEach(function(ns, pos) {
    ret += '    <dict>';
    ret += '        <key>display</key>';
    ret += '        <string>' + ns + '</string>';
    ret += '    </dict>' + "\n";
  });
  ret += '</array>' + "\n";
  ret += '</plist>' + "\n";

  fs.writeFileSync(path, ret);
};
