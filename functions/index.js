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

class Client {
  constructor({ id, name, email }){
    this.id = id;
    this.name = name;
    this.email = email;
  }

  isValid() {
    return this.id && this.name && this.email;
  }

  toObj() {
    const { name, email } = this;
    return {
      name,
      email,
    }
  }
}

class Admin {
  constructor({ id, name, email }){
    this.id = id;
    this.name = name;
    this.email = email;
  }

  isValid() {
    return this.id && this.name && this.email;
  }

  toObj() {
    const { name, email } = this;
    return {
      name,
      email,
    }
  }
}

class Message {
  constructor({ title, description }){
    this.title = title;
    this.description = description;
  }

  isValid() {
    return this.title && this.description;
  }

  toObj() {
    const { title, description } = this;
    return {
      title,
      description,
    }
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

const baseEndpoint = (action) => functions.https.onRequest((req, res) => {
  enableCors(res, req);
  action(res, req);
});

const errorResponse = message => ({ error: message });

// functions

// Offers

exports.getOffers = baseEndpoint((res, req) => {
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

exports.getOffersCount = baseEndpoint((res, req) => {
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

exports.applyToOffer = baseEndpoint((res, req) => {
  const { offerId, clientId } = req.query;

  if (!offerId || !clientId) {
    res.status(400).send(errorResponse('Missing Parameters'));
    return;
  }

  const offerRef = firestore.collection('offers').doc(offerId);
  const clientsRef = firestore.collection('clients').doc(clientId);

  offerRef.get().then((snap) => {
    const candidates = snap.data().candidates;
    const newList = [...candidates, clientId];
    offerRef.update({ candidates: newList });
  });

  clientsRef.get().then((snap) => {
    const offers = snap.data().offers;
    const newList = [...offers, offerId];
    clientsRef.update({ offers: newList });
  });

  res.status(200).send({ ok: 'Success!' });

  return;
});

exports.unapplyToOffer = baseEndpoint((res, req) => {
  const { offerId, clientId } = req.query;

  if (!offerId || !clientId) {
    res.status(400).send(errorResponse('Missing Parameters'));
    return;
  }

  const offerRef = firestore.collection('offers').doc(offerId);
  const clientsRef = firestore.collection('clients').doc(clientId);

  offerRef.get().then((snap) => {
    const candidates = snap.data().candidates;
    const newList = candidates.filter((c) => c !== clientId)
    offerRef.update({ candidates: newList });
  });

  clientsRef.get().then((snap) => {
    const offers = snap.data().offers;
    const newList = offers.filter((o) => o !== offerId)
    clientsRef.update({ offers: newList });
  });

  res.status(200).send({ ok: 'Success!' });
  return;
});


// Republic

exports.getRepublics = baseEndpoint((res, req) => {
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

exports.searchRepublicsByTag = baseEndpoint((res, req) => {
  const { tags } = req.body;
  const createTagQuery = (collection) => {
    let composedQuery = collection;
    tags.forEach(tag => {
      composedQuery = composedQuery.where(`tags.${tag}`, '==', true)
    });
    return composedQuery;
  };
  const response = [];
  createTagQuery(
    firestore.collection('republics'))
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

exports.getRepublic = baseEndpoint((res, req) => {
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

exports.createRepublic = baseEndpoint((res, req) => {
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

// Client

exports.createClient = baseEndpoint((res, req) => {
  const newClient = new Client(req.body);
  if(!newClient.isValid()) {
    res.status(400).send(errorResponse('Invalid Model'));
    return;
  }
  firestore
    .collection('clients')
    .doc(newClient.id)
    .set(newClient.toObj())
    .then(r => {
      res.status(200).send({ success: 'ok' });
      return;
    })
});

exports.getClient = baseEndpoint((res, req) => {
  const { clientId } = req.query;
  if (!clientId) {
    res.status(400).send(errorResponse('Invalid clientId'));
    return;
  }
  firestore
    .collection('clients')
    .doc(clientId)
    .get()
    .then(snap => {
      return res.status(200).send(parseDocument(snap));
    });
});

// Admin

exports.createAdmin = baseEndpoint((res, req) => {
  const newAdmin = new Admin(req.body);
  if(!newAdmin.isValid()) {
    res.status(400).send(errorResponse('Invalid Model'));
    return;
  }
  firestore
    .collection('admins')
    .doc(newAdmin.id)
    .set(newAdmin.toObj())
    .then(r => {
      res.status(200).send({ success: 'ok' });
      return;
  });
});

exports.getAdmin = baseEndpoint((res, req) => {
  const { adminId } = req.query;
  if (!adminId) {
    res.status(400).send(errorResponse('Invalid adminId'));
    return;
  }
  firestore
    .collection('admins')
    .doc(adminId)
    .get()
    .then(snap => {
      return res.status(200).send(parseDocument(snap));
    });
});

// Notifications

exports.getMessages = baseEndpoint((res, req) => {
    const { republicId } = req.query; // pegando parametro da URL (SO PODE SER GET)
    if(!republicId) {
      res.status(400).send(errorResponse('Invalid Params')); // tratamento de erro
      return;
    }
    firestore
      .collection('republics')
      .doc(republicId) // buscando no banco republica especifica
      .get()
      .then(snap => {
      return res.status(200).send(parseDocument(snap).data.messages);
  });
});

exports.createMessage = baseEndpoint((res, req) => {
  const { message, republicId } = req.body;
  if(!message || !republicId) {
    res.status(400).send(errorResponse('Invalid Params')); // tratamento de erro
    return;
  }
  const newMessage = new Message(message);
  firestore.collection('republics').doc(republicId).get().then((snap) => {
    const messages = snap.data().messages;
    console.log(snap.data());
    firestore
      .collection('republics')
      .doc(republicId)
      .update({ messages: [...messages, newMessage.toObj()] })
      .then(r => {
        res.status(200).send({ success: 'ok' });
        return;
      });
  });
});
