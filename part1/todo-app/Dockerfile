FROM node:alpine

WORKDIR /usr/src/app

COPY todo-app-backend/package*.json ./

RUN npm ci

COPY todo-app-backend/ ./

CMD ["npm", "start"]

EXPOSE 5000