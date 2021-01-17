FROM node:alpine

WORKDIR /usr/src/app

COPY todo-app-frontend ./todo-app-frontend

RUN cd todo-app-frontend && npm install && npm run build

RUN cp -r ./todo-app-frontend/build ./build

RUN rm -rf todo-app-frontend

COPY todo-app-backend/package*.json ./

RUN npm ci

COPY todo-app-backend/ ./

CMD ["npm", "start"]

EXPOSE 5000