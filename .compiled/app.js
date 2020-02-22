'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;
console.log("Server Started: " + PORT);
app.get('/', function (req, res) {
  return res.send('Hello World!');
});

app.listen(PORT, function () {
  return console.log('Example app listening on port ' + PORT + '!');
});
//# sourceMappingURL=app.js.map