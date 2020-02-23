'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Imports the Google Cloud client library
var textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
var fs = require('fs');
var util = require('util');
// Creates a client
var client = new textToSpeech.TextToSpeechClient();
async function quickStart() {

  // The text to synthesize
  var text = 'hello, world!';

  // Construct the request
  var request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' }
  };

  // Performs the text-to-speech request

  var _ref = await client.synthesizeSpeech(request),
      _ref2 = _slicedToArray(_ref, 1),
      response = _ref2[0];
  // Write the binary audio content to a local file


  var writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();
//# sourceMappingURL=text-to-speach-example.js.map