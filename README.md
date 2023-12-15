<p align="center"><img src="https://github.com/TVT22-22/main/assets/118981440/683fc0a0-c810-4d38-a29d-4d355fb810ef" width="80%" /></p>
<br/>
<p align="center"><a href="/#projektin-kuvaus">Projektin kuvaus</a> • <a href="/#sivuston-ominaisuudet-ja-sisalto">Sivun sisältö</a> • <a href="/#tekniset-ominaisuudet">Tekniset ominaisuudet</a> • <a href="/#projektin-eteneminen">Projektin eteneminen</a> • <a href="/#tyoryhma">Työryhmä</a> • <a href="/#kaytetyt-sovellukset">Linkit</a></p>
<br/>
<p align="center"><b><a href="https://elokuvasivusto-kinokutkuttaja.onrender.com/">Siirry sovellukseen klikkaamalla tästä</a></b></p>

<p align="center"><b><a href="https://youtu.be/g8iscVeMFBc">Demovideo nähtävissä täällä</a></b></p>

<br/>

## Projektin kuvaus
KinoKutkuttaja on **elokuvaharrastajille suunnattu sivusto**. Sivusto mahdollistaa elokuvien haun TMDB:n (The Movie Database) tietokannasta, uutisten hakemisen Finnkinon uutisarkistosta ja erilaisten elokuvaharrastajien ryhmien muodostamisen. Sivustolla voi myös tehdä arvosteluja eri elokuvista ja luoda oman käyttäjätilin. 

Projekti on osa syksyn 2023 opintoja <a href="https://www.oamk.fi/fi/">Oulun Ammattikorkeakoulun</a> Tieto- ja viestintätekniikan opintolinjalla. Tekijät ovat toisen vuoden opiskelijoita. Toteutettu marras-joulukuussa 2023. 

<br/> 

## Käyttöönotto 

Sivusto löytyy osoitteesta https://elokuvasivusto-kinokutkuttaja.onrender.com/. 

Sivusto toimii ilman käyttäjätunnusta, mutta kaikki hyödyt saa irti vain rekisteröitymällä. Rekisteröitymätön kävijä voi selata uutisia, etsiä elokuvia suodatuksilla ja nähdä yhteisöjen nimet. Kirjautuneena käyttäjä pääsee lisäksi liittymään yhteisöihin, tallentaa omia suosikkielokuviaan ja arvostelemaan elokuvia.  

Sivustoa voi käyttää tietokoneella ja mobiililaitteilla. Käyttö vaatii internetyhteyden.

<br/>
<p align="center"><img src="https://github.com/TVT22-22/main/assets/118981440/7a2c40ce-b031-46c7-b952-6b4ba195310e" width="80%" alt="Sivuston responsiivisuus eri laitteilla." />
<br/>Kuva 1. Sovelluksen responsiivisuus.</p>
<br/>

<br/>

## Sivuston ominaisuudet ja sisältö 

**• Käyttäjätilin luonti:** Käyttäjä luo käyttäjätilin, jolla voi tallentaa omat suosikkielokuvat ja elokuvien arvostelut sekä liittyä suljettuihin yhteisöihin. Käyttäjätilin luonti avaa kaikki sivun ominaisuudet käyttöön. 

**• Selaa elokuvia:** Käyttäjä voi hakea elokuvia eri suodatuksilla (_teattereissa, suositut, arvostetuimmat, tulossa, nimihaku_). Aloitusnäkymässä satunnaisia suosittuja elokuvia. 

**• Käyttäjän luomat arvostelut:** Kirjautunut käyttäjä voi arvioida elokuvia asteikolla 1–10. Omat arvostelut tallentuvat käyttäjätilille. 

**• Luo ryhmä:** Käyttäjä voi luoda ryhmän omalla aiheellaan, johon kiinnostuneet käyttäjät voivat liittyä. Ryhmät listataan yhteisösivulle, jonka kautta niitä voi selata ja lähettää liittymispyynnöt. Ryhmään hyväksytyt käyttäjät voivat lisätä ryhmän sivulle uutisia. 

**• Uutiset:** Käyttäjä voi selata Finnkinon elokuvauutisia. 

**• Elokuvien tiedot:** Sisältää elokuvien esittelyt omana sivunaan tärkeimpien tietojen kera (_kuva 2_). Sivu listaa elokuvan nimen, ikärajan, valmistumisvuoden, keston, genret, arviointi IMDB:n mukaan, esittelytekstin, ohjaajan, näyttelijät ja käsikirjoittajat. Lisätietoja elokuvasta saa IMDB:n linkistä. Elokuvan voi lisätä suosikikseen, jolloin se talletetaan käyttäjätilille. Elokuvalle voi lisätä sivuston käyttäjien arviointeja. 

<br/>

## Tekniset ominaisuudet  

### :hammer_and_wrench:  Sovelluksen arkkitehtuuri 
Sivuston frontend luotiin `React.JS`:lla, muotoilut `HTML`:llä ja `CSS`:llä. Backendista vastasi `Node.JS` ja `Express`. Tietokantana toimii `PostgreSQL`. Ulkopuolisina rajapintoina käytettiin The Movie Databasea (TMDB) ja Finnkinon uutisten XML:ää. Tietokanta ja valmis sovellus siirretään Render-pilvipalveluun. Ohjelmointityökaluna käytettiin Visual Studio Codea. Projektin työalustana toimi GitHub. 

 
### :briefcase:  Tietokantarakenne (database schema) 
Tietokannassa on viisi eri taulua: `account`, `customer`, `reviews`, `groups` ja `customer_groups`. Nämä sisältävät kukin erilaisia datatyyppejä. Datatyyppejä ovat mm. `userNick`, `password`, `movieID`, `reviewID` ja `email`. 

 
### :chains:  Rajapintakuvaus (API) 
Elokuvien arvostelusivuston API tarjoaa monipuolisen rajapinnan, joka mahdollistaa käyttäjien hallinnan, elokuvien arvostelut, suosikkielokuvien seurannan ja yhteisöjen luomisen. Se on suunniteltu tarjoamaan käyttäjille mahdollisuuden jakaa elokuvakokemuksiaan, luoda suosikkilistojaan ja osallistua yhteisöihin.

### :key:  Endpointit 

#### Käyttäjätilien hallinta 
|Polku|Kuvaus|
| --- | --- |
| `POST / register` | Luodaan käyttäjätili `usernick, email, password` |
| `POST /login` | Kirjaudutaan sisään `usernick, password` |
| `GET /customer` | Haetaan käyttäjätilin tiedot `usernick, email` |
| `DEL /customer/:usernick` | Poistetaan käyttäjätili, jolle on kirjauduttu |

  

#### Arvostelut 
|Polku|Kuvaus|
| --- | --- |
| `POST /arvostelut` | Luo arvostelun `rating, date, usernick, movieid` |
| `GET /reviews` | Hakee listan arvosteluista usernick perusteella `rating, date, movie id` |
| `GET /reviewsList/:movieid` | Hakee tietyn elokuvan arvostelut movieid perusteella `rating, date, usernick` |

  

#### Suosikki-elokuvat
|Polku|Kuvaus|
| --- | --- |
| `POST /add-to-favorites` | Lisää elokuvan suosikkeihin `user_id, movie_id`|
| `GET /favorites`  | Hakee listan suosikki elokuvista user_id perusteella `movie_id` |

  

#### Yhteisöjen hallinta 
|Polku|Kuvaus|
| --- | --- |
| `POST /group` | Luo yhteisön `group_id, group_name, owner_id, members[], date` |
| `DEL /group` | Poistaa yhteisön, jos ownerin käyttöoikeudet `group_id` |
| `PUT /group` | Lisää jäsenen groupiin `members[userid]`  |
| `DEL /group/:user_id` | Poistaa jäsenen groupista `members[usersid]` |

<br/>

### :sparkles:  Käyttöliittymä- ja käyttäjäkokemussuunnitelma (UI/UX) 

Sivusto koostuu kuudesta pääsivusta, jotka kokoavat toiminnot helposti ymmärrettäväksi paketiksi (_etusivu, info, uutiset, elokuvat, yhteisö, kirjaudu/rekisteröidy_). Sivusto on täysin responsiivinen erikokoisille näytöille tietokoneesta mobiiliin (_kuva 1_). Ulkoasuksi on valittu tummia ja kontrastisia värejä, jotka nostavat elokuvien kuvat ja tekstit pääosaan. Värien haluttiin olevan uniikkeja, ettei sivusto muistuttaisi liikaa vastaavia sivustoja ja sovelluksia.  

Sivusto on suunniteltu käyttäjälähtöisesti mukailemaan vakiintunutta tapaa rakentaa ja käyttää vastaavia sivuja, jolloin käyttäjä osaa navigoida ja löytää etsimänsä vaivattomasti. Sivustosta on pyritty luomaan käyttäjäystävällinen, jolloin siihen ei ole lisätty lainkaan manipuloivia, käyttäjää ohjaavia toimintoja (_esim. klikkauksia kalastelevia lisäsuosituksia_). Sivusto pyrkii viestimään ammattimaisuutta ja luotettavuutta ja edustamaan heti visuaalisesti aihettaan. Käyttäjä ei voi erehtyä joutuneensa muualle kuin elokuvaharrastajien sivulle. 

<br/>
<p align="center"><img src="https://github.com/TVT22-22/main/assets/118981440/f811aed5-41de-4e12-ae30-912adf557003" width="80%" alt="Elokuvasivu, elokuvana Oppenheimer (2023)." /> <br/>Kuva 2. Elokuvasivu. </p>
<br/>

## Projektin eteneminen 

Projektille luotiin **alusta GitHubiin**. Projektiryhmä viesti keskenään WhatsApp-ryhmässä ja Discord-kanavalla. WhatsApp toimi pääkanavana, jossa jaettiin ideoita ja tietoja nopealla aikavälillä. Discordissa pidettiin etäpalaverit, työpäiväkirjaa, projektin muistiota ja tärkeämpien tietojen jakamista. Kommunikointi toimi tehokkaasti ja kaikkia osallistavasti. 

GitHubin **Kanban-tauluun** merkittiin kaikki työvaiheet, joista osallistujat pystyivät varamaan itselleen halutut osat. Käytössä oli kolme taulua: BackLock (_yleinen tehtävälista_), In Progress (_tekijälle varattu tehtävä_) ja Done (_valmis tehtävä tekijätietoineen_). 

Projektin **kesto oli marras-joulukuu 2023**. Saimme projektin aloitettua hyvissä ajoin ja ryhdyimme heti työhön. Perustimme kommunikointikanavat, kokosimme Kanbanin, kirjoitimme dokumentteja, Nico aloitti API-hakujen perustustyöt, Eeva suunnitteli tietokantarakennetta ja Saana kokosi käyttöliittymäsuunnitelman. Saana kokosi ensimmäisenä UI:n pohjalta frontendin ja sen toiminnallisuudet, johon muiden oli helpompi jatkaa. Eeva teki samaan aikaan backendia ja tietokantaa, ja Nico sairasti koronaa. Tietokannan valmistuttua Nico pääsi jatkamaan backendin parissa ja he kokosivat yhteistyössä sen kokonaan. 

Projektiin suoritettiin testaukset onnistuneesti (_käyttäjätilin rekisteröinti, kirjautuminen ja poistaminen, käyttäjätilin ja yhteisöjen testaus_). Sivusto julkaistiin Render-pilvipalveluun aikataulussa ja palautettiin arvioitavaksi. 

<br/>

## Työryhmä 

| Tekijä | Kuvaus |
| :---------------: | --- |
| [<img src="https://github.com/NicoJstudent.png" width="150px;"/><br /><sub><a href="https://github.com/NicoJstudent">NICO JOKELAINEN</a></sub>](https://github.com/NicoJstudent) | - Pohjakoodit Finnkinon ja TMDB (The movie database) API:n käyttöön <br> - Käyttäjätilien hallinta (endpointit, tilin luominen, kirjautuminen ja tilinpoisto) <br>- Tietyn sisällön piilottaminen kirjautumisen taakse (autentikaatio) <br>- Yhteisöt (endpointit, yhteisön luominen, jäsenten lisääminen ja poistaminen) <br> - Arvostelut (endpointit ja listaus) |
| [<img src="https://github.com/saanalapinkangas.png" width="150px;"/><br /><sub><a href="https://github.com/saanalapinkangas">SAANA LAPINKANGAS</a></sub>](https://github.com/saanalapinkangas) | - Koko frontend, UI/UX-kokonaisuus suunnittelusta toteutukseen (React, HTML, CSS) <br> - Elokuva-sivu (sisältötietojen haku ja sijoittelu API:n kautta, arvosteluiden tähdet) <br> - Elokuvien selaus (suodattimet ja niiden näkymä, tekstihaku, aloitusnäkymä) <br> - Uutiset <br> - Responsiivisuus <br> - UI-dokumentaatio ja Mockup, REST-dokumentaatio |
| [<img src="https://github.com/EevaKR.png" width="150px;"/><br /><sub><a href="https://github.com/EevaKR">EEVA RONTTI</a></sub>](https://github.com/EevaKR) | - Projektinvetäjä <br> - Postgre-tietokannan luonti Render-palvelussa <br> - Tietokannan rakentaminen Postgre-ohjelmassa <br> - Server.js-, group.js-, register.js-, login.js- ja review.js-tiedostojen luonti <br> - Database-yhteyden luonti <br> - ER-kaavion luonti, API-dokumentaatio |

<br/>

## Käytetyt sovellukset
<a href="https://render.com/"><img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_477db83f729d63210139ec7cd29c1351/render-render.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://www.postgresql.org/"><img src="https://www.postgresqltutorial.com/wp-content/uploads/2012/08/What-is-PostgreSQL.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://www.postman.com/"><img src="https://mms.businesswire.com/media/20230322005274/en/761650/23/postman-logo-vert-2018.jpg" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://react.dev/"><img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/react_original_wordmark_logo_icon_146375.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://nodejs.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://code.visualstudio.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://adobe.com"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/1200px-Adobe_XD_CC_icon.svg.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://www.themoviedb.org/"><img src="https://github.com/TVT22-22/main/assets/118981440/b3526374-6d50-4979-8d3f-7ec3c3511f34" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://www.finnkino.fi/"><img src="https://upload.wikimedia.org/wikipedia/fi/thumb/e/e0/Finnkino_logo_2022.png/1200px-Finnkino_logo_2022.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://www.imdb.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" height="30px;" /></a>
<a href="https://moodle.oulu.fi/"><img src="https://blogs.helsinki.fi/moodle-news/files/2017/06/Moodlelogo.png" height="25px;" /></a> &nbsp;&nbsp;
<a href="https://github.com/"><img src="https://foundations.projectpythia.org/_images/GitHub-logo.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://www.whatsapp.com/?lang=fi_FI"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" height="40px;" /></a> &nbsp;&nbsp;
<a href="https://discord.com/"><img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" height="30px;" /></a>
