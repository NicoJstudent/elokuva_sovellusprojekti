import './App.css';
import './monikkotyylit.css';

const KayttajaPoisto2 = () => {
    return (
        <>
            <div className='section'>
                <h1>Käyttäjätunnus poistettu onnistuneesti</h1>
                </div>
                <div className='section'>
                <TilinpoistoPalaa />
            </div>
        </>
    );
};

const TilinpoistoPalaa = () => {
    return (
    <>
    <a href="/"><button className='yleinen_btn levea sininen'>Palaa takaisin etusivulle</button></a>
    </>
    )
}

export default KayttajaPoisto2;