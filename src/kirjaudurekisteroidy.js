import './App.css';
import './monikkotyylit.css';

const KirjRek = () => {
    return (
        <>
            <div className='section'>
                <h1>Kirjaudu sisään</h1>
                <p className="esittelytxt">Mikäli sinulla on jo käyttäjätunnus ja salasana, voit kirjautua sisään.</p>
                <Kirjaudu />
                <button className='yleinen_btn levea sininen'>Kirjaudu sisään</button>
            </div>

            <div className='section'>
                <h1>Rekisteröidy käyttäjäksi</h1>
                <p className="esittelytxt">Voit luoda uuden käyttäjätunnuksen antamalla seuraavat tiedot.</p>
                <Rekisteroidy />
                <button className='yleinen_btn levea sininen'>Luo käyttäjätunnus</button>
            </div>
        </>
    );
};


const Kirjaudu = () => {
    return (
        <>
        <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Käyttäjänimi:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='käyttäjätunnus'></input>
            </div>
        </div>
        <div className='luettelo kirjoitusalueet'>
        <div className='luettelo_osa leveys20'><h3>Salasana:</h3></div>
        <div className='luettelo_osa leveys80'>
            <input className='tekstialue tekstialue_leveys90' placeholder='****'></input>
        </div>
    </div>
    </>
    );
}

const Rekisteroidy = () => {
    return (
        <>
        <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Nimimerkki:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='nimimerkki'></input>
            </div>
        </div>
        <div className='luettelo kirjoitusalueet'>
        <div className='luettelo_osa leveys20'><h3>Sähköposti:</h3></div>
        <div className='luettelo_osa leveys80'>
            <input className='tekstialue tekstialue_leveys90' placeholder='sähköposti'></input>
        </div>
    </div>
    <div className='luettelo kirjoitusalueet'>
        <div className='luettelo_osa leveys20'><h3>Salasana:</h3></div>
        <div className='luettelo_osa leveys80'>
            <input className='tekstialue tekstialue_leveys90' placeholder='vähintään 8 kirjainta'></input>
        </div>
    </div>
    </>
    );
}

export default KirjRek;