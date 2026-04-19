document.addEventListener('DOMContentLoaded', () => {

    // ==== THEME TOGGLE ====
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('gt-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', next);
            localStorage.setItem('gt-theme', next);
        });
    }

    // ==== NAVBAR SCROLL ====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==== MOBILE MENU ====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.getElementById('nav-cta');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                if (navCta && window.innerWidth <= 768) {
                    navCta.style.display = 'none';
                }
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(10px)';

                if (navCta) {
                    navCta.style.display = 'inline-block';
                    navCta.style.position = 'absolute';
                    navCta.style.top = '100%';
                    navCta.style.right = '2rem';
                    navCta.style.marginTop = '2rem';
                }
            }
        });

        // Reset mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
                if (navCta) {
                    navCta.style.display = 'inline-block';
                    navCta.style.position = 'static';
                    navCta.style.marginTop = '0';
                }
            } else {
                navLinks.style.display = 'none';
                if (navCta) navCta.style.display = 'none';
            }
        });
    }

    // ==== SCROLL ANIMATIONS ====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => animateOnScroll.observe(el));

    // Initial trigger for hero section
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);
});
