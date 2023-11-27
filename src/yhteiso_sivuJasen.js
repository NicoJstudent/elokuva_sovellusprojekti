import './App.css';
import './monikkotyylit.css';

const YhteisoJasensivu = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>Yhteisön nimi</h5>
                <div className='luettelo leveys60'>
                    <YhteisoJasensivuTiedot />
                    <YhteisoJasensivuButtonit />
                </div>
                <YhteisoUutiset />
            </div>
        </>
    );
};

const YhteisoJasensivuTiedot = () => {
    return (
        <>
            <div className='luettelo_osa'>
                <h3>Tervetuloa *käyttäjänimi*</h3>
                <p>Aiheita yhteensä 0 kpl</p>
                <p>Yhteisössä on 0 jäsentä</p>
                </div>
        </>
    )
}

const YhteisoJasensivuButtonit = () => {
    return (
        <div className='luettelo_osa leveys30'>
            <a href="#"><button className='yleinen_btn sininen'>Lisää uutisaihe</button></a>
            <br/>
            <a href="#"><button className='yleinen_btn punainen'>Eroa yhteisöstä</button></a>
        </div>
    )
}

const YhteisoUutiset = () => {
    return (
        <>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/thelastofuse_season1_pedorpascal_hbomax.jpg"/></div>
            <div><h3>Uusi näyttelijäkiinnitys saattaa olla vihje Marvelin suunnanvaihdoksesta</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 julkaisija</h4></div>
        </div>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/themarvelsdisneybriejaiman2023.jpg"/></div>
            <div><h3>Missä vika? The Marvels ei kilisytä kassaa toivotusti</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 julkaisija</h4></div>
        </div>
        </>
    )
}

export default YhteisoJasensivu;