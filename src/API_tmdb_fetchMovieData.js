import axios from 'axios';
import { generateApiUrl, options } from './APIkey';

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

