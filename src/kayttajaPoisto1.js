import './App.css';
import './monikkotyylit.css';

const KayttajaPoisto1 = () => {
    return (
        <>
            <div className='section'>
                <h1>Oletko varma, että haluat poistaa käyttäjätunnuksesi?</h1>
                <h2>Poistettua tunnusta ei voida palauttaa</h2>
                </div>
                <div className='section'>
                <TilinpoistoButtonit />
            </div>
        </>
    );
};

const TilinpoistoButtonit = () => {
    return (
    <>
    <div className='luettelo leveys70'>
    <button className='yleinen_btn levea sininen'>Ei, haluan pitää käyttäjätunnukseni</button>
    <button className='yleinen_btn levea punainen'>Kyllä, poista käyttäjätunnus</button>
    </div>
    </>
    )
}

export default KayttajaPoisto1;