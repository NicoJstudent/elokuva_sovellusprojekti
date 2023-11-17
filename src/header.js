// Header

import React, { useState } from 'react';
import './header.css';
import logo from './images/logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

// Linkit puuttuvat
// Kirjaudu / Rekisteröidy -nappi tarvitsee linkin ja tekstimuunnoksen kun kirjauduttu

    return (
        <nav className="navigation">
            <div className="logo"><img src={logo} alt="" /></div>
            <div className={`links ${isOpen ? 'open' : ''}`}>
                <a href="#" className="nav">Etusivu</a>
                <a href="#" className="nav">Info</a>
                <a href="#" className="nav">Uutiset</a>
                <a href="#" className="nav">Elokuvat</a>
                <a href="#" className="nav">Yhteisö</a>
                <a href="#"><button className="btn_kirjaudu">Kirjaudu / Rekisteröidy</button></a>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <i class="fa fa-bars"></i>
            </div>
        </nav>
    );
};

export default Header;