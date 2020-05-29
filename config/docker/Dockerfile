FROM node
LABEL MAINTAINER="Eduardo Henrique"
COPY . /var/www
WORKDIR /var/www
RUN yarn
RUN yarn build
ENTRYPOINT ["yarn", "start"]
EXPOSE 4000
