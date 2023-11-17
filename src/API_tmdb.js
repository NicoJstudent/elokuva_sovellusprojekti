import axios from 'axios';
import { useState } from 'react';

//API avain täytyy salata
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTI5MjQ1MGRjMDAzNTEwMjMzZWY3NDVmOWJkNWFhMiIsInN1YiI6IjY1NDhkMzI2ZDhjYzRhMDBlM2NjOTJkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pinVZ6Vu_Dy5u-YOpXG60nUsEssui8GV8TpBwEozhdE';

const BaseUrl = 'https://api.themoviedb.org/3';
const options = {   //Perus asetukset, voi lisätä/poistaa tarvittavia
  method: 'GET',
  params: {language: 'fi-FI'},    //fi-FI suomi, en-US englanti
  headers: {
    accept: 'application/json',
    Authorization: apiKey
}
};
const generateApiUrl = (endpoint = {}) => { //Tekee endpointista osoitteen

  return `${BaseUrl}${endpoint}`;
};

const APItmdb = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(generateApiUrl(endpoint), options);
      setMovies(response.data.results);
      
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  //**** Haluttuja tietoja saa näillä muuttujilla ****
  //{movie.id} (int) - Elokuvan ID
  //{movie.title} (string) - Elokuvan nimi
  //{movie.release_date} - Elokuvan julkaisupäivä
  //{movie.vote_average} - Elokuvan arvosana
  //{movie.overview} (string) - Elokuvan kuvaus
  //{movie.poster_path} (url) - Elokuvan juliste
  //{movie.backdrop_path} (url) - Elokuvan taustakuva
  //{movie.genre_ids} (array int) - Elokuvan genret
  //{movie.original_language} (string) - Elokuvan alkuperäinen kieli
  //{movie.original_title} (string) - Elokuvan alkuperäinen nimi
  //{movie.popularity} (numb) - Elokuvan suosio
  //{movie.vote_count} (int) - Elokuvan äänestysmäärä
  //{movie.adult} (bool) - Onko elokuva aikuisille


  /*return (  //Testausta, voi muokata haluamansa näköiseksi
    <div>
      <h1>Listaus testi</h1>
      <button onClick={() => fetchData('/movie/now_playing')}>Teattereissa</button>
      <button onClick={() => fetchData('/movie/popular')}>Suositut</button>
      <button onClick={() => fetchData('/movie/top_rated')}>Arvostetuimmat</button>
      <button onClick={() => fetchData('/movie/upcoming')}>Tulossa</button>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <p>Title: {movie.title}</p>
            <p>Julkaisu: {movie.release_date}</p>
            <p>Arvosana: {movie.vote_average}</p>
            <p>Genre: {movie.genre_ids}</p>
          </li>
        ))}
      </ul>
    </div>
  );
);*/
};

export default APItmdb;