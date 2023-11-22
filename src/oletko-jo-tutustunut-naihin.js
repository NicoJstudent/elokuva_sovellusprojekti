import oppenheimer from './images/movie3.jpg';
import './mediacard.css';

/* Tänne voi alkaa lisätä IMDB:n haut:
    - kuva
    - vuosiluku
    - genre
    - nimi
    - linkki elokuvan sivulle
    */


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