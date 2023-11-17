import { useEffect, useState } from 'react';
import fetchMovieData from './API_tmdb2';
import './elokuvasivun_pohja.css';
import star from './images/star.png';

const Elokuvasivu = () => {

    const [movie, setMovie] = useState({});

    useEffect(() => {
        //const movieId = 872585; // Oppenheimer
        const movieId = 155; // Batman
        const fetchData = async () => {
            try {
                const movieData = await fetchMovieData(movieId);
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='row'>
                <Kuva posterPath={movie.poster_path}/>
                <Tiedot movie={movie} />
            </div>
        </>
    );
};

/*const Kuva = () => {
    return (
        <div className='vasenkuva'>
            <img src='kuva tähän' alt="" />
        </div>
    );
}*/

const Kuva = ({posterPath}) => {
    if (!posterPath) { return <div className='vasenkuva'>Kuvaa ei löydy</div>;
    }
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return (
        <div className='vasenkuva'>
            <img src={imageUrl} alt="" />
            </div>
    );
}


const Tiedot = ({ movie }) => {

    const pyoristettyArvio = movie.vote_average.toFixed(1);

    return (
        <div className='tiedot_runko'>
            <div className='runko_osa1'>
                <div className='otsikko'>
                    <h1>{movie.title}</h1>
                    <div className='lisatiedot osa1'>
                        <div className='lisatiedot_osa'>{new Date(movie.release_date).getFullYear()}</div>
                        <div className='lisatiedot_osa'>·</div>
                        <div className='lisatiedot_osa'>{movie.adult ? 'K-18' : 'Sopiva kaikenikäisille'}</div>
                        <div className='lisatiedot_osa'>·</div>
                        <div className='lisatiedot_osa'>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}</div>
                    </div>
                </div>
                <div className='tahdet'>
                    <img src={star} alt="" />
                    <h1>{pyoristettyArvio} / 10</h1>
                </div>
            </div>
            <div className='runko_osa2'>

                <div className='lisatiedot'>
                    <div className='lisatiedot_osa'>
                        <button className='ontto'>Biography</button>
                        <button className='ontto'>Drama</button>
                        <button className='ontto'>History</button>
                    </div>
                </div>
                <p>{movie.overview}</p>

            </div>

        </div>
    );
}

export default Elokuvasivu;