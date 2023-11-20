import React from 'react';
import './App.css';
import Elokuvasivu from "./elokuvasivun_pohja";

const Moviepage = () => {
    return (
        <>
            <div className='section'>
            <Elokuvasivu />
            </div>
        </>
    )
};

export default Moviepage;