import './App.css';
import './monikkotyylit.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

/* Voisko tätä yhtä pohjaa käyttää kahdelle toiminnolle:
Jos ei kuulu yhteisöön > YhteisoTila_Ei + YhteisoLiityButton_Liity
Jos jo jättänyt liittymispyynnön > YhteisoTila_Odottaa + YhteisoLiityButton_Odottaa
*/

const YhteisoLiity = () => {
    const [groupName, setGroupName] = useState('');
    const group_id = sessionStorage.getItem('groupId');
    const [showJoinButton, setShowJoinButton] = useState(true);

    const handleLiittymispyyntoClick = () => {

        setShowJoinButton(false);
      };

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
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>{groupName}</h5>
                {showJoinButton ? (
                    <YhteisoLiityButton_Liity onClick={handleLiittymispyyntoClick} />
                ) : (
                    <button className='yleinen_btn levea'>Olet jättänyt liittymispyynnön</button>
                )}
            </div>
            <div className='section'>
                <YhteisoTila_Ei />
            </div>
        </>
    );
};

const YhteisoTila_Ei = () => {
    return (
        <div className='esittelytxt'>Et kuulu vielä tähän yhteisöön. Voit jättää liittymispyynnön.</div>
    )
}

const YhteisoTila_Odottaa = () => {
    return (
        <div className='esittelytxt'>Olet jättänyt liittymispyynnön.<br />Odota kunnes ryhmänvetäjä hyväksyy tai hylkää pyyntösi.</div>
    )
}

const YhteisoLiityButton_Liity = () => {
    const handleLiittymispyynto = async () => {
        const usernick = localStorage.getItem('usernick');
        const group_id = sessionStorage.getItem('groupId');

        try {
            const response = await axios.post('/liittymispyynto', { usernick, group_id });

            if (response.data.success) {
                console.log('Liittymispyyntö lähetetty onnistuneesti');
                <YhteisoTila_Odottaa />

            } else {
                console.error('Liittymispyyntöä ei voitu lähettää');
            }
        } catch (error) {
            console.error('Virhe liittymispyyntöä lähettäessä:', error);
        }
    };
    return (
        <>
            <button className='yleinen_btn levea sininen' onClick={handleLiittymispyynto}>Lähetä liittymispyyntö</button>
        </>
    )
}

const YhteisoLiityButton_Odottaa = () => {
    return (
        <>
            <button className='yleinen_btn levea'>Olet jättänyt liittymispyynnön</button>
        </>
    )
}

export default YhteisoLiity;