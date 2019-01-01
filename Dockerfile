FROM node:8

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
ARG registry

RUN npm install -g nodemon

EXPOSE 8181

# Start the app
CMD /usr/src/app/init
