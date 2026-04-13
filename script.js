document.addEventListener('DOMContentLoaded', function () {

    // ===== YEAR =====
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== MOBILE MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections   = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links ul li a');

    function setActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const match = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // ===== TYPED TEXT EFFECT =====
const words  = ['PHP & MySQL.', 'Python.', 'JavaScript.', 'HTML & CSS.', 'UI/UX Design.'];
const target = document.querySelector('.typed-text');
let wi = 0, ci = 0, deleting = false;

function type() {
    if (!target) return;
    const word = words[wi];

    if (!deleting) {
        ci++;
        target.textContent = word.slice(0, ci);
    } else {
        ci--;
        target.textContent = word.slice(0, ci);
    }

    let delay = deleting ? 60 : 110;

    if (!deleting && ci === word.length) {
        delay = 1800;
        deleting = true;
    } else if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

// Small delay to ensure DOM is painted before starting
setTimeout(type, 500);
    // ===== GSAP ANIMATIONS =====
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero
        gsap.from('.hero-tag',         { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' });
        gsap.from('.hero h1',          { duration: 0.9, y: 40, opacity: 0, ease: 'power3.out', delay: 0.15 });
        gsap.from('.hero h2',          { duration: 0.9, y: 40, opacity: 0, ease: 'power3.out', delay: 0.3 });
        gsap.from('.animated-paragraph', { duration: 0.9, y: 30, opacity: 0, ease: 'power3.out', delay: 0.45 });
        gsap.from('.hero-btns',        { duration: 0.9, y: 30, opacity: 0, ease: 'power3.out', delay: 0.6 });
        gsap.from('.hero-socials',     { duration: 0.9, y: 20, opacity: 0, ease: 'power3.out', delay: 0.75 });
        gsap.from('.profile-img',      { duration: 1.4, scale: 0.7, opacity: 0, ease: 'back.out(1.7)', delay: 0.3 });
        gsap.from('.circle-animation', { duration: 1.4, scale: 0.5, opacity: 0, ease: 'power3.out', delay: 0.6 });

        // Section titles
        gsap.utils.toArray('.section-title').forEach(el => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                y: 40, opacity: 0, duration: 0.8
            });
        });

        // About
        gsap.from('.about-img', {
            scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
            x: -60, opacity: 0, duration: 0.9
        });
        gsap.from('.about-text', {
            scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
            x: 60, opacity: 0, duration: 0.9
        });

        // Skill items stagger
        gsap.from('.skill-item', {
            scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.08
        });

        // Project items stagger
        gsap.from('.project-item', {
            scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
            y: 50, opacity: 0, duration: 0.6, stagger: 0.1
        });

        // Contact sections
        gsap.from('.contact-info', {
            scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
            x: -50, opacity: 0, duration: 0.8
        });
        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
            x: 50, opacity: 0, duration: 0.8
        });
    }

    // ===== SKILL BARS — animate when visible =====
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(el => skillObserver.observe(el));

    // ===== PROJECT FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems  = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach((item, i) => {
                const match = filterValue === 'all' || item.getAttribute('data-category') === filterValue;

                if (match) {
                    item.style.display = 'block';
                    // Small stagger fade-in
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 60);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== CERTIFICATE SLIDER =====
    const slider  = document.querySelector('.certificates-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => slider.scrollBy({ left: -310, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => slider.scrollBy({ left: 310, behavior: 'smooth' }));
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('submitBtn');
    const formStatus  = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                formStatus.textContent = '❌ Something went wrong. Please try emailing me directly.';
                formStatus.className = 'form-status error';
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        });
    }

});
