# FROM node
# LABEL MAINTAINER="Eduardo Henrique"
# COPY . /var/www
# WORKDIR /var/www
# RUN yarn
# RUN yarn build
# ENTRYPOINT ["yarn", "start"]
# EXPOSE 4000

FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "dist/index.js" ]