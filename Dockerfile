FROM node:slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app



#install app dependencies

COPY package*.json ./

RUN cd /usr/src/app/

RUN npm install

RUN node --version



# #bundle app source code

# #COPY files

COPY . /usr/src/app



#set and open port

EXPOSE 3000



CMD [ "npm", "start" ]



