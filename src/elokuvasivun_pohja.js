import { useEffect, useState } from 'react';
//import fetchMovieData from './API_tmdb_fetchMovieData';
import { fetchMovieAdditionalData, fetchMovieData } from './API_tmdb_fetchMovieData';
import './elokuvasivun_pohja.css';
import star from './images/star.png';

/* Ongelmakohdat ja muutostarpeet:
- Elokuvan id tulee hakea ja siirtää tänne muilta sivuilta, kuinka?
- Ikäraja ei toimi odotetusti (vain K-18/sallittu)
*/

const Elokuvasivu = () => {

    const [movie, setMovie] = useState({});
    const [additionalData, setAdditionalData] = useState({});  //uusi

    useEffect(() => {
        const movieId = 872585; // Oppenheimer
        //const movieId = 155; // Batman
        const fetchData = async () => {
            try {
                const movieData = await fetchMovieData(movieId);
                setMovie(movieData);

                const additionalData = await fetchMovieAdditionalData(movieId); //uusi
                setAdditionalData(additionalData); //uusi

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
                <Tiedot movie={movie} additionalData={additionalData}/>
            </div>
        </>
    );
};

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


const Tiedot = ({ movie, additionalData }) => {
    if (!movie || typeof movie.vote_average !== 'number') { return null;}
    const pyoristettyArvio = movie.vote_average.toFixed(1);
    const imdbId = movie.imdb_id;
    const imdbLink = imdbId ? `https://www.imdb.com/title/${imdbId}` : '#';

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
                        {movie.genres?.map((genre) => (
                            <button className='ontto'>{genre.name}</button>
                        ))}
                        </div>
                </div>
                <p>{movie.overview}</p>
                <p className='tekijat'>Ohjaus · {additionalData.directors?.name}</p>
                <p className='tekijat'>Käsikirjoitus · {additionalData.writers?.join(', ')}</p>
                <p className='tekijat'>Näyttelijät · {additionalData.cast?.slice(0,3).join(', ')}</p>
                <p>Lisätietoja: <a href={imdbLink}>IMDb</a></p>
            </div>

        </div>
    );
}

export default Elokuvasivu;