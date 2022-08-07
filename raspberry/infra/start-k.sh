#!/bin/sh

set -x
echo "starting kurnik script"

# git clone git@github.com:mroz22/chickenhouse.io.git --single-branch

cd /home/pi/chickenhouse.io

git reset --hard
git pull origin master
git status

# argh, cron does not see these paths
/home/pi/.nvm/versions/node/v14.20.0/bin/node --version
# todo probably some install script?
/home/pi/.nvm/versions/node/v14.20.0/bin/npm install -g yarn
/home/pi/.nvm/versions/node/v14.20.0/bin/yarn workspace raspberry start

