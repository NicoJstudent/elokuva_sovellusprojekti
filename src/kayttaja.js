import './App.css';
import './kollaasi.css';
import './monikkotyylit.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* To do:
- Muunna avatar satunnaiseksi -> arpoo yhdelle id:lle tietyn? Pitäisikö olla merkitty tietokantaan? Vai vaihtuuko joka kerta erilaiseen?
- Tiedot tietokannoista, yhdistä oikeisiin kohtiin
- Aktivoi buttonit*/

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
    return (
        <div className='kirjoitusalueet'>
            <h5>Kirjoittamasi arviot:</h5>
            <ul>
                <li>Arvio, elokuva - pvm</li>
                <li>Arvio, elokuva - pvm</li>
            </ul>
        </div>
    )
}

const TiliSuosikit = ({ }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const usernick = localStorage.getItem('usernick');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch favorite movies from the server
          const response = await fetch(`http://localhost:5000/favorites?usernick=${usernick}`);
          const data = await response.json();
  
          if (!data.success) {
            console.error('Error fetching favorite movies:', data.message);
          } else {
            // Set the fetched movies in the state
            setFavoriteMovies(data.favoriteMovies);
          }
  
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [usernick]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='kirjoitusalueet'>
        <h5>Omat suosikkielokuvasi:</h5>
        <ul>
          {favoriteMovies.map((movieId) => (
            <li key={movieId}>{`Movie ID: ${movieId}`}</li>
            // You can fetch additional movie details and display them here
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