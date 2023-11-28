import React, { useEffect, useState } from 'react';
import './App.css';
import './monikkotyylit.css';

const Uutiset = () => {
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
            const htmlLead = showElement.getElementsByTagName('HTMLLead')[0].textContent;
            const htmlContent = showElement.getElementsByTagName('HTMLContent')[0].textContent;
            const imageURL = showElement.getElementsByTagName('ImageURL')[0].textContent;
            const articleURL = showElement.getElementsByTagName('ArticleURL')[0].textContent;

            filteredNews.push({
                title,
                publishDate,
                htmlLead,
                htmlContent,
                imageURL,
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
    <>
        <div className='section'>
            <h1>Uutiset</h1>
            <UutisetLista newsArticles={newsArticles}/>
        </div>
    </>
);
};


const UutisetLista  = ({newsArticles}) => {
    function dateTrim(date) {       //Poistaa päivämäärästä kellonajan
        return date.split('T')[0].replace(/-/g, '.');
    }
    function removeWord(text) {     //Poistaa sanan "Leffauutiset:" otsikosta
        return text.replace(/Leffauutiset:/, '');
    }

    return (
        <>
        {newsArticles?.map((article, index) => (
        <div className='uutiset' key={index}>
            <div className='uutiset_kuva'><a href={article.articleURL} target="_blank" rel="noopener noreferrer"><img className="uutiskuva" src={article.imageURL} alt={article.title}/></a></div>
            <div><a href={article.articleURL} target="_blank" rel="noopener noreferrer"><h3>{removeWord(article.title)}</h3></a></div>
            <div className='uutiset_info'><h4>{dateTrim(article.publishDate)}</h4></div>
        </div>
        ))}
        </>
    );
}

export default Uutiset;
