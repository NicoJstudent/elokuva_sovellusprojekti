import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './monikkotyylit.css';

const YhteisoHallintapaneeli = () => {
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

    // poistettu <HyvaksytytPyynnot />
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <h5 style={{ margin: '20px 0px 40px 0px' }}>{groupName}</h5>
                <div className='luettelo leveys60'>
                    <YhteisoHallintaTiedot />
                    <YhteisoHallintaButton />
                </div>
                <AvoimetLiittymispyynnot />
            </div>
        </>
    );
};

const YhteisoHallintaTiedot = () => {
    return (
        <>
            <div className='luettelo_osa'>
                <h3>Yhteisön jäsenten hallintapaneeli</h3>
                <p>Avoimet pyynnöt: 0 kpl</p>
                <p>Hyväksytyt pyynnöt: 0 kpl</p>
            </div>
        </>
    )
}

const YhteisoHallintaButton = () => {
    return (
        <div className='luettelo_osa'>
            <a href="yhteiso_sivuomistaja"><button className='yleinen_btn sininen'>Palaa yhteisöön</button></a><br />
            <a href="yhteiso_eroa1"><button className='yleinen_btn punainen'>Poista yhteisö</button></a>
        </div>
    )
}

const AvoimetLiittymispyynnot = () => {
    const initialGroupID = sessionStorage.getItem('groupId') || '';
    const [group_id, setGroupID] = useState(initialGroupID);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/applications/${group_id}`);
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications', error);
            }
        };

        if (group_id !== '') {
            fetchData();
        }
    }, [group_id]);

    const handleAccept = (user_id) => {
        const acceptApplication = async () => {
            try {
                const response = await axios.put(`/application/${group_id}/${user_id}`);
                if (response.status === 200) {
                    //setApplications(applications.filter((app) => app.user_id !== user_id));
                } else {
                    console.error('Error accepting application', response.data.message);
                }
            } catch (error) {
                console.error("Error response:");
                console.error(error.response.data);    // ***
                console.error(error.response.status);  // ***
                console.error(error.response.headers); // ***
            }
        };

        acceptApplication();


    };
    const handleReject = (user_id) => {
        const rejectApplication = async () => {
            try {
                const response = await axios.delete(`/application/${group_id}/${user_id}`);
                if (response.status === 200) {
                    //setApplications(applications.filter((app) => app.user_id !== user_id));
                } else {
                    console.error('Error rejecting application', response.data.message);
                }
            } catch (error) {
                console.error("Error response:");
                console.error(error.response.data);    // ***
                console.error(error.response.status);  // ***
                console.error(error.response.headers); // ***
            }
        };

        rejectApplication();
        

    };

    // käyttäjän id vaihdetaan nicknameen kesken
    // useEffect(() => {
    //     const fetchUserNicknames = async () => {
    //       try {
    //         const userIds = applications.map((app) => app.user_id);
    //         const response = await axios.get(`/customer/${userIds}`, { userIds });
    //         
    //         // Assuming the response is an object with user_id as key and nickname as value
    //         const nicknamesMap = response.data;
    // 
    //         const updatedApplications = applications.map((app) => ({
    //           ...app,
    //           nickname: nicknamesMap[app.user_id],
    //         }));
    // 
    //         setApplications(updatedApplications);
    //       } catch (error) {
    //         console.error('Error fetching user nicknames', error);
    //       }
    //     };
    // 
    //     if (applications.length > 0) {
    //       fetchUserNicknames();
    //     }
    //   }, [applications]);
    // User ID: {app.user_id}, Application Date: {app.application_date}
    return (
        <div className='section'>
            <h2>Avoimet liittymispyynnöt</h2>
            <div  style={{ width: '70%', margin: 'auto' }}>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
                {applications.map((app) => (
                    <div key={app.user_id} >
                        <div className='luettelo'>
                            <div className='luettelo_osa leveys50'><h3>{app.user_id}</h3></div>
                            <div className='luettelo_osa'><button className='yleinen_btn filtterit sininen' onClick={() => handleAccept(app.user_id)}>hyväksy</button></div>
                            <div className='luettelo_osa'><button className='yleinen_btn filtterit punainen' onClick={() => handleReject(app.user_id)}>hylkää</button></div>
                        </div>
                        <hr style={{ width: '100%' }} />
                    </div>
                ))}
            </ul>
            </div>
        </div>
    )
}

//const HyvaksytytPyynnot = () => {
//    return (
//        <div className='section'>
//            <h2>Hyväksytyt pyynnöt</h2>
//            <div className='luettelo leveys60'>
//                <div className='luettelo_osa'><h3>käyttäjänimi</h3></div>
//                <div className='luettelo_osa hylkays'><a href="#">poista jäsen</a></div>
//            </div>
//            <hr className='leveys70' />
//            <div className='luettelo leveys60'>
//                <div className='luettelo_osa'><h3>käyttäjänimi</h3></div>
//                <div className='luettelo_osa hylkays'><a href="#">poista jäsen</a></div>
//            </div>
//        </div>
//    )
//}

export default YhteisoHallintapaneeli;