require("dotenv").config();
require("firebase/firestore");
require("firebase/auth");

const firebase = require("firebase/app");
const config = require("../deployments/config");

const Chickenhouse = require("./chickenhouse");
const Door = require("./modules/door");
const Light = require("./modules/light");

// const chickenhouse = new Chickenhouse();

console.log("Starting");

const DOOR_OPEN = 1;
const DOOR_CLOSE = -1;
const DOOR_STOP = 0;

const firebaseConfig = {
  projectId: "probable-bebop-176607",
  apiKey: "AIzaSyAz38W7-b0YKmYKAbA2ff0cGN_B0LsRiZo",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

if (process.env.NODE_ENV === "dev") {
  console.log("running in dev mode");
  db.useEmulator("localhost", 8080);
}

const { EMAIL, PASSWORD, KURNIK } = process.env;

if (!EMAIL || !PASSWORD || !KURNIK) {
  console.error("Missing required env");
  return process.exit(1);
}

const citadelConfig = config[KURNIK];

// sign in
firebase
  .auth()
  .signInWithEmailAndPassword(EMAIL, PASSWORD)
  .then((user) => {
    // console.log("user", user);

    // after successful sign up register listeners and set defaults.
    const dataRef = db.collection("kurnik").doc(KURNIK);

    const modules = citadelConfig.modules.map((module) => {
      const options = {
        dataRef,
        id: module.id,
        ...module.options.raspberry,
      };
      switch (module.type) {
        case "door":
          return new Door(options);
        case "light":
          return new Light(options);
      }
    });
    // dataRef.update({ rebooting: false });
    // dataRef.update({ reboot_command: false });

    // chickenhouse.on("dht/result", (message) => {
    //   console.log("dht/result", message);
    //   dataRef.update({ dht: message });
    // });

    // dataRef.onSnapshot(async function (doc) {
    //   if (!doc || !doc.data()) return;

    //   const reboot_command = doc.data().reboot_command;

    //   if (reboot_command === true) {
    //     await dataRef.update({ rebooting: true });
    //     chickenhouse.reboot();
    //   }
    // });
  })
  .catch((error) => {
    console.log("error", error);
  });

process.on("unhandledRejection", function (reason, p) {
  console.log(
    "Possibly Unhandled Rejection at: Promise ",
    p,
    " reason: ",
    reason
  );
});

process.on("uncaughtException", function (error) {
  console.log("uncaughtException", error.message);
});
