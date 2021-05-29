import firebase from "firebase";
import * as firebaseui from 'firebaseui';

export interface Kurnik {
    4: {
        hum?: number;
        temp?: number;
        ts?: number;
    },
    door_movement: -1 | 0 | 1;
    door_position: 'top' | 'bottom';
    lightState: boolean;
    reboot_command: boolean;
    rebooting: boolean;
    eggCounter: {
        n: number;
        ts: Date;
    }[]
}

export type KurnikRef = firebase.firestore.DocumentReference<Kurnik>;

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
firebase.initializeApp(firebaseConfig);

// This helper function pipes your types through a firestore converter
const converter = <T>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: any) => snap.data() as T
})

const fs = firebase.firestore();

if (window.location.hostname === "localhost") {
    fs.useEmulator("localhost", 8080);
}

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Pass it a collectionPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
const dataPoint = <T>(collectionPath: string) => fs.collection(collectionPath).withConverter(converter<T>())

// Construct a database helper object
const db = {
    // list your collections here
    kurnik: dataPoint<Kurnik>('kurnik'),
    chickenCitadel: dataPoint<Kurnik>('chickenCitadel'),
    spaceMission: dataPoint<Kurnik>('spaceMission'),
}


// FirebaseUI config.

export const initAuth = () => {
    const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}

export { db, firebase }
export default db