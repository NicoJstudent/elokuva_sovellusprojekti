import './kollaasi.css';

const Kollaasi = () => {
    return (
        <div className='kolmen_kollaasi'>

            <div className='kollaasi_osa'>
                <Kollaasi_yhteiso />
            </div>

            <div className='kollaasi_osa'>
                <Kollaasi_uutiset />
            </div>

            <div className='kollaasi_osa'>
                <Kollaasi_info />
            </div>

        </div>
    );
}

const Kollaasi_yhteiso = () => {
    return (
        <div className='kollaasityylit'>
        <h2>Viimeisimmät yhteisöt</h2>
        <p>Tähän tulee 4-5 viimeisintä aktiivista yhteisöä</p>
        <h3>00.00.0000</h3>
        <h4>Yhteisön nimi</h4>
        <hr/>
        <h3>00.00.0000</h3>
        <h4>Yhteisön nimi</h4>
        <hr/>
        <h3>00.00.0000</h3>
        <h4>Yhteisön nimi</h4>
        </div>
    );
}

const Kollaasi_uutiset = () => {
    return (
        <div className='kollaasityylit'>
        <h2>Uutiset</h2>
        <p>Tähän 3 uusinta uutista</p>
        <p>Ensimmäiseen matala kuva ja otsikko, muihin pelkkä otsikko. Jos kuvan kanssa ongelmia, voidaan mennä ilmankin</p>
        <a href="#"><h4>Otsikko</h4></a>
        <hr/>
        <a href="#"><h4>Otsikko</h4></a>
        <hr/>
        <a href="#"><h4>Otsikko</h4></a>
        </div>
    );
}

const Kollaasi_info = () => {
    return (
        <>
            <h2>Info</h2>
            <p>Tähän pieni infopaketti projektista ja listattuna asioita joita olisi hyvä tietää.</p>
            <ul><li>plaa plaa</li>
                <li>plaa plaa</li>
                <li>plaa plaa</li></ul>
            <p>Tutustu myös:<br /><a href="link">GitHub-linkki</a></p>
        </>
    );
}

export default Kollaasi;