document.addEventListener('DOMContentLoaded', function() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const cards = document.querySelectorAll('.testimonial-card');
    const container = document.querySelector('.container');
    
    // Calculer la largeur exacte d'une carte + gap
    const cardStyle = window.getComputedStyle(cards[0]);
    const gapValue = parseInt(window.getComputedStyle(testimonialGrid).gap);
    const cardWidth = cards[0].offsetWidth + gapValue;
    
    // Dupliquer les cartes pour l'effet de boucle
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        testimonialGrid.appendChild(clone);
    });
    
    // Animation fluide
    let scrollPos = 0;
    const speed = 1;
    
    function animate() {
        scrollPos += speed;
        
        if (scrollPos >= cardWidth * cards.length) {
            scrollPos = 0;
        }
        
        testimonialGrid.style.transform = `translateX(-${scrollPos}px)`;
        requestAnimationFrame(animate);
    }
    
    // Styles initiaux
    testimonialGrid.style.width = `${cardWidth * cards.length * 2}px`;
    container.style.overflow = 'hidden';
    animate();
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