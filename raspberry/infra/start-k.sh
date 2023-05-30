#!/bin/sh

set -x
echo "starting kurnik script"

# this fixes some fucking memory leak when running yarn on raspberry https://github.com/yarnpkg/yarn/issues/8927
export NODE_OPTIONS=--max-old-space-size=4000

# git clone git@github.com:mroz22/chickenhouse.io.git --single-branch

cd /home/pi/chickenhouse.io

git reset --hard
git pull origin master
git status

node --version
cp ./raspberry/.env ./raspberry/build
cd ./raspberry
node ./build/raspberry/index.js

