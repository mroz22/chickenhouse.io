<h1 align="center">Chickenhouse.io</h1>

Chickenhouse.io is a freetime side project that serves few pusposes:
1. Trying out new technologies
2. Fun 

Chickenhouse.io project brings IoT to your courtyard. It allows you to control your coop 
from any internet connected device (smartphone, laptop). Your chickencoop on stereoids.

## Techs
1. Frontend using vue/vuex/vue-roter/vue/router-sync
2. Serverless architecture using firebase
3. Offline ready, progressive web app (PWA)
4. IoT using Arduino platform

## [Online Demo](https://chickenhouse-fa834.firebaseapp.com/)

## Install and run

Modify .env.example to .env and fill your own config. 

``` bash
# install core dependencies
npm install

# bootstrap package dependencies with lerna
lerna bootstrap

# cd into app packages 
cd packages/app

# run dev server
npm run dev 
```
## Credits
Based on [DaxChen/vue-firebase-starter](https://github.com/DaxChen/vue-firebase-starter)
