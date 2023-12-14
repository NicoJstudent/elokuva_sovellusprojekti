<img src="https://github.com/TVT22-22/main/assets/118981440/683fc0a0-c810-4d38-a29d-4d355fb810ef" width="700px" align="center" />

<h1 align="center">KINOKUTKUTTAJA</h1>
<p align="center">Sivusto elokuvaharrastajille</p>

Sovelluksen demo
väliotsikot

demovideo tähän

## Projektin kuvaus
KinoKutkuttaja on elokuvaharrastajille suunnattu sivusto. Sivusto mahdollistaa elokuvien haun TMDB:n (The Movie Database) tietokannasta, uutisten hakemisen Finnkinon uutisarkistosta ja erilaisten elokuvaharrastajien ryhmien muodostamisen. Sivustolla voi myös tehdä arvosteluja eri elokuvista ja luoda oman käyttäjätilin. 

Projekti on osa syksyn 2023 opintoja Oulun Ammattikorkeakoulun Tieto- ja viestintätekniikan opintolinjalla. Tekijät ovat toisen vuoden opiskelijoita. Toteutettu marras-joulukuussa 2023. 

 
## Käyttöönotto 

Sivusto löytyy osoitteesta https://kinokutkuttaja.onrender.com. 

Sivusto toimii ilman käyttäjätunnusta, mutta kaikki hyödyt saa irti vain rekisteröitymällä. Rekisteröitymätön kävijä voi selata uutisia, etsiä elokuvia suodatuksilla ja nähdä yhteisöjen nimet. Kirjautuneena käyttäjä pääsee lisäksi liittymään yhteisöihin, tallentaa omia suosikkielokuviaan ja arvostelemaan elokuvia.  

Sivustoa voi käyttää tietokoneella ja mobiililaitteilla. Käyttö vaatii internetyhteyden.

![kinokutkuttaja_mockup1-cropped](https://github.com/TVT22-22/main/assets/118981440/7a2c40ce-b031-46c7-b952-6b4ba195310e)
Kuva 1. Sovelluksen responsiivisuus.

## Sivuston ominaisuudet ja sisältö 

**Käyttäjätilin luonti:** Käyttäjä luo käyttäjätilin, jolla voi tallentaa omat suosikkielokuvat ja elokuvien arvostelut sekä liittyä suljettuihin yhteisöihin. Käyttäjätilin luonti avaa kaikki sivun ominaisuudet käyttöön. 

**Selaa elokuvia:** Käyttäjä voi hakea elokuvia eri suodatuksilla (teattereissa, suositut, arvostetuimmat, tulossa, nimihaku). Aloitusnäkymässä satunnaisia suosittuja elokuvia. 

**Käyttäjän luomat arvostelut:** Kirjautunut käyttäjä voi arvioida elokuvia asteikolla 1–10. Omat arvostelut tallentuvat käyttäjätilille. 

**Luo ryhmä:** Käyttäjä voi luoda ryhmän omalla aiheellaan, johon kiinnostuneet käyttäjät voivat liittyä. Ryhmät listataan yhteisösivulle, jonka kautta niitä voi selata ja lähettää liittymispyynnöt. Ryhmään hyväksytyt käyttäjät voivat lisätä ryhmän sivulle uutisia. 

**Uutiset:** Käyttäjä voi selata Finnkinon elokuvauutisia. 

**Elokuvien tiedot:** Sisältää elokuvien esittelyt omana sivunaan tärkeimpien tietojen kera (kuva 2). Sivu listaa elokuvan nimen, ikärajan, valmistumisvuoden, keston, genret, arviointi IMDB:n mukaan, esittelytekstin, ohjaajan, näyttelijät ja käsikirjoittajat. Lisätietoja elokuvasta saa IMDB:n linkistä. Elokuvan voi lisätä suosikikseen, jolloin se talletetaan käyttäjätilille. Elokuvalle voi lisätä sivuston käyttäjien arviointeja. 

## Tekniset ominaisuudet  

### Sovelluksen arkkitehtuuri 
Sivuston frontend luotiin React.JS:lla, muotoilut HTML:llä ja CSS:llä. Backendista vastasi Node.JS ja Express. Tietokantana toimii PostgreSQL. Ulkopuolisina rajapintoina käytettiin The Movie Databasea (TMDB) ja Finnkinon uutisten XML:ää. Tietokanta ja valmis sovellus siirretään Render-pilvipalveluun. Ohjelmointityökaluna käytettiin Visual Studio Codea. Projektin työalustana toimi GitHub. 

 
### Tietokantarakenne (database schema) 
Tietokannassa on viisi eri taulua, account, customer, reviews, groups ja customer_groups. Nämä sisältävät kukin erilaisia datatyyppejä. Datatyyppejä ovat mm. userNick, password, movieID, reviewID ja email. 
* tietokannasta kuva? 

 
### Rajapintakuvaus (API) 
Elokuvien arvostelusivuston (KinoKutkuttaja) API tarjoaa monipuolisen rajapinnan, joka mahdollistaa käyttäjien hallinnan, elokuvien arvostelut, suosikkielokuvien seurannan ja yhteisöjen luomisen. Se on suunniteltu tarjoamaan käyttäjille mahdollisuuden jakaa elokuvakokemuksiaan, luoda suosikkilistojaan ja osallistua yhteisöihin.

### Endpointit 

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


## Käyttöliittymä- ja käyttäjäkokemussuunnitelma (UI/UX) 

Sivusto koostuu kuudesta pääsivusta, jotka kokoavat toiminnot helposti ymmärrettäväksi paketiksi (etusivu, info, uutiset, elokuvat, yhteisö, kirjaudu/rekisteröidy). Sivusto on täysin responsiivinen erikokoisille näytöille tietokoneesta mobiiliin (kuva 1). Ulkoasuksi on valittu tummia ja kontrastisia värejä, jotka nostavat elokuvien kuvat ja tekstit pääosaan. Värien haluttiin olevan uniikkeja, ettei sivusto muistuttaisi liikaa vastaavia sivustoja ja sovelluksia.  

Sivusto on suunniteltu käyttäjälähtöisesti mukailemaan vakiintunutta tapaa rakentaa ja käyttää vastaavia sivuja, jolloin käyttäjä osaa navigoida ja löytää etsimänsä vaivattomasti. Olemme pyrkineet luomaan käyttäjäystävällisen sivuston, jolle ei ole luotu lainkaan manipuloivia, käyttäjää ohjaavia toimintoja (esim. klikkauksia kalastelevia lisäsuosituksia). Sivusto pyrkii viestimään ammattimaisuutta ja luotettavuutta ja edustamaan heti visuaalisesti aihettaan. Käyttäjä ei voi erehtyä joutuneensa muualle kuin elokuvaharrastajien sivulle. 

![kinokutkuttaja_mockup2](https://github.com/TVT22-22/main/assets/118981440/f811aed5-41de-4e12-ae30-912adf557003)
Kuva 2. Elokuvasivu.

## Projektin eteneminen 

Projektille luotiin alusta GitHubiin. Projektiryhmä viesti keskenään WhatsApp-ryhmässä ja Discord-kanavalla. WhatsApp toimi pääkanavana, jossa jaettiin ideoita ja tietoja nopealla aikavälillä. Discordissa pidettiin etäpalaverit, työpäiväkirjaa, projektin muistiota ja tärkeämpien tietojen jakamista. Kommunikointi toimi tehokkaasti ja kaikkia osallistavasti. 

GitHubin Kanban-tauluun merkittiin kaikki työvaiheet, joista osallistujat pystyivät varamaan itselleen halutut osat. Käytössä oli kolme taulua: BackLock (yleinen tehtävälista), In Progress (tekijälle varattu tehtävä) ja Done (valmis tehtävä tekijätietoineen). 

Projektin kesto oli marras-joulukuu 2023. Saimme projektin aloitettua hyvissä ajoin ja ryhdyimme heti työhön. Perustimme kommunikointikanavat, kokosimme Kanbanin, kirjoitimme dokumentteja, Nico aloitti API-hakujen perustustyöt, Eeva suunnitteli tietokantarakennetta ja Saana kokosi käyttöliittymäsuunnitelman. Saana kokosi ensimmäisenä UI:n pohjalta frontendin ja sen toiminnallisuudet, johon muiden oli helpompi jatkaa. Eeva teki samaan aikaan backendia ja tietokantaa, ja Nico sairasti koronaa. Tietokannan valmistuttua Nico pääsi jatkamaan backendin parissa ja he kokosivat yhteistyössä sen kokonaan. 

Projektiin suoritettiin testaukset onnistuneesti (käyttäjätilin rekisteröinti, kirjautuminen ja poistaminen, käyttäjätilin ja yhteisöjen testaus). Sivusto julkaistiin Render-pilvipalveluun aikataulussa ja palautettiin arvioitavaksi. 

 
## Työryhmä 

| Tekijä | Kuvaus |
| :---------------: | --- |
| [<img src="https://github.com/NicoJstudent.png" width="150px;"/><br /><sub><a href="https://github.com/NicoJstudent">NICO JOKELAINEN</a></sub>](https://github.com/NicoJstudent) | - Pohjakoodit Finnkinon ja TMDB (The movie database) API:n käyttöön <br> - Käyttäjätilien hallinta (endpointit, tilin luominen, kirjautuminen ja tilinpoisto) <br>- Tietyn sisällön piilottaminen kirjautumisen taakse (autentikaatio) <br>- Yhteisöt (endpointit, yhteisön luominen, jäsenten lisääminen ja poistaminen) <br> - Arvostelut (endpointit ja listaus) |
| [<img src="https://github.com/saanalapinkangas.png" width="150px;"/><br /><sub><a href="https://github.com/saanalapinkangas">SAANA LAPINKANGAS</a></sub>](https://github.com/saanalapinkangas) | - Koko frontend, UI/UX-kokonaisuus suunnittelusta toteutukseen (React, HTML, CSS) <br> - Elokuva-sivu (sisältötietojen haku ja sijoittelu API:n kautta, arvosteluiden tähdet) <br> - Elokuvien selaus (suodattimet ja niiden näkymä, tekstihaku, aloitusnäkymä) <br> - Uutiset <br> - Responsiivisuus <br> - UI-dokumentaatio ja Mockup, REST-dokumentaatio |
| [<img src="https://github.com/EevaKR.png" width="150px;"/><br /><sub><a href="https://github.com/EevaKR">EEVA RONTTI</a></sub>](https://github.com/EevaKR) | - Projektinvetäjä <br> - Postgre-tietokannan luonti Render-palvelussa <br> - Tietokannan rakentaminen Postgre-ohjelmassa <br> - Server.js-, group.js-, register.js-, login.js- ja review.js-tiedostojen luonti <br> - Database-yhteyden luonti <br> - ER-kaavion luonti, API-dokumentaatio |

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



