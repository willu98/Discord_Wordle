#!/bin/bash

#download node and npm
sudo apt update
sudo apt install nodejs
node -v
sudo apt install npm

#create our working directory if it doesnt exist
DIR="/home/ec2-user/wordle-bot"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi