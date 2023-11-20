import axios from 'axios';

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

const fetchMovieData = async (movieId) => {
    try {
        const response = await axios.get(generateApiUrl(`/movie/${movieId}`), options);
        return response.data;

    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};

const fetchMovieAdditionalData = async (movieId) => {
    try {
        const response = await axios.get(generateApiUrl(`/movie/${movieId}/credits`), options);
        const credits = response.data;

        // Etsi ohjaajat ja käsikirjoittajat movie.crew-osasta
        const directors = credits.crew.filter(member => member.job === 'Director');
        const directorIds = directors.map(director => director.id);

        // Hae ensimmäisen ohjaajan tiedot
        const firstDirectorId = directorIds[0];
        const directorInfo = await fetchPersonData(firstDirectorId);

        // Etsi käsikirjoittajat movie.crew-osasta
        const writers = credits.crew.filter(member => member.department === 'Writing').map(member => member.name);

        // Etsi näyttelijät movie.cast-osasta
        const cast = credits.cast.map(member => member.name);

        return {
            directors: directorInfo,
            writers,
            cast,
        };
    } catch (error) {
        console.error('Error fetching additional data:', error.message);
        throw error;
    }
};

const fetchPersonData = async (personId) => {
    try {
        const response = await axios.get(generateApiUrl(`/person/${personId}`), options);
        return response.data;
    } catch (error) {
        console.error('Error fetching person data:', error.message);
        throw error;
    }
};


//export default fetchMovieData;
export { fetchMovieAdditionalData, fetchMovieData };
