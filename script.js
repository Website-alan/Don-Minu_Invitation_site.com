// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        const progressFill = document.querySelector('.progress-fill');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressFill.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        // Trigger initial hero animations
                        initHeroAnimations();
                    }, 800);
                }, 500);
            }
        }, 50);
    });

    // 2. Hero Animations
    function initHeroAnimations() {
        gsap.from('.fade-up', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });

        gsap.from('.glass-card', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            delay: 0.8,
            ease: "power4.out"
        });
    }

    // 3. Parallax Effect
    gsap.to(".parallax", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: (i, target) => {
            const speed = target.dataset.speed || 0.5;
            return 100 * speed;
        },
        ease: "none"
    });

    // 4. Reveal Animations
    const revealElements = [
        { selector: '.reveal-up', y: 50 },
        { selector: '.reveal-left', x: -50 },
        { selector: '.reveal-right', x: 50 }
    ];

    revealElements.forEach(reveal => {
        gsap.utils.toArray(reveal.selector).forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                x: reveal.x || 0,
                y: reveal.y || 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    // 5. Countdown Timer
    const weddingDate = new Date("May 11, 2026 11:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "<div class='timer-item'><span>Just Married!</span></div>";
        }
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 6. Gallery & Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const bgImg = window.getComputedStyle(item).backgroundImage;
            const imgSrc = bgImg.slice(5, -2).replace(/"/g, "");
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });

    // 7. RSVP Form Submission
    const rsvpForm = document.getElementById('rsvp-form');
    const submitBtn = document.getElementById('submit-rsvp');
    const spinner = submitBtn.querySelector('.spinner');
    const btnText = submitBtn.querySelector('.btn-text');
    const feedback = document.getElementById('form-feedback');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // UI Feedback
        submitBtn.disabled = true;
        btnText.innerText = "Sending...";
        spinner.classList.remove('hidden');

        // Simulate API call
        setTimeout(() => {
            spinner.classList.add('hidden');
            btnText.innerText = "Sent Successfully!";
            submitBtn.style.background = "var(--accent-gold)";
            
            feedback.innerText = "Thank you! Your RSVP has been received.";
            feedback.classList.remove('hidden');
            feedback.style.color = "var(--accent-green)";
            
            rsvpForm.reset();
        }, 2000);
    });

    // 8. Back to Top Smooth Scroll
    document.getElementById('backToTop').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
