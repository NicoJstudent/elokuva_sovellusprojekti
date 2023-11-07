const { DOMParser } = require('xmldom');

async function fetchDataAndParse() {
    try {
        const response = await fetch('https://www.finnkino.fi/xml/Schedule/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const showElements = xmlDoc.getElementsByTagName('Show');

        for (let index = 0; index < 5; index++) {       //"showElements.length" indeksiin hakutuloksien määrä
            const showElement = showElements[index];
            const title = showElement.getElementsByTagName('Title')[0].textContent;
            const release = showElement.getElementsByTagName('dtLocalRelease')[0].textContent;
            const rating = showElement.getElementsByTagName('Rating')[0].textContent;
            const theatre = showElement.getElementsByTagName('Theatre')[0].textContent;
            const length = showElement.getElementsByTagName('LengthInMinutes')[0].textContent;
            const ShowURL = showElement.getElementsByTagName('ShowURL')[0].textContent;
            const showImage = showElement.getElementsByTagName('EventMediumImagePortrait')[0].textContent;  //Small, Medium, Large, kuvien kokoihin

            console.log(`Show ${index + 1}:`);  //Listauksen numero logia varten
            console.log('Title:', title);
            console.log('Ensi-ilta:', dateTrim(release));
            console.log('Rating:', rating);
            console.log('Theatre:', theatre);
            console.log('Length:', length + ' min');
            console.log('ShowURL:', ShowURL);
            console.log('ShowImage:', showImage);
            console.log('---');
        }
    } catch (error) {
        console.error('Error fetching and parsing XML data:', error);
    }
}

function dateTrim(date) {       //Poistaa päivämäärästä kellonajan
    return date.split('T')[0];
}

fetchDataAndParse();
