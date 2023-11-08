const { DOMParser } = require('xmldom');
const moment = require('moment');   //date formaatin muuttamiseen

async function fetchDataAndParse() {
    try {
        const response = await fetch('https://www.finnkino.fi/xml/News/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const showElements = xmlDoc.getElementsByTagName('NewsArticle');

        for (let index = 0; index < 5; index++) {       //"showElements.length" indeksiin hakutuloksien määrä
            const showElement = showElements[index];
            const title = showElement.getElementsByTagName('Title')[0].textContent;
            const date = showElement.getElementsByTagName('PublishDate')[0].textContent;
            const articleURL = showElement.getElementsByTagName('ArticleURL')[0].textContent;
            const imgURL = showElement.getElementsByTagName('ImageURL')[0].textContent;
            const thumbnailURL = showElement.getElementsByTagName('ThumbnailURL')[0].textContent;

            console.log(`Uutinen ${index + 1}:`);  //Listauksen numero logia varten
            console.log('Title:', title);
            console.log('Päivämäärä:', dateTrim(date));
            console.log('Artikkeli:', articleURL);
            console.log('Kuva:', imgURL);
            console.log('Thumbnail:', thumbnailURL);
            console.log('---');
        }
    } catch (error) {
        console.error('Error fetching and parsing XML data:', error);
    }
}

function dateTrim(date) {           
    return moment(date).format('DD.MM.YYYY');     //palauttaa päivämäärän muodossa DD.MM.YYYY   
    //return date.split('T')[0];                  //pelkästään kellon erottamiseen 
}

fetchDataAndParse();
