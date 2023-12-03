import { useState } from 'react';
import './App.css';
import './monikkotyylit.css';
import isAuthenticated from './isAuthenticated';

/* HUOM!
    Tämän sivun täytyy tunnistaa jos käyttäjä ei ole kirjautunut sisään
    -> piilotetaan 'lisää uusi yhteisö '-nappi
    -> ei mahdollisuutta avata yhteisön linkkejä
*/

const Yhteiso = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <p className="esittelytxt">Yhteisössä voit keskustella toisten samanhenkisten ihmisten kanssa, jakaa uutisia ja kuulua joukkoon. Yhteisöt ovat suljettuja. Päästäksesi mukaan sinun täytyy tehdä liittymispyyntö keskustelun aloittajalle.</p>
                <LisaaUusiYhteisö />
            </div>
            <div className='section'>
                <YhteisoLista />
            </div>
        </>
    );
};

const LisaaUusiYhteisö = () => {
    const [showText, setShowText] = useState(false);
    const handleClick = () => setShowText(!showText);

    if (!isAuthenticated()) {       // Tarkistaa onko kirjautunut sisään
        window.location.href = '/kirjaudurekisteroidy';
    }
    
    return (
        <>
            <button onClick={handleClick} className='yleinen_btn levea sininen'>+ Lisää uusi yhteisö</button>
            {showText && (
                <>
                    <h5 style={{ margin: '60px 0px 20px 0px' }}>Lisää uusi yhteisö</h5>
                    <div className='luettelo kirjoitusalueet'>
                        <div className='luettelo_osa leveys20'><h3>Yhteisön nimi:</h3></div>
                        <div className='luettelo_osa leveys80'>
                            <input className='tekstialue tekstialue_leveys90' placeholder='lisää yhteisölle nimi'></input>
                        </div>
                    </div>
                </>)}
        </>
    )
};


const YhteisoLista = () => {
    return (
        <>
            <div className='luettelo'>
                <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity">Yhteisön nimi (ei pääsyä)</a></h3></div>
                <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
                <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
            </div>
            <hr style={{ width: '85%' }} />
            <div className='luettelo'>
                <div className='luettelo_osa leveys30'><h3><a href="yhteiso_sivujasen">Yhteisön nimi (pääsy)</a></h3></div>
                <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
                <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
            </div>
            <hr style={{ width: '85%' }} />
            <div className='luettelo'>
                <div className='luettelo_osa leveys30'><h3><a href="yhteiso_sivuomistaja">Yhteisön nimi (omistaja)</a></h3></div>
                <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
                <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
            </div>
            <hr style={{ width: '85%' }} />
            <div className='luettelo'>
                <div className='luettelo_osa leveys30'><h3>Yhteisön nimi</h3></div>
                <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
                <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
            </div>
        </>
    );
}

export default Yhteiso;