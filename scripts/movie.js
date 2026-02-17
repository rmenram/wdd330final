const OMDb_API = 'c7cc3081';
const WATCHMODE_API = 'H52AwvPAN05LnDaBvhqUZNxRq2Hi1gfFRjdEJyWQ';
const movieArea = document.getElementById('movie');
const streamArea = document.getElementById('stream');
const TRACKER_KEY = 'movie_tracker';
const QUEUE_KEY = 'movie_queue';

document.addEventListener('DOMContentLoaded', () => {
    // Get movie id from localStorage
    const movieId = localStorage.getItem('movie_id');
    // If movie id exists then perform search
    if (movieId) {
        movieArea.textContent = movieId;
        searchByImdbId(movieId);
        searchWmapiByImdbId(movieId);
    } else {
        movieArea.textContent = 'No movie selected.';
    }
});

// Function to perform the search
async function searchByImdbId(imdbId) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDb_API}&i=${imdbId}`);
        const data = await response.json(); 
        console.log(data);
        if (data.Response === "True") {
            // Display movie details
            movieArea.innerHTML = `
                <img src="${data.Poster}" alt="Movie Poster">
                <div class="movie-details">
                    <h3>${data.Title} (${data.Year})</h3>
                    <p><strong>Rated:</strong> ${data.Rated}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>Runtime:</strong> ${data.Runtime}</p>
                    <div>
                        <button id="watchedMovieBtn">Mark as Watched</button>
                        <button id="queueMovieBtn">Add to Queue</button>
                    </div>
                </div>
            `;
            // Function to add movie, checking for duplicates
            document.getElementById('watchedMovieBtn').addEventListener('click', () => {
                addMovie(TRACKER_KEY, imdbId,data.Title, data.Year, 0, data.Poster)
            });
            // Function to add movie, checking for duplicates
            document.getElementById('queueMovieBtn').addEventListener('click', () => {
                addMovie(QUEUE_KEY, imdbId,data.Title, data.Year, 0, data.Poster)
            });
        } else {
            // movieArea.textContent = `Error: ${data.Error}`;
            movieArea.innerHTML = '<p>No movie found.</p>';
        }
    } catch (error) {
        console.error('Movie error:', error);
        // movieArea.textContent = 'An error occurred while fetching data.';
    }
}

// Function to perform the search
async function searchWmapiByImdbId(imdbId) {
    try {
        const searchField = 'imdb_id';
        const searchValue = imdbId;
        const url = `https://api.watchmode.com/v1/search/?apiKey=${WATCHMODE_API}&search_field=${searchField}&search_value=${encodeURIComponent(searchValue)}`;

        const response = await fetch(url);
        const data = await response.json(); 
        console.log(data);
        // Access the title_results array
        const results = data.title_results;
        if (results && results.length > 0) {
            console.log(results[0].id);
            // streamArea.textContent = results[0].id;
            streamArea.innerHTML = '';
            getStreamingSources(results[0].id);
        } else {
            // movieArea.textContent = `Error: ${data.Error}`;
            streamArea.innerHTML = '<p>No movie found.</p>';
        }
    } catch (error) {
        console.error('Movie error:', error);
        // movieArea.textContent = 'An error occurred while fetching data.';
    }
}

async function getStreamingSources(movieId) {
    const response = await fetch(`https://api.watchmode.com/v1/title/${movieId}/sources/?apiKey=${WATCHMODE_API}`);
    const sources = await response.json();
    console.log(sources);

    const targetRegion = "US";
    const filteredSources = sources.filter(source => source.region === targetRegion);
    console.log(filteredSources);

    filteredSources.forEach(item => {
        const card = document.createElement('div');        
        card.classList.add('stream-card');
        const priceDisplay = item.price ? `$${item.price.toFixed(2)}` : 'Included';
        card.innerHTML = `
            <h3 class="grid-item first">${item.name}</h3>
            <p class="grid-item"><strong>Type:</strong> ${item.type.toUpperCase()}</p>
            <p class="grid-item"><strong>Format:</strong> ${item.format}</p>
            <p class="grid-item"><strong>Price:</strong> ${priceDisplay}</p>
            <a class="grid-item last" href="${item.web_url}" target="_blank">Watch Now</a>
            <p class="grid-item"><strong>Seasons:</strong> ${item.seasons}</p>
            <p class="grid-item"><strong>Episodes:</strong> ${item.episodes}</p>
            <p class="grid-item"><strong>Region:</strong> ${item.region}</p>
        `;
        streamArea.appendChild(card);
    });
}

function getMovies(storage_key) {
    return JSON.parse(localStorage.getItem(storage_key)) || [];
}

function addMovie(storage_key, imdb_id, title, year, ranking, poster) {
    const newMovie = {
        imdbID: imdb_id,
        title: title,
        year: year,
        ranking: ranking,
        poster: poster
    };

    // console.log(newMovie);

    let movies = getMovies(storage_key);

    // Check for duplicates
    if (!movies.some(m => m.imdbID === newMovie.imdbID)) {
        movies.push(newMovie);        
        console.log(movies);
        localStorage.setItem(storage_key, JSON.stringify(movies));
        alert('Movie has been added!');
    } else {
        alert('Movie already exists!');
    }
}
