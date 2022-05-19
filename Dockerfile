FROM node:12

WORKDIR /app

COPY package*.json ./

CMD [ "npm ", "i" ]

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD [ "npm", "start" ]