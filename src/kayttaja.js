import './App.css';
import './kollaasi.css';
import './monikkotyylit.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { generateApiUrl, options } from './APIkey';

/* To do:
- Muunna avatar satunnaiseksi -> arpoo yhdelle id:lle tietyn? Pitäisikö olla merkitty tietokantaan? Vai vaihtuuko joka kerta erilaiseen?
- Puuttuu vielä omien yhteisöjen listaus
*/
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Kayttaja = () => {
  const usernick = localStorage.getItem('usernick');
  return (
    <>
      <div className='section'>
        <h1>Tervetuloa {usernick}</h1>
        <LogOut />
        <Tili />
        <TiliYhteisot />
        <TiliArvostelut />
        <TiliSuosikit />
        <TiliButtonit />
      </div>
    </>
  );
};

const LogOut = () => {
  const handleLogout = async () => {
    localStorage.removeItem('usernick');
    localStorage.removeItem('token');
    localStorage.removeItem('userid');

    // Ohjaa kirjautumissivulle
    window.location.href = '/kirjaudurekisteroidy';
  };

  return (
    <button className='yleinen_btn levea sininen' onClick={handleLogout}>Kirjaudu ulos</button>
  );
};

const Tili = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // Replace 'usernick' with the actual usernick you want to fetch
    const usernick = localStorage.getItem('usernick');

    // Make a request to the server-side API
    axios.get(`http://localhost:5000/customer?usernick=${usernick}`)
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching user data', error));
  }, []);

  return (
    <>
      <div className='luettelo kayttaja'>
        <div className='luettelo_osa leveys30'>
          <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=Tinkerbell" className="avatar" alt="avatar" />
        </div>
        <div className='luettelo_osa leveys70'>
          <h3>Käyttäjänimi: {userData.usernick}</h3>
          <h3>Sähköposti: {userData.email}</h3>
        </div>
      </div>
    </>
  )
}

const TiliYhteisot = () => {
  return (
    <div className='kirjoitusalueet'>
      <h5>Kuulut seuraaviin yhteisöihin:</h5>
      <ul>
        <li>yhteisö1</li>
        <li>yhteisö 2</li>
      </ul>
    </div>
  )
}

const TiliArvostelut = () => {
  const usernick = localStorage.getItem('usernick');
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reviews?usernick=${usernick}`);
        const data = await response.json();

        //console.log('data', data);

        if (!data.success) {
          console.error('Error fetching reviews:', data.message);
        } else {
          const reviewDetails = data.reviews && data.reviews.length > 0
          ? await Promise.all(
              data.reviews.map(async (review) => {
                const movieData = await fetchMovieData(review.movieid);
                return { ...review, title: movieData.title };
              })
            )
          : [];

        setReviewData(reviewDetails);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, [usernick]);

  const fetchMovieData = async (movieid) => {
    const response = await fetch(generateApiUrl(`/movie/${movieid}`), options);
    const movieData = await response.json();
    return movieData;
  };

  if (loading) {
    return <div>Ladataan suosikkeja...</div>;
  }
  // Jos ei ole arvioita tai antaa erroria, katso webdeveloper console 
  if (reviewData.length === 0) {
    return <div>Ei arvioita saatavilla.</div>;
  }
  //Koko arvostelu linkkinä kyseisen elokuvan sivulle
  return (
    <div className='kirjoitusalueet'>
      <h5>Kirjoittamasi arviot:</h5>
      <ul className="review-list">
        {reviewData.map((review, index) => (
          <Link to={`/elokuvasivu/${review.movieid}`}>
          <li key={index} className="review-item">
            <div className="review-column">          
              {review.title}              
            </div>
            <div className="review-column">
              Arvosana: {review.rating}/10  |  {formatDate(review.date)}              
            </div>                        
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};



const TiliSuosikit = () => {
  //const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const usernick = localStorage.getItem('usernick');
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Haetaan suosikki elokuvat
        const response = await fetch(`http://localhost:5000/favorites?usernick=${usernick}`);
        const data = await response.json();


        if (!data.success) {
          console.error('Error fetching favorite movies:', data.message);
        } else {

          const moviesDetails = await Promise.all(
            data.favoriteMovies.map(async (movieId) => {
              return await fetchMovieData(movieId);
            })
          );
          setMoviesData(moviesDetails);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [usernick]);

  const fetchMovieData = async (movieId) => {
    const response = await fetch(generateApiUrl(`/movie/${movieId}`), options);
    const movieData = await response.json();
    return movieData;
  };
  // Indikaattori datan lataukseen
  if (loading) {
    return <div>Ladataan suosikkeja...</div>;
  }

  return (
    <div className='kirjoitusalueet'>
      <h5>Omat suosikkielokuvasi:</h5>
      <ul>
        {moviesData.map((movie) => (
          <li key={movie.id}>
            <Link to={`/elokuvasivu/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TiliButtonit = () => {
  const handleLogin = async () => {
    window.location.href = '/kayttajapoisto1';
  }

  return (
    <>
      <button className='yleinen_btn levea punainen' onClick={handleLogin}>Poista käyttäjätunnus</button>
    </>
  )
}

export default Kayttaja;