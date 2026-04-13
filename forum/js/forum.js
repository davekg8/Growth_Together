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
});
