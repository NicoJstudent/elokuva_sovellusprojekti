import { useState } from 'react';
import './App.css';
import './monikkotyylit.css';

/* HUOMIO!
    Koska memberin ja adminin sivut ovat lähes identtiset, suosittelen tekemään tästä sivusta yleissivun ja lisäämään adminin 'Hallintapaneeli'-napin
    toiminnallisuuden taakse. Eli sivu tunnistaa onko tulija admin, ja näyttää napin vain silloin. Membereiltä se on piilotettu.
    Voit laittaa Hallintapaneeli-napin 'eroa yhteisöstä'-napin tilalle koska se ei tule käyttöön.
    
    Hallintapaneeli-nappi:
    <a href="yhteiso_hallintapaneeli"><button className='yleinen_btn oranssi'>Hallintapaneeli</button></a>
*/

const YhteisoJasensivu = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisön nimi</h1>
                    <YhteisoJasensivuTiedot />
                <YhteisoUutiset />
            </div>
        </>
    );
};

const YhteisoJasensivuTiedot = () => {
    const [showText, setShowText] = useState(false);
    const handleClick = () => setShowText(!showText);
    const usernick = localStorage.getItem('usernick');
    return (
        <>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa'>
                <h3>Tervetuloa {usernick}</h3>
                <p>Aiheita yhteensä 0 kpl</p>
                <p>Yhteisössä on 0 jäsentä</p>
                </div>
                <div className='luettelo_osa leveys30'>
            <a href="#"><button onClick={handleClick} className='yleinen_btn sininen'>Lisää uutisaihe</button></a>
            <br/>
            <a href="#"><button className='yleinen_btn punainen'>Eroa yhteisöstä</button></a>
        </div>
        </div>
            {showText && (
            <>
            <h5 style={{ margin: '30px 0px 20px 0px' }}>Lisää uutisaihe</h5>
            <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Otsikko:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='lisää oma otsikkosi'></input>
            </div>
        </div>
        <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Linkki:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='linkki uutiseen'></input>
            </div>
        </div>
        </>)}
        </>
    )
}

const YhteisoUutiset = () => {
    return (
<>
<h2 style={{ margin: '60px 0px 20px 0px' }}>Yhteisöön jaetut uutiset</h2>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        <hr style={{width:'65%'}}/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        <hr style={{width:'65%'}}/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        <hr style={{width:'65%'}}/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        </>
    )
}

export default YhteisoJasensivu;