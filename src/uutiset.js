import './App.css';
import './monikkotyylit.css';

const Uutiset = () => {
    return (
        <>
            <div className='section'>
                <h1>Uutiset</h1>
                <UutisetLista />
            </div>
        </>
    );
};


const UutisetLista  = () => {
    return (
        <>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/thelastofuse_season1_pedorpascal_hbomax.jpg"/></div>
            <div><h3>Uusi näyttelijäkiinnitys saattaa olla vihje Marvelin suunnanvaihdoksesta</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 16:03</h4></div>
        </div>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/themarvelsdisneybriejaiman2023.jpg"/></div>
            <div><h3>Missä vika? The Marvels ei kilisytä kassaa toivotusti</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 16:03</h4></div>
        </div>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/nolan_tenet_wb.jpg"/></div>
            <div><h3>Christopher Nolan saattaa palata yhteistyöhön tutun studion kanssa</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 16:03</h4></div>
        </div>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/priscilla2023a24.jpg"/></div>
            <div><h3>Tuore Elvikseen liittyvä elokuva kohtasi yllättäviä esteitä – jo musiikkiraidan tekeminen oli iso haaste</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 16:03</h4></div>
        </div>
        </>
    );
}

export default Uutiset;