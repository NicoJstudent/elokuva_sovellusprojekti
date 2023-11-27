import './App.css';
import './monikkotyylit.css';

const Yhteiso = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <p className="esittelytxt">Yhteisössä voit keskustella toisten samanhenkisten ihmisten kanssa, jakaa uutisia ja kuulua joukkoon. Yhteisöt ovat suljettuja. Päästäksesi mukaan sinun täytyy tehdä liittymispyyntö keskustelun aloittajalle.</p>
                <a href="yhteiso_uusiyhteiso"><button className='yleinen_btn levea sininen'>+ Lisää uusi yhteisö</button></a>
                <p>* Jos ei kirjautunut sisään, ohjaa suoraan sille sivulle nappia painettaessa*</p>
            </div>
            <div className='section'>
                <YhteisoLista />
            </div>
        </>
    );
};


const YhteisoLista = () => {
    return (
        <>
        <p>Tähän tulee yhteisölistaus. Alle koottu malli kuinka alkuperäinen oli suunniteltu. Muokataan kun tilanne kehittyy.</p>
        <div className='luettelo'>
            <div className='luettelo_osa'><h3><a href="yhteiso_liity">Yhteisön nimi (ei pääsyä)</a></h3></div>
            <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
            <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
        </div>
        <hr style={{width:'85%'}}/>
        <div className='luettelo'>
            <div className='luettelo_osa'><h3><a href="yhteiso_sivujasen">Yhteisön nimi (pääsy)</a></h3></div>
            <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
            <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
        </div>
        <hr style={{width:'85%'}}/>
        <div className='luettelo'>
            <div className='luettelo_osa'><h3><a href="yhteiso_sivuomistaja">Yhteisön nimi (omistaja)</a></h3></div>
            <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
            <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
        </div>
        <hr style={{width:'85%'}}/>
        <div className='luettelo'>
            <div className='luettelo_osa'><h3>Yhteisön nimi</h3></div>
            <div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
            <div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
        </div>
        </>
    );
}

export default Yhteiso;