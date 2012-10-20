var Token = require("./token").Token;
var string = require("./string");

var Parser = function(data, currentFilePath) {
  this.currentFilePath = currentFilePath;
  this.clearData(data);
  this.createTokens();
};

Parser.prototype.clearData = function(data) {
  var ret = string.trim(new String(data)).split("\n");
  ret.splice(0, 4);

  this.data = ret.join("\n");
  this.overview = "";
};

Parser.prototype.createTokens = function() {
  this.fileTokens = [];
  this.depsTokens = [];
  if (!this.data) {
    return;
  }

  var tokensData = this.data.split("\n\n");
  var lastToken = tokensData[tokensData.length -1];
  if (lastToken && lastToken.indexOf("error(s),") != -1) {
    this.overview = string.trim(tokensData.splice(tokensData.length-1, 1).join("").split("\n")[0]);
  }

  tokensData.forEach(function(tokenData) {
    var token = new Token(tokenData);

    if (tokenData.indexOf(this.currentFilePath) != -1) {
      this.fileTokens.push(token);
    } else {
      this.depsTokens.push(token);
    }
  }, this);
};

Parser.prototype.toString = function() {
  if (!this.fileTokens.length && !this.depsTokens.length) {
    return "All correct.";
  }

  var ret = '<p><b>' + this.overview + '</b></p>';
  if (this.fileTokens.length) {
    ret += "<h1>Current File</h1>";
    this.fileTokens.forEach(function(token) {
      ret += token;
    });
  }
  if (this.depsTokens.length) {
    ret += "<h1>Dependency</h1>";
    this.depsTokens.forEach(function(token) {
      ret += token;
    });
  }

  return ret;
};

this.Parser = Parser;