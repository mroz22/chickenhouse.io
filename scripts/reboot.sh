#!/bin/bash 

cd chickenhouse.io
git pull origin master
git status
cd raspberry
yarn
yarn start
