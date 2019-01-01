FROM node:8

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
ARG registry

ADD . /usr/src/app

#RUN yarn install --production
RUN yarn install
RUN yarn global add nodemon

RUN chmod +x /usr/src/app/init

EXPOSE 8181

# Start the app
CMD bash /usr/src/app/init
