'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanup = cleanup;
//remove all bad characters from a word to be used with texttoipa
function cleanup(word) {
    return word.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
}
//# sourceMappingURL=helpers.js.map