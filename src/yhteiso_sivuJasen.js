import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './monikkotyylit.css';

const YhteisoJasensivu = () => {
    const [groupName, setGroupName] = useState('');
    const group_id = sessionStorage.getItem('groupId');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/groups_name', { params: { group_id: group_id } });
                //setGroupName(response.data.group_name);

                if (response.status === 200) {
                    setGroupName(response.data.group_name);
                } else {
                    console.error('Virhe yhteisöä haettaessa:', response.data.message);
                }
            } catch (error) {
                console.error('Virhe yhteisöä haettaessa:', error);
            }
        };

        fetchData();
    }, [group_id]);
    return (
        <>
            <div className='section'>
                <h1>{groupName}</h1>
                    <YhteisoJasensivuTiedot />
                <YhteisoUutiset />
            </div>
        </>
    );
};

const YhteisoJasensivuTiedot = () => {
    const [showText, setShowText] = useState(false);
    const handleClick = () => setShowText(!showText);
    const usernick = localStorage.getItem('usernick');
    return (
        <>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa'>
                <h3>Tervetuloa {usernick}</h3>
                <p>Aiheita yhteensä 0 kpl</p>
                <p>Yhteisössä on 0 jäsentä</p>
                </div>
                <div className='luettelo_osa leveys30'>
            <a href="#"><button onClick={handleClick} className='yleinen_btn sininen'>Lisää uutisaihe</button></a>
            <br/>
            <a href="#"><button className='yleinen_btn punainen'>Eroa yhteisöstä</button></a>
        </div>
        </div>
            {showText && (
            <>
            <h5 style={{ margin: '30px 0px 20px 0px' }}>Lisää uutisaihe</h5>
            <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Otsikko:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='lisää oma otsikkosi'></input>
            </div>
        </div>
        <div className='luettelo kirjoitusalueet'>
            <div className='luettelo_osa leveys20'><h3>Linkki:</h3></div>
            <div className='luettelo_osa leveys80'>
                <input className='tekstialue tekstialue_leveys90' placeholder='linkki uutiseen'></input>
            </div>
        </div>
        </>)}
        </>
    )
}

const YhteisoUutiset = () => {
    return (
<>
<h2 style={{ margin: '60px 0px 20px 0px' }}>Yhteisöön jaetut uutiset</h2>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        <hr style={{width:'65%'}}/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        <hr style={{width:'65%'}}/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        <hr style={{width:'65%'}}/>
        <div className='luettelo leveys60'>
            <div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity" target="_blank" rel="noopener noreferrer">Uutisotsikko sis. linkin</a></h3></div>
            <div className='luettelo_osa'><h4>Lisännyt: *käyttäjänimi*</h4></div>
            <div className='luettelo_osa'><h4>pvm?</h4></div>
        </div>
        </>
    )
}

export default YhteisoJasensivu;