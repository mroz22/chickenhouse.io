#!/bin/sh

set -x
echo "starting kurnik script"

# git clone git@github.com:mroz22/chickenhouse.io.git --single-branch

cd /home/pi/chickenhouse.io

git reset --hard
git pull origin master
git log


node --version
# todo probably some install script?
npm install -g yarn

yarn workspace raspberry start

