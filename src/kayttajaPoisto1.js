import './App.css';
import './monikkotyylit.css';
//import React, { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

const KayttajaPoisto1 = () => {
    return (
        <>
            <div className='section'>
                <h1>Oletko varma, että haluat poistaa käyttäjätunnuksesi?</h1>
                <h2>Poistettua tunnusta ei voida palauttaa</h2>
                </div>
                <div className='section'>
                <TilinpoistoButtonit />
            </div>
        </>
    );
};

const TilinpoistoButtonit = () => {
    const handleAccountDelete = async () => {
        try {
            const usernick = localStorage.getItem('usernick'); 
            const response = await axios.delete(`/customer/${usernick}`);
      
            if (response.data.success) {
              console.log('Account deleted successfully');
              localStorage.removeItem('usernick');
              localStorage.removeItem('token');
              window.location.href = '/kayttajaPoisto2';

            } else {
              console.error('Account deletion failed:', response.data.message);
              // Tähän error message jos halutaan näyttää sivustolla
            }
          } catch (error) {
            console.error('Error during account deletion:', error.message);
          }
    };

    const handleRegret = async () => {
        window.location.href = '/kayttaja';
    };

    return (
    <>
    <div className='luettelo leveys70'>
    <button className='yleinen_btn levea sininen' onClick={handleRegret}>Ei, haluan pitää käyttäjätunnukseni</button>
    <button className='yleinen_btn levea punainen' onClick={handleAccountDelete}>Kyllä, poista käyttäjätunnus</button>
    </div>
    </>
    )
}

export default KayttajaPoisto1;