## GET NODE IMAGE FROM DOCKER HUB
FROM node:16.18-buster

## UPDATING SOME FILESYSTEM
RUN apt-get -y update --fix-missing --no-install-recommends
RUN apt-get -y upgrade

## DISABLE QUESTION/DIALOG PROMPT WHEN INSTALLING
ARG DEBIAN_FRONTEND=noninteractive

## CREATE WORKDIR
WORKDIR /app

## CREATE USER
USER root

## CHANGE OWNER ALL SYSTEM FILE TO NEW USER
COPY --chown=root:root ./ /app

## DOING INSTALLING STEPS
RUN npm install --working-dir=/app
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

## CHANGE FOLDER ACCESS PERMISSION
RUN chmod -R 777 /app/bin

## EXPOSE PORT THEN START COMMAND
EXPOSE 80
CMD [ "npm", "start" ]