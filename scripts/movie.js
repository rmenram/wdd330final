const WATCHMODE_API = 'YOUR_WATCHMODE_KEY';
async function getStreamingSources(movieId) {
    const response = await fetch(`https://api.watchmode.com/v1/title/${movieId}/sources/?apiKey=${WATCHMODE_API}`);
    const sources = await response.json();
    return sources;
}
