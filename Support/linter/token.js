var string = require("./string");

var Token = function(str) {
  // trimmed
  var data = string.trim(str).split("\n");
  var firstLine = data.shift();
  var firstLineMatches = firstLine.match(Token.Regex.FIRST_LINE);

  this.file = firstLineMatches[1];
  this.line = firstLineMatches[2];
  this.type = firstLineMatches[4];
  this.err =  string.htmlEscape(firstLineMatches[5]);
  this.details = string.htmlEscape(data.join("\n"));
};

Token.Regex = {
  FIRST_LINE: /^(.+):(\d+): (([A-Z]+) - )?(.+)$/
};

Token.prototype.toString = function() {
  return [
    '<a href="txmt://open?url=file://',  this.file, '&line=', this.line, '">',
      this.file, ':', this.line,
    '</a><br>',
    '<b>', this.type, '</b>: ', this.err,
    '<pre>',
      this.details,
    '</pre>'
  ].join('');
};

this.Token = Token;