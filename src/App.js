import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Elokuvasivu from "./elokuvasivun_pohja";
import Elokuvat from "./elokuvat";
import Etusivu from "./etusivu";
import Footer from "./footer";
import Header from "./header";
import Info from "./info";
import KirjRek from "./kirjaudurekisteroidy";
import Uutiset from "./uutiset";
import Yhteiso from "./yhteiso";

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
        </Routes>

        <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;