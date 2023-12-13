import './App.css';
import './monikkotyylit.css';

const Info = () => {
    return (
        <>
            <div className='section'>
                <h1>Info</h1>
                <p className="esittelytxt">KinoKutkuttaja on projektityö Oulun Ammattikorkeakoulun Tieto- ja Viestintätekniikan koulutusohjelmaan syksylle 2023. Tekijät ovat toisen vuoden opiskelijoita.</p>
                <div style={{width:'70%'}}>
                <h5>Projektista</h5>
                <p>KinoKutkuttaja on elokuvaharrastajille suunnattu sivusto. Sivusto mahdollistaa elokuvien haun TMDB:n (The Movie Database) tietokannasta, uutisten hakemisen Finnkinon uutisarkistosta ja erilaisten elokuvaharrastajien ryhmien muodostamisen. Sivustolla voi myös tehdä arvosteluja eri elokuvista ja luoda oman käyttäjätilin.</p>
                <p>Sivuston arkkitehtuuri koostuu seuraavista: React, Node, PostgreSQL, Render.</p>
                <h5>Tekijät</h5>
                <p>
                <ul><li>Nico Jokelainen</li>
                <li>Saana Lapinkangas</li>
                <li>Eeva Rontti</li></ul></p>
                
                <h5>Kiinnostuitko?</h5>
                    <p><a href="https://github.com/TVT22-22/main" target="_blank" rel="noopener noreferrer">Lue lisää GitHubin READMe-osiosta</a></p>
                </div>
            </div>
        </>
    );
};

export default Info;