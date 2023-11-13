const listAmount = 10;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTI5MjQ1MGRjMDAzNTEwMjMzZWY3NDVmOWJkNWFhMiIsInN1YiI6IjY1NDhkMzI2ZDhjYzRhMDBlM2NjOTJkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pinVZ6Vu_Dy5u-YOpXG60nUsEssui8GV8TpBwEozhdE'
    }
};

function testAuthentication() {
    fetch('https://api.themoviedb.org/3/authentication', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

//    ---saatu data tässä muodossa---
//
//    adult: false,
//    backdrop_path: '/8KJMOKyl9rpgb9ELEwhfBMIaTHw.jpg',
//    genre_ids: [Array],
//    id: 1139087,
//    original_language: 'en',
//    original_title: 'Once Upon a Studio',
//    overview: '',
//    popularity: 291.332,
//    poster_path: '/hr8ZtwdbtjBquxlTCrczr685K5T.jpg',
//    release_date: '2023-09-24',
//    title: 'Once Upon a Studio',
//    video: false,
//    vote_average: 8.5,
//    vote_count: 225



function getToprated() {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fi-FI&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200', options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            if (data.results && Array.isArray(data.results)) {
                data.results.forEach(movie => {
                    console.log(
                        '---\n',
                        '\n Elokuva:',movie.title,'\n',
                        'ID:',movie.id,'\n',
                        'Arvosana:',movie.vote_average,'\n',
                        //'Kuvaus:',movie.overview,'\n',
                        'Julkaistu:',movie.release_date,'\n',
                        'Kieli:',movie.original_language,'\n',
                        'genre_ids:',movie.genre_ids,'\n',
                        'genre_ids:',getGenreID(movie.genre_ids),'\n',
                        );
                });
            }
        })
        .catch(error => {
            console.error(err);
        });


    //.then(response => response.json())
    //.then(response => console.log(response))
    //.catch(err => console.error(err));

}

function getGenreID() {
    const 
    fetch('https://api.themoviedb.org/3/genre/movie/list', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .catch(err => console.error(err));
    return 'action';
}

//getGenreID();
getToprated();
//testAuthentication();