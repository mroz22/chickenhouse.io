require("dotenv").config();
require("firebase/firestore");
require("firebase/auth");

const firebase = require("firebase/app");
const Chickenhouse = require("./chickenhouse");

const chickenhouse = new Chickenhouse();

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

const { EMAIL, PASSWORD, KURNIK } = process.env;

if (!EMAIL || !PASSWORD || !KURNIK) {
  console.error("Missing required env");
  return process.exit(1);
}

// sign in
firebase
  .auth()
  .signInWithEmailAndPassword(EMAIL, PASSWORD)
  .then((user) => {
    console.log("user", user);

    // after successful sign up register listeners and set defaults.
    const dataRef = db.collection("kurnik").doc(KURNIK);
    dataRef.update({ rebooting: false });
    dataRef.update({ reboot_command: false });
    dataRef.update({ door_movement: DOOR_STOP });

    chickenhouse.on("door-stop-bottom", (value) => {
      if (value === 0) {
        dataRef.update({ door_movement: DOOR_STOP });
        dataRef.update({ door_position: "bottom" });
      }
      if (value === 1) {
        dataRef.update({ door_position: "" });
      }
      return console.log("PIN_DOOR_STOP_BOTTOM value", value);
    });

    chickenhouse.on("door-stop-top", (value) => {
      if (value === 0) {
        dataRef.update({ door_movement: DOOR_STOP });
        dataRef.update({ door_position: "top" });
      }
      if (value === 1) {
        dataRef.update({ door_position: "" });
      }
      return console.log("PIN_DOOR_STOP_TOP value", value);
    });

    chickenhouse.on("dht/result", (message) => {
      console.log("dht/result", message);
      dataRef.update({ dht: message });
    });

    dataRef.onSnapshot(async function (doc) {
      if (!doc || !doc.data()) return;
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      const door_movement = doc.data().door_movement;
      const door_position = doc.data().door_position;

      if (door_movement === DOOR_OPEN && door_position !== "top") {
        chickenhouse.moveUp();
      }
      if (door_movement === DOOR_CLOSE && door_position !== "bottom") {
        chickenhouse.moveDown();
      }
      if (door_movement === DOOR_STOP) chickenhouse.stop();

      const light_state = doc.data().light_state ? 1 : 0;
      chickenhouse.setlight_state(light_state);

      const reboot_command = doc.data().reboot_command;

      if (reboot_command === true) {
        await dataRef.update({ rebooting: true });
        chickenhouse.reboot();
      }
    });
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
  dataRef.update({ error: reason });
});

process.on("uncaughtException", function (error) {
  console.log("uncaughtException", error.message);
  dataRef.update({ error });
});
