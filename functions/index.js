
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

// models

class Republic {
    constructor({ name, description, address }) {
        this.name = name
        this.description = description
        this.address = address
    }

    isValid() {
        const { name, description, address } = this
        return (!!name && !!description && !!address)
    }

    toObj() {
        const { name, description, address } = this
        return {
            name,
            description,
            address,
        }
    }
}

// utils 

const parseDocument = (snap) => ({
    id: snap.id,
    ...snap.data(),
})

const errorResponse = (message) => ({ error: message })

// functions

// GET

exports.getOffers = functions.https.onRequest((req, res) => {
    const response = [];
    firestore.collection('offers').get().then(snapshot => {
        snapshot.forEach((d) => {
            console.log(parseDocument(d))
            response.push(parseDocument(d))
        });
        console.log(response)
    })
});

exports.getRepublics = functions.https.onRequest((req, res) => {
    const response = [];
    firestore.collection('republics').get().then(snapshot => {
        snapshot.forEach((d) => {
            response.push(parseDocument(d))
        });
        res.status(200).send(response);
    })
});

// CREATE

exports.createRepublic = functions.https.onRequest((req, res) => {
    const newRep = new Republic(req.body);
    if(!newRep.isValid()){
        res.status(400).send(errorResponse('Invalid Model'))
        return;
    }
    firestore.collection('republics').doc().set(newRep.toObj()).then((r) => {
        res.status(200).send({ success: 'ok' });
        return;
    }).catch((error) => {
        res.status(500).send({ error })
        return;
    });
});

// UPDATE

// DELETE