import './App.css';
import './monikkotyylit.css';

const YhteisoHallintapaneeli = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>Yhteisön nimi</h5>
                <div className='luettelo leveys60'>
                    <YhteisoHallintaTiedot />
                    <YhteisoHallintaButton />
                </div>
                <AvoimetLiittymispyynnot/>
                <HyvaksytytPyynnot/>
            </div>
        </>
    );
};

const YhteisoHallintaTiedot = () => {
    return (
        <>
            <div className='luettelo_osa'>
                <h3>Yhteisön jäsenten hallintapaneeli</h3>
                <p>Avoimet pyynnöt: 0 kpl</p>
                <p>Hyväksytyt pyynnöt: 0 kpl</p>
                </div>
        </>
    )
}

const YhteisoHallintaButton = () => {
    return (
        <div className='luettelo_osa'>
            <button className='yleinen_btn punainen'>Poista yhteisö</button>
        </div>
    )
}

const AvoimetLiittymispyynnot = () => {
    return (
        <div className='section'>
        <h2>Avoimet liittymispyynnöt</h2>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa'><h3>käyttäjänimi</h3></div>
            <div className='luettelo_osa hyvaksy'><a href="#">hyväksy pyyntö</a></div>
            <div className='luettelo_osa hylkays'><a href="#">hylkää</a></div>
        </div>
        <hr className='leveys70'/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa'><h3>käyttäjänimi</h3></div>
            <div className='luettelo_osa hyvaksy'><a href="#">hyväksy pyyntö</a></div>
            <div className='luettelo_osa hylkays'><a href="#">hylkää</a></div>
        </div>
        </div>
    )
}

const HyvaksytytPyynnot = () => {
    return (
        <div className='section'>
        <h2>Hyväksytyt pyynnöt</h2>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa'><h3>käyttäjänimi</h3></div>
            <div className='luettelo_osa hylkays'><a href="#">poista jäsen</a></div>
        </div>
        <hr className='leveys70'/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa'><h3>käyttäjänimi</h3></div>
            <div className='luettelo_osa hylkays'><a href="#">poista jäsen</a></div>
        </div>
        </div>
    )
}

export default YhteisoHallintapaneeli;