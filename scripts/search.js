const OMDb_API = 'YOUR_OMDB_KEY';
document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDb_API}&s=${query}`);
    const data = await response.json();
    console.log(data.Search);
});
