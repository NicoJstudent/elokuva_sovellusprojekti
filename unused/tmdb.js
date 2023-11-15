//Vanhaa testailu, voi käyttää myöhemmin jos tarvitsee.

const axios = require('axios');

//apikey täytyy salata
const apiKey = 'API_AVAIN';
const options = {
    method: 'GET',
    params: {language: 'fi-FI'},    //fi-FI suomi, en-US englanti
    headers: {
      accept: 'application/json',
      Authorization: apiKey
  }
};

const BaseUrl = 'https://api.themoviedb.org/3';
const endpoint = '/search/keyword/';  //https://developers.themoviedb.org/3/search/search-keywords

// GET
axios.get(`${BaseUrl}${endpoint}`, options)
  .then(response => {
    console.log(response.data);
  })

  .catch(error => {
    console.error('Error:', error.message);
  });