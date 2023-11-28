import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Elokuvasivu from "./elokuvasivun_pohja";
import Elokuvat from "./elokuvat";
import Etusivu from "./etusivu";
import Footer from "./footer";
import Header from "./header";
import Info from "./info";
import Kayttaja from "./kayttaja";
import KayttajaPoisto1 from "./kayttajaPoisto1";
import KayttajaPoisto2 from "./kayttajaPoisto2";
import KirjRek from "./kirjaudurekisteroidy";
import Uutiset from "./uutiset";
import Yhteiso from "./yhteiso";
import YhteisoEroa1 from "./yhteiso_eroa1";
import YhteisoEroa2 from "./yhteiso_eroa2";
import YhteisoHallintapaneeli from "./yhteiso_hallintapaneeli";
import YhteisoLiity from "./yhteiso_liity";
import YhteisoJasensivu from "./yhteiso_sivuJasen";
import YhteisoOmistajasivu from "./yhteiso_sivuOmistaja";

function App() {
    return (
        <BrowserRouter>
        <div className='start'>
        <Header />

        <Routes>
            <Route path="/" element={<Etusivu/>} />
            <Route path="/elokuvasivu/:id" element={<Elokuvasivu/>} />
            <Route path="/yhteiso" element={<Yhteiso/>} />
            <Route path="/uutiset" element={<Uutiset/>} />
            <Route path="/info" element={<Info/>} />
            <Route path="/elokuvat" element={<Elokuvat/>} />
            <Route path="/kirjaudurekisteroidy" element={<KirjRek/>} />
            <Route path="/kayttaja" element={<Kayttaja/>}/>
            <Route path="/kayttajaPoisto1" element={<KayttajaPoisto1/>}/>
            <Route path="/kayttajaPoisto2" element={<KayttajaPoisto2/>}/>
            <Route path="/yhteiso_liity" element={<YhteisoLiity/>}/>
            <Route path="/yhteiso_sivuJasen" element={<YhteisoJasensivu/>}/>
            <Route path="/yhteiso_sivuOmistaja" element={<YhteisoOmistajasivu/>}/>
            <Route path="/yhteiso_hallintapaneeli" element={<YhteisoHallintapaneeli/>}/>
            <Route path="yhteiso_eroa1" element={<YhteisoEroa1/>}/>
            <Route path="yhteiso_eroa2" element={<YhteisoEroa2/>}/>
        </Routes>

        <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;