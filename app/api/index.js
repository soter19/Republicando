import axios from 'axios';
import { getCurrentUser } from './auth';
import { firestore } from '../configureStore';

const https = require('https');

// const BASE_URL = 'https://us-central1-republicando-123.cloudfunctions.net/';
const BASE_URL = 'http://localhost:5000/republicando-123/us-central1/';

// Tags

export const getAllTags = () => {
  return firestore
    .collection('tags')
    .get()
    .then(snapshot => {
      let tags = [];
      snapshot.forEach(d => {
        tags.push({ id: d.id, name: (d.data()).name });
      });
      return tags;
    })
};

// Republics

const GET_REPUBLICS = 'getRepublics';
const GET_REPUBLIC = 'getRepublic';
const SEARCH_REPUBLICS_BY_ID = 'searchRepublicsByTag';

export const getRepublics = async () => {
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
  const republic = await axios
    .get(`${BASE_URL}${SEARCH_REPUBLICS_BY_ID}`)
    .catch(console.error);
};

// Offers

const GET_OFFERS = 'getOffers';
const APPLY_TO_OFFER = 'applyToOffer';
const UNAPPLY_TO_OFFER = 'unapplyToOffer';

export const getOffers = async (republicId) =>
  axios.get(`${BASE_URL}${GET_OFFERS}?republicId=${republicId}`).catch(e => {
    console.error(e);
  });

export const applyToOffer = (offerId, clientId) =>
  axios.get(`${BASE_URL}${APPLY_TO_OFFER}?offerId=${offerId}&clientId=${clientId}`);

export const unapplyToOffer = (offerId, clientId) =>
  axios.get(`${BASE_URL}${UNAPPLY_TO_OFFER}?offerId=${offerId}&clientId=${clientId}`);

export const getOfferById = async (id) => {
  return firestore.collection('offers').doc(id).get().then((doc) => ({ id , ...doc.data() }));
};

// Admins

const CREATE_ADMIN = 'createAdmin';
const GET_ADMIN = 'getAdmin';

export const createAdminOnDatabase = (newAdmin) =>
  axios.post(`${BASE_URL}${CREATE_ADMIN}`, newAdmin);

const getAdmin = (adminId) => axios.get(`${BASE_URL}${GET_ADMIN}?adminId=${adminId}`);

// Clients

const CREATE_CLIENT = 'createClient';
const GET_CLIENT = 'getClient';

export const createClientOnDatabase = (newClient) =>
  axios.post(`${BASE_URL}${CREATE_CLIENT}`, newClient);

const getClient = (clientId) => axios.get(`${BASE_URL}${GET_CLIENT}?clientId=${clientId}`);

export const getMe = async () => {
  const user = getCurrentUser();
  const { uid } = user;
  const userType = await getUserTypeFromId(uid);
  let me;
  if(userType === 'admins'){
    me = await getAdmin(uid);
  } else {
    me = await getClient(uid);
  }
  return me.data;
};

export const getUserTypeFromId = (userId) => {
  const checks = [firestore.collection('clients').doc(userId).get(),firestore.collection('admins').doc(userId).get()];
  return Promise.all(checks).then((docs) => {
    let userType = null;
    const isValid = docs.some(d => {
      if(d.exists){
        userType = d.ref.parent.id;
      }
      return d.exists
    });
    if (!isValid || !userType) {
      throw new Exception('fucking kidding me');
    }
    return userType;
    }
  )};

// Notifications

const GET_NOTIFICATIONS = 'getNotifications';

export const getNotifications = async (republicId) => {
    if (!republicId) return false;
      const notifications = await axios
        .get(`${BASE_URL}${GET_NOTIFICATIONS}?republicId=${republicId}`)
        .catch(console.error);
      return notifications && notifications.data;
};
