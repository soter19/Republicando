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
    this.name = name;
    this.description = description;
    this.address = address;
  }

  isValid() {
    const { name, description, address } = this;
    return !!name && !!description && !!address;
  }

  toObj() {
    const { name, description, address } = this;
    return {
      name,
      description,
      address,
    };
  }
}

// utils

const parseDocument = snap => ({
  id: snap.id,
  data: snap.data(),
});

const enableCors = (res, req) => {
  // Set CORS headers
  // e.g. allow GETs from any origin with the Content-Type header
  // and cache preflight response for an 3600s
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  // Send response to OPTIONS requests and terminate the function execution
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }
  // Continue with function code
};

const errorResponse = message => ({ error: message });

// functions

// GET

exports.getOffers = functions.https.onRequest((req, res) => {
  enableCors(res, req);
  const { republicId } = req.query;
  if (!republicId) {
    res.status(400).send(errorResponse('Missing Parameters'));
    return;
  }
  const response = [];
  firestore
    .collection('offers')
    .where('republicId', '==', republicId)
    .get()
    .then(snapshot => {
      snapshot.forEach(d => {
        response.push(parseDocument(d));
      });
      return res.status(200).send(response);
    })
    .catch(console.error);
});

exports.getOffersCount = functions.https.onRequest((req, res) => {
  enableCors(res, req);
  const { republicId } = req.query;
  if (!republicId) {
    res.status(400).send(errorResponse('Missing Parameters'));
    return;
  }
  const response = [];
  firestore
    .collection('offers')
    .where('republicId', '==', republicId)
    .then(snap => {
      return res.status(200).send({ offersCount: snap.size });
    })
    .catch(console.error);
});

exports.getRepublics = functions.https.onRequest((req, res) => {
  enableCors(res, req);
  const response = [];
  firestore
    .collection('republics')
    .get()
    .then(snapshot => {
      snapshot.forEach(d => {
        response.push(parseDocument(d));
      });
      res.status(200).send(response);
      return true;
    })
    .catch(console.error);
});

exports.getRepublic = functions.https.onRequest((req, res) => {
  enableCors(res, req);
  const { republicId } = req.query;
  if (!republicId) {
    res.status(400).send(errorResponse('Missing Parameters'));
    return;
  }
  firestore
    .collection('republics')
    .doc(republicId)
    .get()
    .then(snap => {
      return res.status(200).send(parseDocument(snap));
    });
});

// CREATE

exports.createRepublic = functions.https.onRequest((req, res) => {
  enableCors(res, req);
  const newRep = new Republic(req.body);
  if (!newRep.isValid()) {
    res.status(400).send(errorResponse('Invalid Model'));
    return;
  }
  firestore
    .collection('republics')
    .doc()
    .set(newRep.toObj())
    .then(r => {
      res.status(200).send({ success: 'ok' });
      return;
    })
    .catch(error => {
      res.status(500).send({ error });
      return;
    });
});

// UPDATE

exports.applyToOffer = functions.https.onRequest((req, res) => {
  enableCors(res, req);
  const { offerId } = req.query;

  if (!offerId) {
    res.status(400).send(errorResponse('Missing Parameters'));
    return;
  }

  res.status(200).send({ ok: 'Success!' });
  return;

  // firestore
  //   .collection('offers')
  //   .doc(offerId)
  //   .delete()
  //   .then(res.status(200).send({ ok: 'Success!' }));
});

// DELETE
