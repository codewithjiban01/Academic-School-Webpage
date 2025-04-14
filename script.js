document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links-container');
    
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Add this to your existing CSS
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .no-scroll {
                overflow: hidden;
            }
        </style>
    `);

    // Initialize Facilities Slider
    initFacilitiesSlider();
    
    // Initialize Testimonials Slider
    initTestimonialSlider();
});

// Facilities Slider Functionality
function initFacilitiesSlider() {
    const slides = document.querySelectorAll('.facility-slide');
    const prevBtn = document.querySelector('.facilities-slider .slider-prev');
    const nextBtn = document.querySelector('.facilities-slider .slider-next');
    const dotsContainer = document.querySelector('.facilities-slider .slider-dots');
    let currentIndex = 0;

    if (!slides.length) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        updateDots(index);
    }

    function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }

    function createDots() {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                showSlide(currentIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    createDots();
    showSlide(currentIndex);
}

function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonials-slider .slider-dots');
    let currentIndex = 0;
    let interval;

    if (!testimonials.length || !dotsContainer) return;

    // Create dots for each testimonial
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Navigation functions
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function goToTestimonial(index) {
        showTestimonial(index);
        resetInterval();
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Auto-rotate testimonials every 5 seconds
    resetInterval();

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => resetInterval());

    // Manual navigation
    const prevBtn = document.querySelector('.testimonials-slider .slider-prev');
    const nextBtn = document.querySelector('.testimonials-slider .slider-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
            resetInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
            resetInterval();
        });
    }
}