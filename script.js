document.addEventListener('DOMContentLoaded', () => {

    // --- INITIALIZATION ---
    startBackgroundEffects();
    initializeScrollEffects();
    handleLoader();
    initializeContactForm();
    highlightActiveNav(); // New function for multi-page sites

    // --- LOADER ---
    function handleLoader() {
        const loader = document.getElementById('loader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                if(loader) loader.classList.add('hidden');
            }, 400);
        });
    }
    
    // --- ACTIVE NAVIGATION LINK HIGHLIGHTER ---
    function highlightActiveNav() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const currentPage = window.location.pathname.split('/').pop(); // Gets the current file name e.g., "projects.html"

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            // Highlight if the link's href matches the current page
            // Also handles the "index.html" or empty path case for the HOME logo
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
            // Special case for Blog link, as it's in a subfolder
            if (window.location.pathname.includes('blogs_section')) {
                 if(link.getAttribute('href').includes('blogs_section')) {
                    link.classList.add('active');
                 }
            }
        });
        // Highlight HOME logo if on the index page
        if(currentPage === '' || currentPage === 'index.html') {
            document.querySelector('.logo').classList.add('active');
        }
    }

    // --- BACKGROUND & PARTICLE EFFECTS ---
    function startBackgroundEffects() {
        const particleSystem = document.getElementById('particleSystem');
        if (particleSystem) createParticles(particleSystem, 50);
        
        const equationSystem = document.getElementById('equationSystem');
        if (equationSystem) createFloatingEquations(equationSystem);
    }

    function createParticles(container, count) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
            fragment.appendChild(particle);
        }
        container.appendChild(fragment);
    }

    function createFloatingEquations(container) {
        const equations = ['E = mc²', 'ψ = Ae^(ikx)', '∇²φ = 4πGρ', 'F = ma', 'S = k ln(Ω)', '∂ψ/∂t = Hψ', 'Gμν = 8πTμν'];
        setInterval(() => {
            if (container.children.length < 15) {
                const equationEl = document.createElement('div');
                equationEl.className = 'equation';
                equationEl.textContent = equations[Math.floor(Math.random() * equations.length)];
                equationEl.style.left = `${Math.random() * 100}%`;
                equationEl.style.fontSize = `${Math.random() * 0.5 + 0.8}rem`;
                container.appendChild(equationEl);
                setTimeout(() => equationEl.remove(), 25000);
            }
        }, 3000);
    }
    
    // --- CONTACT FORM ---
    function initializeContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! (This is a demo and no email was sent)');
                contactForm.reset();
            });
        }
    }

    // --- SCROLL-BASED EFFECTS & ANIMATIONS ---
    function initializeScrollEffects() {
        const header = document.getElementById('header');
        const scrollProgress = document.getElementById('scrollProgress');
        const parallaxElements = document.querySelectorAll('.physics-background, .floating-equations');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
        
        window.addEventListener('scroll', () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollableHeight <= 0) return;
            const scrollPercent = (window.scrollY / scrollableHeight) * 100;

            if (scrollProgress) scrollProgress.style.width = `${scrollPercent}%`;
            if (header) header.classList.toggle('scrolled', window.scrollY > 50);

            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => {
                const speed = 0.3;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, { passive: true });
    }
});