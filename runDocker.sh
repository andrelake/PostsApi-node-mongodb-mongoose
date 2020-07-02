#image download
docker pull mongo

#delete container, if exists
docker stop node-mongoose-dio-tentativa
docker container rm node-mongoose-dio-tentativa

#create container
docker run --name node-mongoose-dio-tentativa -p 27017:27017 -d mongo