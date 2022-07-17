FROM node:18.6.0

WORKDIR /home/node/app

COPY . .

RUN rm -rf node_modules

RUN npm install --quiet

RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/start.js" ]
