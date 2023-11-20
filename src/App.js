import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Elokuvasivu from "./elokuvasivun_pohja";
import Etusivu from "./etusivu";
import Footer from "./footer";
import Header from "./header";
import Uutiset from "./uutiset";
import Yhteiso from "./yhteiso";

function App() {
    return (
        <BrowserRouter>
        <div className='start'>
        <Header />

        <Routes>
            <Route path="/" element={<Etusivu/>} />
            <Route path="/elokuvasivu" element={<Elokuvasivu/>} />
            <Route path="/yhteiso" element={<Yhteiso/>} />
            <Route path="/uutiset" element={<Uutiset/>} />
        </Routes>

        <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;