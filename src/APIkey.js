
//API avain täytyy salata
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTI5MjQ1MGRjMDAzNTEwMjMzZWY3NDVmOWJkNWFhMiIsInN1YiI6IjY1NDhkMzI2ZDhjYzRhMDBlM2NjOTJkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pinVZ6Vu_Dy5u-YOpXG60nUsEssui8GV8TpBwEozhdE';

const BaseUrl = 'https://api.themoviedb.org/3';
const options = {   //Perus asetukset, voi lisätä/poistaa tarvittavia
    method: 'GET',
    params: { language: 'fi-FI' },    //fi-FI suomi, en-US englanti
    headers: {
        accept: 'application/json',
        Authorization: apiKey
    }
};
const generateApiUrl = (endpoint = {}) => { //Tekee endpointista osoitteen

    return `${BaseUrl}${endpoint}`;
};

export { generateApiUrl, options };
