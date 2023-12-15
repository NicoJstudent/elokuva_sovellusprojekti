import { useEffect, useState } from 'react';
//import fetchMovieData from './API_tmdb_fetchMovieData';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { fetchMovieAdditionalData, fetchMovieData } from './API_tmdb_fetchMovieData';
import './App.css';
import './elokuvasivun_pohja.css';
import star from './images/star.png';
import './monikkotyylit.css';
import axios from 'axios';
import isAuthenticated from './isAuthenticated';
/* Ongelmakohdat ja muutostarpeet:
- Ikäraja ei toimi odotetusti (vain K-18/sallittu)
- Suosikki-nappia ei aktivoitu
*/
// Aikaformaatin muuttaminen
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

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
                <Arvostelut newMovieid={id} />
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
    const newUsernick = localStorage.getItem('usernick');

    const handleAddToFavorites = async () => {
        try {
            const response = await axios.post('/add-to-favorites', {
                usernick: newUsernick,
                movie_id: movie.id,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Movie added to favorites successfully');

            } else {
                console.error('Failed to add movie to favorites:', response.statusText);

            }
        } catch (error) {
            console.error('Error adding movie to favorites:', error.message);
            console.log(movie.id + ' ' + newUsernick)

        }
    };

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
                    <button className='yleinen_btn oranssi valistys' onClick={handleAddToFavorites}>Lisää suosikiksi</button>
                </div>
            </div>
        </div>
    );
}


const Arvostelut = ({ newMovieid }) => {
    const [showText, setShowText] = useState(false);
    const handleClick = () => setShowText(!showText);
    const [rating, setRating] = useState(0);
    const [ratingsList, setRatingsList] = useState([]);
    const newUsernick = localStorage.getItem('usernick');
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
    const changeRating = (newRating) => {
        setRating(newRating);
        saveRatingToDatabase(newRating);
    };

    const saveRatingToDatabase = async (newRating) => {

        if (!isAuthenticated()) {       // Tarkistaa onko kirjautunut sisään
            window.location.href = '/kirjaudurekisteroidy';
        } else {

            try {
                const response = await axios.post('/arvostelut', {
                    rating: newRating,
                    date: timestamp,
                    usernick: newUsernick,
                    movieid: newMovieid,
                });

                if (response.data.success) {
                    console.log('Rating saved to the database successfully');
                } else {
                    console.error('Failed to save rating to the database');
                }

            } catch (error) {
                console.error('Error saving rating to the database:', error.message);
            }
        }
    };


    const fetchRatings = async () => {
        try {
            const response = await axios.get(`/reviewsList/${newMovieid}`);
            if (response.data.success) {
                setRatingsList(response.data.ratings);
                console.log(ratingsList) //listan sisältö consoleen
                console.log('Movie ID:' + newMovieid)
            } else {
                console.error('Failed to fetch ratings from the database');
            }
        } catch (error) {
            console.error('Error fetching ratings from the database:', error.message);
        }
    };

    useEffect(() => {

        fetchRatings();
    }, []);

    return (
        <div className='tiedot_runko leveyden_asetus'>
            <div className='runko_osa1'>
                <div className='otsikko'>
                    <h1>Arvostelut</h1>
                </div>
                <div className='tahdet'>
                    <button onClick={handleClick} className='yleinen_btn sininen'>+ Arvostele elokuva</button>
                </div>
            </div>
            {showText && (
                <>
                    <h5 className='keskitys' style={{ margin: '30px 0px 10px 0px' }}>Arvostele elokuva</h5>
                    <div className='keskitys'>
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            changeRating={changeRating}
                            numberOfStars={10}
                            name='rating'
                            starDimension="30px" />
                        <br /><br />
                        Oma arviosi elokuvalle: {rating}/10</div>
                </>)}
            <div className="review-list">
                <p>Käyttäjien arvosanat</p>
                {ratingsList.length === 0 && (
                    <p>Tälle elokuvalle ei ole annettu yhtään arvostelua &#x1F61E;</p>
                )}
                {ratingsList.length > 0 && (
                    <ul>
                        {ratingsList.map((ratingItem, index) => (
                            <li key={index} className="review-item">
                                <div className="review-column">
                                    Käyttäjä {ratingItem.usernick} antoi arvosanan
                                </div>
                                <div className='review-column'>
                                    {ratingItem.rating}/10
                                </div>
                                <div className="review-column">
                                    {formatDate(ratingItem.date)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}


export default Elokuvasivu;