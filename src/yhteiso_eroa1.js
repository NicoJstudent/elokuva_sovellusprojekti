import './App.css';
import './monikkotyylit.css';

/* Saisiko nämä 'oletko varma' -sivut yhdistettyä jotenkin? Samoin 'erosit onnistuneesti'.
   Näitä on ainakin yhteisöstä eroamisessa, yhteisön poistossa ja käyttäjätilin poistossa. */

const YhteisoEroa1 = () => {
    return (
        <>
            <div className='section'>
                <h1>Oletko varma, että haluat erota tästä yhteisöstä?</h1>
                <h2>*yhteisön nimi*</h2>
                </div>
                <div className='section'>
                <YhteisoEroaButtonit />
            </div>
        </>
    );
};

const YhteisoEroaButtonit = () => {
    return (
    <>
    <div className='luettelo leveys70'>
    <button className='yleinen_btn levea sininen'>Ei, haluan pysyä yhteisössä</button>
    <button className='yleinen_btn levea punainen'>Kyllä, haluan poistua yhteisöstä</button>
    </div>
    </>
    )
}

export default YhteisoEroa1;