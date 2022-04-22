#Multi stage docker file
#First stage is installing dependencies
#Second stage is building an app


#1 stage (install dep.)
FROM node:lts-alpine as build

#Resolve dependecies for bcrypt
RUN apk --update --no-cache add python2 g++ make

#Create app directory inside container image
WORKDIR /app

COPY ./package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

#2 stage (building)
FROM node:lts-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY --from=build /app/dist ./dist

CMD [ "node", "dist/main" ]
