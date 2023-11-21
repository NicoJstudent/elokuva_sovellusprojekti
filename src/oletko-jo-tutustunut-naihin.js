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


/* Lisätäänkö etusivulle eli tähän joku filtteri suodattamaan elokuvien listaa?
    Jos kyllä, pitänee tätä näkymää vielä muokata etsimään randomilla elokuvien tietoja
    ja yhdistämään ne tänne. Mutta ajatuksena yht. 10 elokuvaa.*/

const Elokuvat_etusivulla = () => {
    return (
        <div className='mediakorttien_runko'>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>

                <div className="mediakortti">
                    <img src={oppenheimer} alt="" />
                    <h1>Year / genre</h1>
                    <h2><a href="#">Movie Name</a></h2>
                </div>
        </div>
    );
}

export default Elokuvat_etusivulla;