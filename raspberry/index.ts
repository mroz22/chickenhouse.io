import 'dotenv/config'
import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";
import config from "../deployments/config";
import { isDev } from "./utils/env";

import { Door } from "./modules/door";
import { Light } from "./modules/light";

console.log("Starting");

const firebaseConfig = {
  projectId: "probable-bebop-176607",
  apiKey: "AIzaSyAz38W7-b0YKmYKAbA2ff0cGN_B0LsRiZo",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

if (isDev()) {
  console.log("running in dev mode");
  db.useEmulator("localhost", 8080);
} else {
  console.log("running in prod mode");
}

const { EMAIL, PASSWORD, KURNIK } = process.env;

if (!EMAIL || !PASSWORD || !KURNIK) {
  console.error("Missing required env");
  process.exit(1);
}

type KurnikName = 'chicken-citadel' | 'chicken-hut'

function isValidKurnik(name: string): name is KurnikName {
  return ['chicken-citadel', 'chicken-hut'].includes(name)

}

if (!isValidKurnik(KURNIK)) {
  console.log(KURNIK, 'not part of config!')
  process.exit(1);
}

const citadelConfig = config[KURNIK];

// sign in
firebase
  .auth()
  .signInWithEmailAndPassword(EMAIL, PASSWORD)
  .then((_user: any) => {
    console.log("user logged in");

    // after successful sign up register listeners and set defaults.
    const dataRef = db.collection("kurnik").doc(KURNIK);

    citadelConfig.modules.map((module: any) => {
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
  })
  .catch((error: any) => {
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

