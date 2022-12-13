FROM ubuntu:22.04
RUN apt-get update -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
WORKDIR /usr/src/app
RUN mkdir logs
COPY package.json .
RUN npm i
RUN npm install mongodb --save
COPY app.js .
EXPOSE 3000 
CMD node app