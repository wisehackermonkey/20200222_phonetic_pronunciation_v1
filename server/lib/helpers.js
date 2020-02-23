//remove all bad characters from a word to be used with texttoipa
export function cleanup(word){
    return word.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ')
}