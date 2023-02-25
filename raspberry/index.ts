import 'dotenv/config'
import config from "../deployments/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { isDev } from "./utils/env";

import { Door } from "./modules/door";
import { Light } from "./modules/light";
import { LifeMonitor } from './modules/life-monitor';

console.log("Starting");

const firebaseConfig = {
  projectId: "probable-bebop-176607",
  apiKey: "AIzaSyAz38W7-b0YKmYKAbA2ff0cGN_B0LsRiZo",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

if (isDev()) {
  console.log("running in dev mode");
  connectFirestoreEmulator(db, "127.0.0.1", 8080)
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
const auth = getAuth(app);

signInWithEmailAndPassword(auth, EMAIL, PASSWORD)
  .then((_user: any) => {
    console.log("user logged in");

    // after successful sign up register listeners and set defaults.
    const dataRef = doc(db, 'kurnik', KURNIK);

    setInterval(() => {
      updateDoc(dataRef, 'timestamp', Date.now());
    }, 1000 * 60);

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
        case "life-monitor":
          return new LifeMonitor(options);
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

