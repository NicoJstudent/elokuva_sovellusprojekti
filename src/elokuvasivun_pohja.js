import { useEffect, useState } from 'react';
//import fetchMovieData from './API_tmdb_fetchMovieData';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { fetchMovieAdditionalData, fetchMovieData } from './API_tmdb_fetchMovieData';
import './App.css';
import './elokuvasivun_pohja.css';
import star from './images/star.png';
import './monikkotyylit.css';

/* Ongelmakohdat ja muutostarpeet:
- Ikäraja ei toimi odotetusti (vain K-18/sallittu)
- Suosikki-nappia ei aktivoitu
*/

const Elokuvasivu = () => {

    const [movie, setMovie] = useState({}); //haetaan elokuvan tiedot
    const [additionalData, setAdditionalData] = useState({}); //haetaan cast & crew
    const { id } = useParams(); //haetaan elokuvan id linkistä

    useEffect(() => {
        //const movieId = 872585; // Oppenheimer
        //const movieId = 155; // Batman
        const fetchData = async () => {
            try {
                //const movieData = await fetchMovieData(movieId);
                const movieData = await fetchMovieData(id);
                setMovie(movieData);

                //const additionalData = await fetchMovieAdditionalData(movieId);
                const additionalData = await fetchMovieAdditionalData(id);
                setAdditionalData(additionalData);

            } catch (error) {
                console.error('Error fetching movie data:', error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className='section'>
                <div className='row'>
                    <Kuva posterPath={movie.poster_path} />
                    <Tiedot movie={movie} additionalData={additionalData} />
                </div>
            </div>
            <div className='section'>
                <Arvostelut />
            </div>
        </>
    );
};

const Kuva = ({ posterPath }) => {
    if (!posterPath) {
        return <div className='vasenkuva'>Kuvaa ei löydy</div>;
    }
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    return (
        <div className='vasenkuva'>
            <img src={imageUrl} alt="" />
        </div>
    );
}


const Tiedot = ({ movie, additionalData }) => {
    if (!movie || typeof movie.vote_average !== 'number') { return null; }
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
                    <img src={star} alt="Tähtiluokitus." />
                    <h1>{pyoristettyArvio} / 10</h1>
                </div>
            </div>
            <div className='runko_osa2'>

                <div className='lisatiedot'>
                    <div className='lisatiedot_osa'>
                        {movie.genres?.map((genre) => (
                            <button className='btn_genre'>{genre.name}</button>
                        ))}
                    </div>
                </div>
                <p>{movie.overview}</p>
                <p className='tekijat'>Ohjaus · {additionalData.directors?.name}</p>
                <p className='tekijat'>Käsikirjoitus · {additionalData.writers?.join(', ')}</p>
                <p className='tekijat'>Näyttelijät · {additionalData.cast?.slice(0, 3).join(', ')}</p>
                <p></p>

                <div className='lisatiedot_osa'>
                    <a href={imdbLink} target="_blank" rel="noopener noreferrer"><button className='yleinen_btn sininen valistys'>Lisätietoja & traileri (IMDb)</button></a>
                    <button className='yleinen_btn oranssi valistys'>Lisää suosikiksi</button>
                </div>
            </div>
        </div>
    );
}


const Arvostelut = ({ }) => {
    const [showText, setShowText] = useState(false);
    const handleClick = () => setShowText(!showText);
    const [rating, setRating] = useState(0);
    const changeRating = (newRating) => { setRating(newRating);};

    return (
        <div className='tiedot_runko leveyden_asetus'>
            <div className='runko_osa1'>
                <div className='otsikko'>
                    <h1>Arvostelut</h1>
                    <p>Yhteensä 30 arvostelua</p>
                </div>
                <div className='tahdet'>
                    <button onClick={handleClick} className='yleinen_btn sininen'>+ Arvostele elokuva</button>
                </div>
            </div>
            {showText && (
                <>
                    <h5 className='keskitys' style={{ margin: '30px 0px 10px 0px' }}>Arvostele elokuva</h5>
                    <p className='keskitys'>
                    <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        changeRating={changeRating}
                        numberOfStars={10}
                        name='rating'
                        starDimension="30px" />
                        <br/><br/>
                        Oma arviosi elokuvalle: {rating}/10</p>
                </>)}
            <p>Tänne listataan ennestään annetut arvosanat / yleisarvosana</p>
        </div>
    )
}

export default Elokuvasivu;