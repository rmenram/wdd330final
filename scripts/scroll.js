const scrollBtn = document.getElementById('scrollToTopBtn');

document.addEventListener('DOMContentLoaded', () => {
    scrollBtn.style.display = 'none';
})

window.addEventListener('scroll', () => {
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    
    if (isSmallScreen && window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}, { passive: true });

// Scroll to top function
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
