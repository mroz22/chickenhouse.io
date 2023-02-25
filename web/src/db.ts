import {initializeApp} from "firebase/app";
import { getFirestore,  doc, onSnapshot, connectFirestoreEmulator, updateDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
export interface Kurnik {
    4: {
        hum?: number;
        temp?: number;
        ts?: number;
    },
    door_movement: -1 | 0 | 1;
    door_position: 'top' | 'bottom';
    light_state: boolean;
    reboot_command: boolean;
    rebooting: boolean;
    eggCounter: {
        n: number;
        ts: Date;
    }[]
} 

// export type KurnikRef = firebase.firestore.DocumentReference<Kurnik>;
export type KurnikRef = any;

const firebaseConfig = {
    apiKey: "AIzaSyAz38W7-b0YKmYKAbA2ff0cGN_B0LsRiZo",
    authDomain: "probable-bebop-176607.firebaseapp.com",
    databaseURL: "https://probable-bebop-176607.firebaseio.com",
    projectId: "probable-bebop-176607",
    storageBucket: "probable-bebop-176607.appspot.com",
    messagingSenderId: "491732998128",
    appId: "1:491732998128:web:d3167f04ac9d818a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// This helper function pipes your types through a firestore converter
// const converter = <T>() => ({
//     toFirestore: (data: Partial<T>) => data,
//     fromFirestore: (snap: any) => snap.data() as T
// })

const firestore = getFirestore();

if (window.location.hostname === "localhost") {
    //  127.0.0.1:8080
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080)
}

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Pass it a collectionPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
// const collection(firestore, 'kurnik');
// const dataPoint = (collectionPath: string[]) => doc(firestore,...collectionPath)

// const chickenCitadel = dataPoint(['kurnik', 'chickenCitadel']);
// Construct a database helper object
const createDb = (name: string) => {
    const docc = doc(firestore, "kurnik", name);

    return {
        onSnapshot:(callback) => onSnapshot(docc, callback),
        update: (data) => updateDoc(docc,data)
    }
}
const db = {
    // list your collections here
    ['chicken-hut']: createDb('chicken-hut'),
    ['chicken-citadel']: createDb('chicken-citadel'),
    ['chicken-space-mission']: createDb('chicken-space-mission'),
}

const auth = getAuth(app);

export { db, app, auth }
export default db
