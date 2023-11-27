import React from 'react';
import './App.css';
//import Ajankohtaista from './ajankohtaista';
import Kollaasi from './kollaasi';
import { Ajankohtaista, OletkoTutustunut } from './mediacards';

function Etusivu() {
  return (
    <>
    <div className='section'>
      <h1>Ajankohtaista juuri nyt</h1>
      <Ajankohtaista />
    </div>

    <div className='section'>
      <h1>Oletko jo tutustunut näihin?</h1>
      <OletkoTutustunut />
    </div>
    <Kollaasi />
    </>
  );
}

export default Etusivu;