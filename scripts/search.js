const OMDb_API = 'c7cc3081';
const resultsArea = document.getElementById('results');
document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    resultsArea.innerHTML = 'Loading...';
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDb_API}&s=${query}`);
        if (!response.ok) throw new Error("Failed to load search results");
        const data = await response.json();
        console.log(data.Search);
        resultsArea.innerHTML = '';
        if (data.Response === "True") {
            buildCards(data);
        } else {
            resultsArea.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error("Search Error:", error);
    }
});

function buildCards(data) {
    data.Search.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.dataset.movie_id = movie.imdbID;
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'images/placeholder.webp'}" alt="${movie.Title} Poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        // Add click event listener to the card
        movieCard.addEventListener('click', (event) => {
            // Handling nested elements
            const cardElement = event.target.closest('.movie-card');
            // When card is found then proceed
            if (cardElement) {
                // 1) get movie id from dataset attribute
                const movieId = cardElement.dataset.movie_id;
                console.log('Clicked Movie ID:', movieId);
                // 2) store movie id in local storage
                //      (I wanted a cleaner look, so I chose not to use query parameters in address bar)
                //      movie.html?imdbID=${movieId}
                localStorage.setItem('movie_id', movieId);
                // 3) redirect to detail page
                window.location.href = `movie.html`;
            }
        });
        resultsArea.appendChild(movieCard);
    });
}
