import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; //linkki
import { generateApiUrl, options } from './APIkey'; //API avain
import './App.css';
import star from './images/star.png';
import './mediacard.css';
import './monikkotyylit.css';


const Elokuvat = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); //txt haku

    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(generateApiUrl(endpoint), options);
            setMovies(response.data.results);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    //elokuvien haku tekstillä
    const searchMovies = async () => {
        if (searchTerm) {
            fetchData(`/search/movie?query=${searchTerm}`);
        }
    };

    //haetaan sivun aloitusnäkymä
    const fetchRandomMovies = async () => {
        try {
            const response = await axios.get(generateApiUrl('/movie/popular'), options);

            // Sekoita elokuvien järjestys satunnaiseen järjestykseen.
            const shuffledMovies = response.data.results.sort(() => Math.random() - 0.5);

            // Valitse 20 ensimmäistä satunnaista elokuvaa näytettäväksi.
            const randomMovies = shuffledMovies.slice(0, 20);

            // Aseta satunnaisten elokuvien taulukko.
            setMovies(randomMovies);
        } catch (error) {
            console.error('Error fetching random movies:', error.message);
        }
    };

    useEffect(() => {
        fetchRandomMovies();
    }, []);

    return (
        <>
            <div className='section'>
                <h1>Elokuvat</h1>

                <div className='luettelo filtterijono leveys90'>
                    <div className='leveys70'>
                        <div className='luettelo_osio'>
                            <h3>Suodata näkymää:</h3>
                        </div>
                        <div className='luettelo_osio'>
                            <button onClick={() => fetchData('/movie/now_playing')} className='yleinen_btn oranssi filtterit'>Teattereissa</button>
                        </div>
                        <div className='luettelo_osio'>
                            <button onClick={() => fetchData('/movie/popular')} className='yleinen_btn oranssi filtterit'>Suositut</button>
                        </div>
                        <div className='luettelo_osio'>
                            <button onClick={() => fetchData('/movie/top_rated')} className='yleinen_btn oranssi filtterit'>Arvostetuimmat</button>
                        </div>
                        <div className='luettelo_osio'>
                            <button onClick={() => fetchData('/movie/upcoming')} className='yleinen_btn oranssi filtterit'>Tulossa</button>
                        </div>
                    </div>
                    <div className='leveys30'>
                        <div className='luettelo_osio'>
                            <input type="text" placeholder="Etsi elokuva" className='tekstialue' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className='luettelo_osio'>
                            <button onClick={searchMovies} className='yleinen_btn oranssi filtterit'>Etsi</button>
                        </div>
                    </div>
                </div>

                <Elokuvalistaus movies={movies} />

            </div>
        </>
    );
};

const Elokuvalistaus = ({ movies }) => {
    return (
        <>
            <div className='mediakorttien_runko'>
                {movies?.map(movie => (
                    <div key={movie.id} className="mediakortti">
                        <Link to={`${process.env.PUBLIC_URL}/elokuvasivu/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Elokuvan juliste." /></Link>
                        <h1>{new Date(movie.release_date).getFullYear()} &nbsp;&nbsp; <img src={star} style={{ width: '10px', height: 'auto', padding: '0px' }} alt="" /> {movie.vote_average?.toFixed(1)}</h1>
                        <h2><Link to={`${process.env.PUBLIC_URL}/elokuvasivu/${movie.id}`}>{movie.title}</Link></h2>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Elokuvat;