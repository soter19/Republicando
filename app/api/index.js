const https = require('https');
import axios from 'axios';

const BASE_URL = 'https://us-central1-republicando-123.cloudfunctions.net/';

// Republics

const GET_REPUBLICS = 'getRepublics';

export const getRepublics = async () => {
  const republics = await axios.get(`${BASE_URL}${GET_REPUBLICS}`).catch(e => {
    console.error(e)
  });
  return republics && republics.data;
};

// Offers

const GET_OFFERS = 'getOffers';
const APPLY_TO_OFFER = 'applyToOffer';

export const getOffers = async () => {
  return await axios.get(`${BASE_URL}${GET_OFFERS}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }).catch(e => {
    console.error(e)
  })
};

export const applyToOffer = (republicId) => {
  return axios.get(`${BASE_URL}${APPLY_TO_OFFER}?republicId=${republicId}`);
};


