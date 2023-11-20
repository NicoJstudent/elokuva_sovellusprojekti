import './App.css';
import './monikkotyylit.css';

const Yhteiso = () => {
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <p className="esittelytxt">Yhteisössä voit keskustella toisten samanhenkisten ihmisten kanssa, jakaa uutisia ja kuulua joukkoon. Yhteisöt ovat suljettuja. Päästäksesi mukaan sinun täytyy tehdä liittymispyyntö keskustelun aloittajalle.</p>
            </div>
            <LisaaUusiYhteiso />
            <div className='section'>
                <YhteisoLista />
            </div>
        </>
    );
};

const LisaaUusiYhteiso = () => {
    return (
        <>
        <button className='sininen'>+ Lisää uusi yhteisö</button></>
    );
}


const YhteisoLista = () => {
    return (
        <>
        <p>Tähän tulee yhteisölistaus. Alle koottu malli kuinka alkuperäinen oli suunniteltu. Muokataan kun tilanne kehittyy.</p>
        </>
    );
}

export default Yhteiso;