import axios from 'axios';
import {getCurrentUser} from './auth';
import {firestore} from '../configureStore';

const https = require('https');

const BASE_URL = 'https://us-central1-republicando-123.cloudfunctions.net/';
// const BASE_URL = 'http://localhost:5000/republicando-123/us-central1/';

// Tags

export const getAllTags = () => {
	return firestore
		.collection('tags')
		.get()
		.then(snapshot => {
			let tags = [];
			snapshot.forEach(d => {
				tags.push({id: d.id, name: (d.data()).name});
			});
			return tags;
		})
};

// Republics

const GET_REPUBLICS = 'getRepublics';
const GET_REPUBLIC = 'getRepublic';
const SEARCH_REPUBLICS_BY_ID = 'searchRepublicsByTag';

export const getRepublicsApi = async () => {
	const republics = await axios
		.get(`${BASE_URL}${GET_REPUBLICS}`)
		.catch(console.error);
	return republics && republics.data;
};

export const getRepublic = async republicId => {
	if (!republicId) return false;
	const republic = await axios
		.get(`${BASE_URL}${GET_REPUBLIC}?republicId=${republicId}`)
		.catch(console.error);
	return republic && republic.data;
};

export const searchRepublicsByTag = async (tags) => {
	if(tags && tags.length === 0) {
		const allRepublics = await getRepublicsApi();
		return allRepublics;
	}
	const republic = await axios
		.post(`${BASE_URL}${SEARCH_REPUBLICS_BY_ID}`, {tags})
		.catch(console.error);
	return republic && republic.data;
};

const parseDocument = snap => ({
	id: snap.id,
	data: snap.data(),
});


export const getClientsByRepublicId = async republicId => {
	if (!republicId) return false;

	return firestore
		.collection('clients')
		.where('republicId', '==', republicId)
		.get()
		.then(snapshot => {
			const response = [];
			snapshot.forEach(d => {
				response.push(parseDocument(d));
			});
			return response;
		})
		.catch(console.error);
}

// Offers

const APPLY_TO_OFFER = 'applyToOffer';
const UNAPPLY_TO_OFFER = 'unapplyToOffer';

export const getOffers = async (republicId) => {
  return firestore
    .collection('offers')
    .where('republicId', '==', republicId)
    .get()
    .then(snapshot => {
    	const response = [];
      snapshot.forEach(d => {
        response.push(parseDocument(d));
      });
      return response;
    })
    .catch(console.error);
}

export const applyToOffer = (offerId, clientId) =>
	axios.get(`${BASE_URL}${APPLY_TO_OFFER}?offerId=${offerId}&clientId=${clientId}`);

export const unapplyToOffer = (offerId, clientId) =>
	axios.get(`${BASE_URL}${UNAPPLY_TO_OFFER}?offerId=${offerId}&clientId=${clientId}`);

export const getOfferById = async (id) => {
	return firestore.collection('offers').doc(id).get().then((doc) => ({id, ...doc.data()}));
};

export const createOffer = async (offer) => {
	return firestore.collection('offers').doc().set(offer);
};

export const updateOffer = async ({id, ...rest}) => {
	return firestore.collection('offers').doc(id).update(rest);
};

export const deleteOffer = async (offerId) => {
  const offerRef = firestore.collection('offers').doc(offerId);
  return offerRef.get().then((snap) => {
    offerRef.delete();
  	return Promise.all(snap.data().candidates.map((clientId) => {
  		const clientRef = firestore.collection('clients').doc(clientId);
  		return clientRef.get().then((client) => {
  			const newOffers = client.data().offers.filter((o) => o !== offerId);
  			clientRef.update({ offers: newOffers });
			})
		}))
	});
}

// Admins

const CREATE_ADMIN = 'createAdmin';
const GET_ADMIN = 'getAdmin';

export const createAdminOnDatabase = (newAdmin) =>
	axios.post(`${BASE_URL}${CREATE_ADMIN}`, newAdmin);

const getAdmin = (adminId) => axios.get(`${BASE_URL}${GET_ADMIN}?adminId=${adminId}`);

export const acceptCandidate = (candidateId, offerId) => {
  const clientRef = firestore.collection('clients').doc(candidateId);
  const offerRef = firestore.collection('offers').doc(offerId);
  return offerRef.get().then((snap) => {
		clientRef.update({ offers: [], republicId: snap.data().republicId });
		offerRef.delete();
  });
};

export const refuseCandidate = (candidateId, offerId) => {
  const clientRef = firestore.collection('clients').doc(candidateId);
  const offerRef = firestore.collection('offers').doc(offerId);
  return clientRef.get().then(client => {
		offerRef.get().then((offer) => {
			const newOffers = client.data().offers.filter((o) => o !== offerId);
			const newCandidates = offer.data().candidates.filter((c) => c !== candidateId);
      clientRef.update({ offers: newOffers });
			offerRef.update({ candidates: newCandidates });
		});
  });
};

// Clients

const CREATE_CLIENT = 'createClient';
const GET_CLIENT = 'getClient';

export const createClientOnDatabase = (newClient) =>
	axios.post(`${BASE_URL}${CREATE_CLIENT}`, newClient);

const getClient = (clientId) => axios.get(`${BASE_URL}${GET_CLIENT}?clientId=${clientId}`);

export const getMe = async () => {
	const user = getCurrentUser();
	const {uid} = user;
	const userType = await getUserTypeFromId(uid);
	let me;
	if (userType === 'admins') {
		me = await getAdmin(uid);
	} else {
		me = await getClient(uid);
	}
	return me.data;
};

export const getClientFromId = (id) => {
  return firestore.collection('clients').doc(id).get()
};

export const getUserTypeFromId = (userId) => {
	const checks = [firestore.collection('clients').doc(userId).get(), firestore.collection('admins').doc(userId).get()];
	return Promise.all(checks).then((docs) => {
			let userType = null;
			const isValid = docs.some(d => {
				if (d.exists) {
					userType = d.ref.parent.id;
				}
				return d.exists
			});
			if (!isValid || !userType) {
				throw new Exception('fucking kidding me');
			}
			return userType;
		}
	)
};

// Messages

const GET_MESSAGES = 'getMessages';
const CREATE_MESSAGE = 'createMessage';

export const getMessages = async (republicId) => {
	if (!republicId) return false;
	const notifications = await axios
		.get(`${BASE_URL}${GET_MESSAGES}?republicId=${republicId}`)
		.catch(console.error);
	return notifications && notifications.data;
};

export const createMessage = async (message, republicId) => {
	if (!republicId) return false;
	return await axios
		.post(`${BASE_URL}${CREATE_MESSAGE}`, {message, republicId})
		.catch(console.error);
};
