import './App.css';
import './monikkotyylit.css';

const YhteisoUusiYhteiso = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>Lisää uusi yhteisö</h5>
                <YhteisoUusiYhteiso_Luo />
            </div>
            <div className='section'>
                <YhteisoUusiYhteisoButton />
            </div>
        </>
    );
};

const YhteisoUusiYhteiso_Luo = () => {
    return (
        <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Yhteisön nimi:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='anna yhteisölle nimi'></input>
            </div>
        </div>
    )
}

const YhteisoUusiYhteisoButton = () => {
    return (
        <>
            <button className='yleinen_btn levea sininen'>Lisää yhteisö</button>
        </>
    )
}

export default YhteisoUusiYhteiso;