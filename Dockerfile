###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine As Build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 9090

CMD ["node", "dist/main.js"]