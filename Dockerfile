FROM node:18-alpine

WORKDIR /app

COPY . /app

ARG BACKEND_API
ARG Get_Synonyms_API_Prefix

ENV BACKEND_API=${BACKEND_API}
ENV Get_Synonyms_API_Prefix=${Get_Synonyms_API_Prefix}

RUN npm install

RUN npm run build

CMD ["npm", "start"]
