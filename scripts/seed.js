/**
 * Generate keys in 
 * https://console.firebase.google.com/u/0/project/probable-bebop-176607/settings/serviceaccounts/adminsdk
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./keys.json');

// todo: move to some config file
const empty = {
    door_movement: 0,
    light_state: false,
}

const KURNIKY = {
    'chicken-hut': empty,
    'chicken-citadel': empty,
    'chicken-terraformation': empty,
};
//

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

const add = (db, collection, src) => {
    // Add a new document with a generated id.
    Object.keys(src).forEach(async (r) => {
        const res = await db.collection(collection).doc(r).set(src[r]);
        console.log('Added document with ID: ', res.id);
    })

}

const run = async () => {
    await deleteCollection(db, 'kurnik', 100);

    add(db, 'kurnik', KURNIKY);
}

run();

module.exports = {}
