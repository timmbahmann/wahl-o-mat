FROM node:12  

WORKDIR /usr/src/app  

COPY package*.json ./  

RUN npm install COPY . .  

RUN npm run frontend:build  

EXPOSE 3001 

CMD [ "node", "index.js" ]
