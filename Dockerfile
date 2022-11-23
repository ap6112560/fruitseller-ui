FROM node:16-alpine
RUN mkdir /workspace
WORKDIR /workspace
COPY package.json ./
COPY public ./public
COPY src ./src

RUN npm install

EXPOSE 3000
ENTRYPOINT ["npm","run","start"]