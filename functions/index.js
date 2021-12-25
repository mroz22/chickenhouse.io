const request = require("request");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore()

exports.webhook = functions.https.onRequest((req, res) => {
    console.log('webhook');
    console.log(JSON.stringify(req.body));

    const testRef = db.collection('kurnik').doc('test');
    testRef.set({
        name: "payment",
        data: req.body,
    });


    const token = functions.config().btcpayserver.apikey;

    const options = {
        method: 'GET',
        url: `https://btcpay883288.lndyn.com/api/v1/stores/FFyf9JSGv4BqkGsWnWw6G5DtzqPWcTpBSWsAhhj3MB31/invoices`,
        headers:
        {
            'postman-token': '7e177f71-88a6-2132-d107-597ec093935a',
            'cache-control': 'no-cache',
            authorization: `token ${token}`
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.send(JSON.stringify(body));

    });


});