document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        });
    });
    
    // Reveal animations for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const revealElements = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight - revealPoint) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };
    
    // Initial check
    revealElements();
    
    // Check on scroll
    window.addEventListener('scroll', revealElements);
    
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Add CSS class for the timeline animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .timeline-item {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.5s ease;
            }
            
            .timeline-item:nth-child(even) {
                transform: translateX(30px);
            }
            
            .timeline-item.active {
                opacity: 1;
                transform: translateX(0);
            }
        </style>
    `);
});