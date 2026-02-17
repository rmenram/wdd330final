const STORAGE_KEY = 'movie_tracker';

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
        const removeId = 'remove' + m.imdbID + 'Btn';
        container.innerHTML += `
            <div class="movie-card">
                <img src="${m.poster}" alt="Poster">
                <div>
                    <p><strong>${m.title}</strong> (${m.year})</p>
                </div>
                <div>
                    <button id="${removeId}" title="Click to Remove from Watched list" onclick="removeMovie('${m.imdbID}')">✘</button>
                </div>
            </div>
        `;
    });
}

function removeMovie(imdb_id) {
    let movies = getMovies(STORAGE_KEY);
    const index = movies.findIndex(item => item.imdbID === imdb_id);
    if (index !== -1) {
        movies.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));        
        alert('Movie has been removed from Watched list!');
    }
    renderMovies();
}