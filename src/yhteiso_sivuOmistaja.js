import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './monikkotyylit.css';

/** Saisiko tämän sivun poikkeavat funktiot yhdistettyä normaaliin jäsensivuun?
 * Jos koodi tunnistaisi tulijan ja näyttäisi sen perusteella halutut funktiot...
 * Kaikki muu on samaa kuin normaalissa sivussa, paitsi Hallintapaneeli-buttonin näkyvyys*/

const YhteisoOmistajasivu = () => {
    const [groupName, setGroupName] = useState('');
    const group_id = sessionStorage.getItem('groupId');
    console.log(group_id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/groups_name', { params: { group_id: group_id } });
                //setGroupName(response.data.group_name);

                if (response.status === 200) {
                    console.log(response.data)
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
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>{groupName}</h5>
                <div className='luettelo leveys60'>
                    <YhteisoOmistajasivuTiedot />
                    <YhteisoOmistajasivuButtonit />
                </div>
                <YhteisoUutiset />
            </div>
        </>
    );
};

const YhteisoOmistajasivuTiedot = () => {
    const usernick = localStorage.getItem('usernick');
    return (
        <>
            <div className='luettelo_osa'>
                <h3>Tervetuloa {usernick}</h3>
                <p>Aiheita yhteensä 0 kpl</p>
                <p>Yhteisössä on 0 jäsentä</p>
                </div>
        </>
    )
}

const YhteisoOmistajasivuButtonit = () => {
    return (
        <div className='luettelo_osa leveys30'>
            <button className='yleinen_btn sininen'>Lisää uutisaihe</button>
            <br/>
            <a href="yhteiso_hallintapaneeli"><button className='yleinen_btn oranssi'>Hallintapaneeli</button></a>
        </div>
    )
}

const YhteisoUutiset = () => {
    return (
        <>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/thelastofuse_season1_pedorpascal_hbomax.jpg" alt="uutiskuva"/></div>
            <div><h3>Uusi näyttelijäkiinnitys saattaa olla vihje Marvelin suunnanvaihdoksesta</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 julkaisija</h4></div>
        </div>
        <div className='uutiset'>
            <div className='uutiset_kuva'><img src="https://www.leffatykki.com/wp-content/uploads/2023/11/themarvelsdisneybriejaiman2023.jpg" alt="uutiskuva"/></div>
            <div><h3>Missä vika? The Marvels ei kilisytä kassaa toivotusti</h3></div>
            <div className='uutiset_info'><h4>16.11.2023 julkaisija</h4></div>
        </div>
        </>
    )
}

export default YhteisoOmistajasivu;