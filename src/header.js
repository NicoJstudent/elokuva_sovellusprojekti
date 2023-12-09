// Header

import React, { useState } from 'react';
import './header.css';
import logo from './images/logo.png';
import isAuthenticated from './isAuthenticated';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleButtonClick = () => {
        if (isAuthenticated()) {
            window.location.href = '/kayttaja';
        } else {
            window.location.href = '/kirjaudurekisteroidy';
        }
    };
// Kirjaudu / Rekisteröidy -nappi tarvitsee linkin ja tekstimuunnoksen kun kirjauduttu

    return (
        <nav className="navigation">
            <div className="logo"><a href="/"><img src={logo} alt="Logo." /></a></div>
            <div className={`links ${isOpen ? 'open' : ''}`}>
                <a href="/" className="nav">Etusivu</a>
                <a href="/info" className="nav">Info</a>
                <a href="/uutiset" className="nav">Uutiset</a>
                <a href="/elokuvat" className="nav">Elokuvat</a>
                <a href="/yhteiso" className="nav">Yhteisö</a>
                <a href="#" onClick={handleButtonClick}><button className="btn_kirjaudu">{isAuthenticated() ? 'Hallintapaneeli' : 'Kirjaudu / Rekisteröidy'}</button></a>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <i class="fa fa-bars"></i>
            </div>
        </nav>
    );
};

export default Header;