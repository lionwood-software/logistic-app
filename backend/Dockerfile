#Multi stage docker file
#First stage is installing dependencies
#Second stage is building an app


#1 stage (install dep.)
FROM node:lts-alpine as build

#Create app directory inside container image
WORKDIR /app

COPY ./package.json ./


#Resolve dependecies for bcrypt
RUN apk --update --no-cache add python2 g++ make

RUN npm install --only=production --legacy-peer-deps

RUN npm install @nestjs/cli

COPY . .

#2 stage (building)
FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app ./

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
