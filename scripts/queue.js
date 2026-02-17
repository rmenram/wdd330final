const STORAGE_KEY = 'movie_queue';
const TRACKER_KEY = 'movie_tracker';

document.addEventListener('DOMContentLoaded', () => {
    renderMovies()
})

function getMovies() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderMovies() {
    const container = document.getElementById('results');
    container.innerHTML = '';
    getMovies().forEach(m => {
        const buttonId = 'watched' + m.imdbID + 'Btn';
        const removeId = 'remove' + m.imdbID + 'Btn';
        container.innerHTML += `
            <div class="movie-card">
                <img src="${m.poster}" alt="Poster">
                <div>
                    <p><strong>${m.title}</strong> (${m.year})</p>
                </div>
                <div>
                    <button id="${buttonId}" title="Click to Mark as Watched" onclick="moveMovie('${m.imdbID}')">✔</button>
                    <br><br>
                    <button id="${removeId}" title="Click to Remove from Queue" onclick="removeMovie('${m.imdbID}')">✘</button>
                </div>
            </div>
        `;     
    });
}

function moveMovie(imdb_id) {
    // console.log(imdb_id);
    let movies = getMovies(STORAGE_KEY);
    const movie = movies.find(m => m.imdbID === imdb_id);
    if (movie) {
        addMovie(TRACKER_KEY, imdb_id, movie.title, movie.year, 0, movie.poster);
    } else {
        alert('Movie is not in the queue!');
    }
    removeMovie(imdb_id);
}

function addMovie(storage_key, imdb_id, title, year, ranking, poster) {
    const newMovie = {
        imdbID: imdb_id,
        title: title,
        year: year,
        ranking: ranking,
        poster: poster
    };

    console.log(newMovie);

    let movies = getMovies(storage_key);

    // Check for duplicates
    if (!movies.some(m => m.imdbID === newMovie.imdbID)) {
        movies.push(newMovie);        
        console.log(movies);
        localStorage.setItem(storage_key, JSON.stringify(movies));
        alert('Movie has been marked as Watched!');
    } else {
        alert('Movie already exists in the Watched list!');
    }
}

function removeMovie(imdb_id) {
    let movies = getMovies(STORAGE_KEY);
    const index = movies.findIndex(item => item.imdbID === imdb_id);
    if (index !== -1) {
        movies.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));        
        alert('Movie has been removed from queue!');
    }
    renderMovies();
}