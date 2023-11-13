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



function getToprated() {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fi-FI&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200', options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();

        })
        .then(data => {                   
            if (data.results && Array.isArray(data.results)) {
                data.results.forEach(movie => {
                    console.log(movie.title);
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

getToprated();
//testAuthentication();