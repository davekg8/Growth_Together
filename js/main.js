document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simple implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.getElementById('nav-cta');
    
    hamburger.addEventListener('click', () => {
        // Toggle mobile menu styles
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            if(window.innerWidth <= 768) {
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
            
            navCta.style.display = 'inline-block';
            navCta.style.position = 'absolute';
            navCta.style.top = '100%';
            navCta.style.right = '2rem';
            navCta.style.marginTop = '2rem';
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
            navCta.style.display = 'inline-block';
            navCta.style.position = 'static';
            navCta.style.marginTop = '0';
        } else {
            navLinks.style.display = 'none';
            navCta.style.display = 'none';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    
    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Initial trigger for hero section elements since they might be in viewport on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // Scrollytelling Logic
    const scrollySteps = document.querySelectorAll('.scrolly-step');
    const scrollyIcons = document.querySelectorAll('.scrolly-icon');
    
    if(scrollySteps.length > 0) {
        const scrollyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const stepIndex = entry.target.getAttribute('data-step');
                    
                    scrollySteps.forEach(step => step.classList.remove('active'));
                    entry.target.classList.add('active');
                    
                    scrollyIcons.forEach(icon => icon.classList.remove('active'));
                    const activeIcon = document.querySelector(`.scrolly-icon[data-step="${stepIndex}"]`);
                    if(activeIcon) activeIcon.classList.add('active');
                }
            });
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
        
        scrollySteps.forEach(step => scrollyObserver.observe(step));
    }
});
