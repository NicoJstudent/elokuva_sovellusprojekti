import React, { useEffect, useState } from 'react';
import logo from './images/logopieni.png';
import './kollaasi.css';

const Kollaasi = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const { DOMParser } = require('xmldom');

useEffect(() => {
    const fetchDataAndParse = async () => {
    try {
        const response = await fetch('https://www.finnkino.fi/xml/News/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const showElements = xmlDoc.getElementsByTagName('NewsArticle');

        const filteredNews = [];
        for (let index = 0; index < showElements.length; index++) {       //"showElements.length" indeksiin hakutuloksien määrä
            const showElement = showElements[index];
            const categoryElement = showElement.getElementsByTagName('NewsArticleCategory')[0];

            if (categoryElement) {
                const categoryID = categoryElement.getElementsByTagName('ID')[0].textContent;
            
            if (categoryID === '1079') {
            const title = showElement.getElementsByTagName('Title')[0].textContent;
            const publishDate = showElement.getElementsByTagName('PublishDate')[0].textContent;
            const articleURL = showElement.getElementsByTagName('ArticleURL')[0].textContent;

            filteredNews.push({
                title,
                publishDate,
                articleURL,
            });
            }
        }
    }
    setNewsArticles(filteredNews);
    } catch (error) {
        console.error('Error fetching and parsing XML data:', error);
    }
};
fetchDataAndParse();
}, []);

    return (
        <div className='kolmen_kollaasi'>

            <div className='kollaasi_osa'>
                <Kollaasi_uutiset newsArticles={newsArticles} />
            </div>

            <div className='kollaasi_osa'>
                <Kollaasi_info />
            </div>

        </div>
    );
    
}

const Kollaasi_logo = () => {
    return (
        <div className='kollaasityylit'>
        <img src={logo} alt="logo"/>
        </div>
    );
}

const Kollaasi_uutiset = ({newsArticles}) => {
    function dateTrim(date) {       //Poistaa päivämäärästä kellonajan
        return date.split('T')[0].replace(/-/g, '.');
    }
    function removeWord(text) {     //Poistaa sanan "Leffauutiset:" otsikosta
        return text.replace(/Leffauutiset:/, '');
    }
    const limitedNews = newsArticles.slice(0, 3);

    return (
        <div className='kollaasityylit'>
        <h2>Viimeisimmät uutiset</h2>
        <>
        {limitedNews?.map((article, index) => (
        <div key={index}>
            <div><a href={article.articleURL} target="_blank" rel="noopener noreferrer"><h4>{removeWord(article.title)}</h4></a></div>
            <div><h3>{dateTrim(article.publishDate)}</h3></div>
            <hr />
        </div>
        ))}</>
        </div>
    );
}

const Kollaasi_info = () => {
    return (
        <>
            <h2>Info</h2>
            <p>KinoKutkuttaja on projektityö Oulun Ammattikorkeakoulun Tieto- ja viestintätekniikan 2. vuoden opiskelijoilta. Aiheena web-ohjelmoinnin sovellusprojekti. Toteutettu syksyllä 2023.</p>
            <p>Tekijät:</p>
            <ul><li>Jokelainen Nico</li>
                <li>Lapinkangas Saana</li>
                <li>Rontti Eeva</li></ul>
            <p>Lisätietoja:<br />
            <a href="/info">Lue lisää projektista ja tekijöistä</a><br/>
            <a href="https://github.com/TVT22-22/main" target="_blank" rel="noopener noreferrer">Koodit GitHubissa</a></p>
        </>
    );
}

export default Kollaasi;