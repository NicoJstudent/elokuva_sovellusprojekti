import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import isAuthenticated from './isAuthenticated';
import './monikkotyylit.css';

/* HUOM!
    Tämän sivun täytyy tunnistaa jos käyttäjä ei ole kirjautunut sisään
    -> piilotetaan 'lisää uusi yhteisö '-nappi
    -> ei mahdollisuutta avata yhteisön linkkejä
*/

const Yhteiso = () => {    
    return (
        <>
            <div className='section'>
                <h1>Yhteisö</h1>
                <p className="esittelytxt">Yhteisössä voit keskustella toisten samanhenkisten ihmisten kanssa, jakaa uutisia ja kuulua joukkoon. Yhteisöt ovat suljettuja. Päästäksesi mukaan sinun täytyy tehdä liittymispyyntö keskustelun aloittajalle.</p>
                <LisaaUusiYhteisö />
            </div>
            <div className='section'>
                <YhteisoLista />
            </div>
        </>
    );
};

const LisaaUusiYhteisö = () => {
    const [showText, setShowText] = useState(false);
    const [group_name, setGroup_name] = useState('');
    //const [user_id, setUserid] = useState(localStorage.getItem('usernick')); 

    const handleClick = () => {
        if (!isAuthenticated()) {       // Tarkistaa onko kirjautunut sisään
            window.location.href = '/kirjaudurekisteroidy';
        } else {
        setShowText(!showText);
        }
    }

    const handleCommunityCreation = async () => {
        if (!isAuthenticated()) {       // Tarkistaa onko kirjautunut sisään
            window.location.href = '/kirjaudurekisteroidy';
        } else {

            const usernick = localStorage.getItem('usernick');

            try {
                const response = await axios.post('/group_create', { usernick, group_name });

                if (response.data.success) {
                    console.log('Yhteisön luominen onnistui');
                } else {
                    console.error('Yhteisön luominen epäonnistui:', response.data.message);
                }
            } catch (error) {
                console.error('Error during community registration:', error.message);
            }
        }
    }

    return (
        <>
            <button onClick={handleClick} className='yleinen_btn levea sininen'>+ Lisää uusi yhteisö</button>
            {showText && (
                <>
                    <h5 style={{ margin: '60px 0px 20px 0px' }}>Lisää uusi yhteisö</h5>
                    <div className='luettelo kirjoitusalueet'>
                        <div className='luettelo_osa leveys20'><h3>Yhteisön nimi:</h3></div>
                        <div className='luettelo_osa leveys80'>
                            <input className='tekstialue tekstialue_leveys90' placeholder='lisää yhteisölle nimi' type="text" value={group_name} onChange={(e) => setGroup_name(e.target.value)}></input>
                        </div>
                    </div>
                    <button className='yleinen_btn levea sininen' onClick={handleCommunityCreation}>Luo yhteisö</button>
                </>)}
        </>
    )
};


const YhteisoLista = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('/groups_list');
                setGroups(response.data.groups);

            } catch (error) {
                console.error('Error fetching groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const handleGroupClick = async (groupId) => {
        if (!isAuthenticated()) {       // Tarkistaa onko kirjautunut sisään
            window.location.href = '/kirjaudurekisteroidy';
        } else {
            try {
                const usernick = localStorage.getItem('usernick');
                const response = await axios.get(`/groups_role?group_id=${groupId}&usernick=${usernick}`);
                sessionStorage.setItem('groupId', groupId);
                const userRole = response.data.role;
          
                const getGroupPage = (groupId, userRole) => {
                  switch (userRole) {
                    case 'owner':   // /${groupId}
                      return `/yhteiso_sivuOmistaja`;
                    case 'member':
                      return `/yhteiso_sivuJasen`;
                    default: // Täytyy olla kirjautuneena sisään.
                      return `/yhteiso_liity`;
                  }
                };
          
                const url = getGroupPage(groupId, userRole);
          
                window.location.href = url;
              } catch (error) {
                console.error('Error fetching group details:', error);
              }
            }
          };

    return (
        <>
            <div style={{ width: '70%', margin: 'auto' }}>
                <h1 style={{'text-align':'center'}}>Yhteisöt</h1>
                {loading ? (
                    <p>Ladataan listaa...</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
                        {groups.map((group) => (
                            //<li key={group.id}>{group.group_name}</li>

                            <li key={group.id}>
                                <div className='luettelo'>
                                    <div className='luettelo_osa leveys50'><h3><a onClick={() => handleGroupClick(group.id)}>{group.group_name}</a></h3></div>
                                    <div className='luettelo_osa'><h4>Luotu: {group.creation_date}</h4></div>
                                    <div className='luettelo_osa'><h4>Jäsenmäärä: {group.members} kpl</h4></div>
                                </div>
                                <hr style={{ width: '100%' }} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}


//<div className='luettelo'>
//<div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
//<div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
//<div className='luettelo_osa leveys30'><h3><a href="yhteiso_liity">Yhteisön nimi (ei pääsyä)</a></h3></div>
//</div>
//<hr style={{ width: '85%' }} />
//<div className='luettelo'>
//<div className='luettelo_osa leveys30'><h3><a href="yhteiso_sivujasen">Yhteisön nimi (pääsy)</a></h3></div>
//<div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
//<div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
//</div>
//<hr style={{ width: '85%' }} />
//<div className='luettelo'>
//<div className='luettelo_osa leveys30'><h3><a href="yhteiso_sivuomistaja">Yhteisön nimi (omistaja)</a></h3></div>
//<div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
//<div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
//</div>
//<hr style={{ width: '85%' }} />
//<div className='luettelo'>
//<div className='luettelo_osa leveys30'><h3>Yhteisön nimi</h3></div>
//<div className='luettelo_osa'><h4>Viimeisin kommentoija: xxx</h4></div>
//<div className='luettelo_osa'><h4>Viimeisin julkaisu 00.00.0000</h4></div>
//</div>
export default Yhteiso;