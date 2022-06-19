#!/bin/bash 

git clone git@github.com:mroz22/chickenhouse.io.git
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm install --global yarn
