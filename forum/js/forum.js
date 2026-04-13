// Forum-specific JavaScript: Scrollytelling Observer
document.addEventListener('DOMContentLoaded', () => {
    const scrollySteps = document.querySelectorAll('.scrolly-step');
    const scrollyIcons = document.querySelectorAll('.scrolly-icon');

    if (scrollySteps.length > 0) {
        const scrollyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepIndex = entry.target.getAttribute('data-step');

                    scrollySteps.forEach(step => step.classList.remove('active'));
                    entry.target.classList.add('active');

                    scrollyIcons.forEach(icon => icon.classList.remove('active'));
                    const activeIcon = document.querySelector(`.scrolly-icon[data-step="${stepIndex}"]`);
                    if (activeIcon) activeIcon.classList.add('active');
                }
            });
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        scrollySteps.forEach(step => scrollyObserver.observe(step));
    }

    // ===== LIGHTBOX GALLERY =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = [];

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push({
            src: img.src,
            alt: img.alt
        });

        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightboxCaption.textContent = images[currentIndex].alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    // Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowRight': nextImage(); break;
            case 'ArrowLeft': prevImage(); break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }, { passive: true });
});
