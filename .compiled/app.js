'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _textToIpa = require('text-to-ipa');

var _textToIpa2 = _interopRequireDefault(_textToIpa);

var _helpers = require('./lib/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//https://www.npmjs.com/package/text-to-ipa
var app = (0, _express2.default)();
var PORT = 3000;
var API_VERSION = "v1";
console.log("Server Started: " + PORT);

_textToIpa2.default.loadDict();

app.get("/", function (req, res) {
    res.send("Please visit /v1/word/<enter word here> or /v1/words/<enter sentences here>");
});

//main endpoint for server
app.get('/v1/word/:word', function (req, res) {
    var responce_json = {
        "sentence_ipa": "",
        "ipa_words": [],
        "sentence": "",
        "error": "",
        "version": API_VERSION
    };
    if (req.params.word) {
        var word = req.params.word;
        var ipa_translation = _textToIpa2.default.lookup(word);

        console.log(ipa_translation);
        responce_json.word = word;
        responce_json.error = ipa_translation.error == "undefined" ? "Word Not found" : "None";
        responce_json.ipa_words = ipa_translation.text;
        res.send(responce_json);
    } else {
        console.log("ERROR: word not found");
        var error_responce = req.params;
        error_responce["error"] = "ERROR: word not  found";
        res.send(error_responce);
    }
});

// words enpoint
app.get("/v1/words/:words", function (req, res) {
    var isSentence = req.params.words;
    var responce_json = {
        "sentence_ipa": "",
        "ipa_words": [],
        "sentence": "",
        "error": "",
        "version": API_VERSION
    };

    if (isSentence) {
        var sentence = req.params.words;
        var sentenceArray = [];
        sentenceArray = sentence.split(/\s+/); //split on space ex: .split(" ")
        // sentenceArray = sentenceArray.map((value)=> {
        //     return  cleanup(value)
        // })

        sentenceArray = sentenceArray.map(_helpers.cleanup);
        console.log(sentenceArray);
        responce_json.ipa_words = sentenceArray.map(function (value) {
            return _textToIpa2.default.lookup(value).text;
        });

        //Starting with {"error":"","sentence":"","ipa_words":["ðʌ OR ðʌˈ OR ði","bæˈtɚi","hɔˈɹs","stejˈpʌl"]}
        //Ending with   {"error":"","sentence":"","ipa_words":["ðʌ"             ,"bæˈtɚi","hɔˈɹs","stejˈpʌl"]}
        // split the multple ipa forms and take only the first one
        // "ðʌ OR ðʌˈ OR ði" => becomes  ["ðʌ", "ðʌˈ", "ði"] and retulting in "ðʌ"
        responce_json.ipa_words = responce_json.ipa_words.map(function (word) {
            return word.split("OR").map(function (value) {
                return value.trim();
            })[0];
        });

        //ipa sentense version with spaces between words
        responce_json.sentence_ipa = responce_json.ipa_words.reduce(function (accumulator, currentValue) {
            return accumulator + " " + currentValue;
        });

        res.send(JSON.stringify(responce_json));
    } else {
        responce_json.error = "sentence not found";
        res.send(JSON.stringify(responce_json));
    }
});

app.listen(PORT, function () {
    return console.log('Example app listening on port ' + PORT + '!');
});
//# sourceMappingURL=app.js.map