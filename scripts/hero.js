const heroDiv = document.getElementById('hero-div');

const originalImage = 'url("images/movie-large.webp")';
const newImage = 'url("images/movie-small.webp")';

heroDiv.addEventListener('mouseenter', function() {
    heroDiv.style.backgroundImage = newImage;
});

heroDiv.addEventListener('mouseleave', function() {
    heroDiv.style.backgroundImage = originalImage;
});
