"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require("dotenv/config");
var config_1 = require("../deployments/config");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var app_1 = require("firebase/app");
var env_1 = require("./utils/env");
var door_1 = require("./modules/door");
var light_1 = require("./modules/light");
var life_monitor_1 = require("./modules/life-monitor");
console.log("Starting");
var firebaseConfig = {
    projectId: "probable-bebop-176607",
    apiKey: "AIzaSyAz38W7-b0YKmYKAbA2ff0cGN_B0LsRiZo"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, firestore_1.getFirestore)();
if ((0, env_1.isDev)()) {
    console.log("running in dev mode");
    (0, firestore_1.connectFirestoreEmulator)(db, "127.0.0.1", 8080);
}
else {
    console.log("running in prod mode");
}
var _a = process.env, EMAIL = _a.EMAIL, PASSWORD = _a.PASSWORD, KURNIK = _a.KURNIK;
if (!EMAIL || !PASSWORD || !KURNIK) {
    console.error("Missing required env");
    process.exit(1);
}
function isValidKurnik(name) {
    return ['chicken-citadel', 'chicken-hut'].includes(name);
}
if (!isValidKurnik(KURNIK)) {
    console.log(KURNIK, 'not part of config!');
    process.exit(1);
}
var citadelConfig = config_1.config[KURNIK];
var auth = (0, auth_1.getAuth)(app);
(0, auth_1.signInWithEmailAndPassword)(auth, EMAIL, PASSWORD)
    .then(function (_user) {
    console.log("user logged in");
    var dataRef = (0, firestore_1.doc)(db, 'kurnik', KURNIK);
    setInterval(function () {
        (0, firestore_1.updateDoc)(dataRef, 'timestamp', Date.now());
    }, 1000 * 60);
    citadelConfig.modules.map(function (module) {
        var options = __assign({ dataRef: dataRef, id: module.id }, module.options.raspberry);
        switch (module.type) {
            case "door":
                return new door_1.Door(options);
            case "light":
                return new light_1.Light(options);
            case "life-monitor":
                return new life_monitor_1.LifeMonitor(options);
        }
    });
})["catch"](function (error) {
    console.log("error", error);
});
process.on("unhandledRejection", function (reason, p) {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
process.on("uncaughtException", function (error) {
    console.log("uncaughtException", error.message);
});
//# sourceMappingURL=index.js.map