// Get the header element
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    
    if (isSmallScreen && window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}, { passive: true }); // Passive: true improves scrolling performance
