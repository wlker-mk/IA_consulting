/*document.addEventListener('DOMContentLoaded', function() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth + 30; // Largeur d'une carte + gap
    let currentPosition = 0;
    const totalCards = cards.length;
    
    // Clone les cartes pour un défilement infini
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        testimonialGrid.appendChild(clone);
    });

    function slide() {
        currentPosition -= 1; // Déplace de 1px à gauche
        
        // Si on a défilé l'équivalent d'une carte, on remet la première carte à la fin
        if (currentPosition <= -cardWidth) {
            currentPosition += cardWidth;
            testimonialGrid.appendChild(testimonialGrid.children[0]);
            testimonialGrid.style.transition = 'none';
            testimonialGrid.style.transform = `translateX(${currentPosition}px)`;
            // Force un reflow
            void testimonialGrid.offsetWidth;
        }
        
        testimonialGrid.style.transition = 'transform 0.5s linear';
        testimonialGrid.style.transform = `translateX(${currentPosition}px)`;
        
        requestAnimationFrame(slide);
    }

    // Démarrer l'animation après un court délai
    setTimeout(() => {
        requestAnimationFrame(slide);
    }, 1000);
}); */
