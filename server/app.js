import express from 'express'
//https://www.npmjs.com/package/text-to-ipa
import TextToIPA from 'text-to-ipa'
import { cleanup } from './lib/helpers'

const app = express()
const PORT = 3000
console.log("Server Started: " + PORT)

TextToIPA.loadDict();

//main endpoint for server
app.get('/v1/word/:word', function (req, res) {

    if(req.params.word){
        let word = req.params.word
        let ipa_translation = TextToIPA.lookup(word)

        console.log(ipa_translation)
        let responce_json = {
                 "word": word,
                "error": ipa_translation.error == "undefined" ? "Word Not found":"None",
                "ipa_translation": ipa_translation.text,
                "version": "v1"
        }
        res.send(responce_json)

    }else{
        console.log("ERROR: word not found")
        let error_responce = req.params
        error_responce["error"] ="ERROR: word not found"
        res.send(error_responce)     
    }
    

})


// words enpoint
app.get("/v1/senence/:words",(req,res)=>{
    let isSentence = req.params.words
    let responce_json = {
        "error":"",
        "sentence":"",
        "sentence_ipa":"",
        "ipa_words":[]
    }

    if(isSentence) {
        let sentence = req.params.words
        let sentenceArray = []
        sentenceArray = sentence.split(/\s+/)//split on space ex: .split(" ")
        // sentenceArray = sentenceArray.map((value)=> {
        //     return  cleanup(value)
        // })

        sentenceArray = sentenceArray.map(cleanup)
        console.log(sentenceArray)
        responce_json.ipa_words = sentenceArray.map((value)=>{
          return TextToIPA.lookup(value).text
        })
        
        //Starting with {"error":"","sentence":"","ipa_words":["ðʌ OR ðʌˈ OR ði","bæˈtɚi","hɔˈɹs","stejˈpʌl"]}
        //Ending with   {"error":"","sentence":"","ipa_words":["ðʌ"             ,"bæˈtɚi","hɔˈɹs","stejˈpʌl"]}
        // split the multple ipa forms and take only the first one
        // "ðʌ OR ðʌˈ OR ði" => becomes  ["ðʌ", "ðʌˈ", "ði"] and retulting in "ðʌ"
        responce_json.ipa_words = responce_json.ipa_words.map((word)=>{
            return word.split("OR").map((value)=>{ return value.trim()})[0]
        })

        //ipa sentense version with spaces between words
        responce_json.sentence_ipa = responce_json.ipa_words.reduce((accumulator, currentValue)=> { 
            return accumulator +" "+ currentValue
        });

        res.send(JSON.stringify(responce_json))
    }else{
        res.send(JSON.stringify(responce_json))
    }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
