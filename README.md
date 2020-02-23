# 20200222_phonetic_pronunciation_v1
 a simple app that returns the wav for a words pronusation using IPA (International Phonetic Alphabet)

![](/screehshot_v1.jpg?raw=true "Optional Title")
how to build the local npm repo
> npm run compile

how to build/run the docker container
build 
>docker build -t ipa-translator-v1 .
run forground (testing)
> docker run -i -p 8080:3000 -d ipa-translator-v1:latest
run background
> docker run -p 8080:3000 -d ipa-translator-v1:latest


RUN WITH DOCKER
>docker run -p 8080:3000 -d  wisehackermonkey/ipa-translator-v1

for runing on raspberry pi
>docker run -p 8080:3000 -d  wisehackermonkey/ipa-translator-v1-arm

