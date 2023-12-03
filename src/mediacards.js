import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; //linkki
import { generateApiUrl, options } from './APIkey'; //API avain
import star from './images/star.png';
import './mediacard.css';

const Ajankohtaista = () => {

    const [moviesAjankohtaista, setMoviesAjankohtaista] = useState([]);

    const fetchAjankohtaista = async () => {
        try {
            const response = await axios.get(generateApiUrl('/movie/popular'), options);
            const shuffledMovies = response.data.results.sort(() => Math.random() - 0.5);
            const randomMoviesFrontpage2 = shuffledMovies.slice(0, 5);
            setMoviesAjankohtaista(randomMoviesFrontpage2);
        } catch (error) {
            console.error('Error fetching random movies:', error.message);
        }
    };

    useEffect(() => {
        fetchAjankohtaista();
    }, []);

    return (
        <>
            <div className='mediakorttien_runko'>
                {moviesAjankohtaista?.map(movie => (
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

const OletkoTutustunut = () => {

    const [moviesOletkoTutustunut, setMoviesOletkoTutustunut] = useState([]);

    const fetchOletkoTutustunut = async () => {
        try {
            const response = await axios.get(generateApiUrl('/movie/top_rated'), options);
            const shuffledMovies = response.data.results.sort(() => Math.random() - 0.5);
            const randomMoviesFrontpage = shuffledMovies.slice(0, 10);
            setMoviesOletkoTutustunut(randomMoviesFrontpage);
        } catch (error) {
            console.error('Error fetching random movies:', error.message);
        }
    };

    useEffect(() => {
        fetchOletkoTutustunut();
    }, []);

    return (
        <>
            <div className='mediakorttien_runko'>
                {moviesOletkoTutustunut?.map(movie => (
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

export { Ajankohtaista, OletkoTutustunut };
