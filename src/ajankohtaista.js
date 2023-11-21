import ryhmahau from './images/movie2.jpg';
import oppenheimer from './images/movie3.jpg';
import './mediacard.css';

/* Tänne voi alkaa lisätä IMDB:n haut:
    - kuva
    - vuosiluku
    - genre
    - nimi
    - linkki elokuvan sivulle
    */

/* Huom! Olisin käyttänyt kuvien lisäämiseen perinteisempää <img src="kuvan-osoite"> -tapaa,
    mutta se toimii vain jos kuva on samassa kansiossa tämän tiedoston
    kanssa. Sen vuoksi kuvat on nyt importattu. Voi olla että IMDB:n
    haussa tämä keino toimii, jolloin koodi vähenisi. Kannattaa kokeilla. */

const Ajankohtaista = () => {
    return (
        <div className='mediakorttien_runko'>

                    <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>2023 / biography</h1>
                    <h2><a href="#">Oppenheimer</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={ryhmahau} alt="" />
                    <h1>2023 / animation</h1>
                    <h2><a href="#">Paw Patrol: The Mighty Movie</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>2023 / biography</h1>
                    <h2><a href="#">Oppenheimer</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={ryhmahau} alt="" />
                    <h1>2023 / animation</h1>
                    <h2><a href="#">Paw Patrol: The Mighty Movie</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>2023 / biography</h1>
                    <h2><a href="#">Oppenheimer</a></h2>
                </div>

        </div>
    );
}

export default Ajankohtaista;