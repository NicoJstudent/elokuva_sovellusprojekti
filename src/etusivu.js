import React from 'react';
import './App.css';
import Ajankohtaista from './ajankohtaista';
import Kollaasi from './kollaasi';
import Elokuvat_etusivulla from './oletko-jo-tutustunut-naihin';

function Etusivu() {
  return (
    <>
    <div className='section'>
      <h1>Ajankohtaista juuri nyt</h1>
      <Ajankohtaista />
    </div>

    <div className='section'>
      <h1>Oletko jo tutustunut näihin?</h1>
      <p>filtterit tähän? ulkonäöllisesti, toimintaehdotukset koodissa</p>
      <Elokuvat_etusivulla />
    </div>
    <Kollaasi />
    </>
  );
}

export default Etusivu;