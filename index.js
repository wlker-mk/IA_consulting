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
// Path: stats.js
// stats.js
// Animation des statistiques
// Assurez-vous que le DOM est chargé avant d'exécuter le script

    document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    const statItems = document.querySelectorAll('.stat-item');
    const targetValues = [50, 200, 15];
    const duration = 3000; // 3 secondes pour une animation plus douce
    let animationRequestId;

    function animateCount() {
        const startTime = Date.now();
        
        statItems.forEach((item, index) => {
        const originalText = item.textContent;
        const prefix = originalText.match(/©\s*/)[0];
        const suffix = originalText.match(/[^\d+]+$/)[0];
        
        function updateCount() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function pour un effet plus naturel
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * targetValues[index]);
            
            item.textContent = `${prefix}${currentValue}+${suffix}`;
            
            if (progress < 1) {
            animationRequestId = requestAnimationFrame(updateCount);
            }
        }

        // Réinitialise avant de relancer
        item.textContent = `${prefix}0+${suffix}`;
        updateCount();
        });
    }

    // Observer l'intersection avec la section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Annule toute animation en cours
            if (animationRequestId) {
            cancelAnimationFrame(animationRequestId);
            }
            // Lance l'animation avec un léger délai
            setTimeout(animateCount, 300);
        }
        });
    }, { threshold: 0.5 }); // Déclenché quand 50% de la section est visible

    observer.observe(statsSection);

    // Animation initiale
    animateCount();
    });