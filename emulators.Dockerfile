FROM node
WORKDIR /app

RUN apt-get update && apt-get install default-jre -y
RUN npm install -g firebase-tools

COPY .firebaserc firebase.json database.rules.json /app/
COPY ./dump /app/dump

EXPOSE 9001 5001 4000

CMD [ "firebase", "emulators:start", "--import=./dump" ]
