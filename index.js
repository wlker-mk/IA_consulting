document.addEventListener('DOMContentLoaded', function() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth + 30; // Largeur d'une carte + gap
    let currentPosition = 0;
    const totalCards = cards.length;
    
    // Ajuster la largeur du conteneur pour qu'il puisse contenir toutes les cartes
    testimonialGrid.style.width = `${totalCards * cardWidth}px`;
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
}); 

document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    const targetValues = [50, 200, 15]; // Valeurs cibles pour chaque stat
    const duration = 2000; // Durée de l'animation en ms
    const startTime = Date.now();

    statItems.forEach((item, index) => {
        const target = targetValues[index];
        const prefix = item.textContent.match(/©\s*/)[0]; // Garde le symbole ©
        
        function updateCount() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1); // Progression entre 0 et 1
            const currentValue = Math.floor(progress * target);
            
            item.textContent = `${prefix}${currentValue}+${item.textContent.match(/[^\d+]+$/)[0]}`; // Maintient le texte après le nombre
            
            if (progress < 1) {
                requestAnimationFrame(updateCount); // Continue l'animation
            }
        }

        updateCount();
    });
});
