import './elokuvasivun_pohja.css';
import kuva from './images/movie3.jpg';
import star from './images/star.png';

const Elokuvasivu = () => {
    return (
        <>
            <div className='row'>
            <Kuva />
            <Tiedot />
            </div>
        </>
    );
};

const Kuva = () => {
    return (
        <div className='vasenkuva'>
        <img src={kuva} alt=""/>
        </div>
    );
}

const Tiedot = () => {
    return (
        <div className='tiedot_runko'>
            <div className='runko_osa1'>
                <div className='otsikko'>
                    <h1>Oppenheimer</h1>
                    <div className='lisatiedot osa1'>
                        <div className='lisatiedot_osa'>2023</div>
                        <div className='lisatiedot_osa'>·</div>
                        <div className='lisatiedot_osa'>K-12</div>
                        <div className='lisatiedot_osa'>·</div>
                        <div className='lisatiedot_osa'>3h</div>
                    </div>
                </div>
                <div className='tahdet'>
                    <img src={star} alt=""/>
                    <h1> 8.5 / 10</h1>
                </div>
        </div>
        <div className='runko_osa2'>

            <div className='lisatiedot'>
                <div className='lisatiedot_osa'>
                    <button className='ontto'>Biography</button>
                    <button className='ontto'>Drama</button>
                    <button className='ontto'>History</button>
                </div>
            </div>
            <p>The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.</p>
            
            </div>

        </div>
    );
}

export default Elokuvasivu;