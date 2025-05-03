document.addEventListener('DOMContentLoaded', function() {

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Visitor counter
    function updateVisitorCount() {
        // In a real application, you would fetch this from a server/database
        // For this demo, we'll use localStorage to simulate persistence
        
        let count = localStorage.getItem('visitorCount');
        
        if (!count) {
            // Initial count - in a real app, this would come from your database
            count = Math.floor(Math.random() * 5) + 1; // Random number between 100-600
        } else {
            count = parseInt(count) + 1;
        }
        
        localStorage.setItem('visitorCount', count);
        
        // Animate the counter
        const visitorElements = document.querySelectorAll('#visitors, #visitors-footer');
        const targetCount = count;
        const duration = 2000; // Animation duration in ms
        const startTime = performance.now();
        
        function animateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentCount = Math.floor(progress * targetCount);
            
            visitorElements.forEach(el => {
                el.textContent = currentCount;
            });
            
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        }
        
        requestAnimationFrame(animateCount);
    }
    
    updateVisitorCount();
    
    // Animate elements when scrolling
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.animated-text', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.animated-subtext', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });
    
    gsap.from('.animated-paragraph', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
    });
    
    gsap.from('.animated-btn', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.9,
        stagger: 0.2
    });
    
    gsap.from('.profile-img', {
        duration: 1.5,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.5
    });
    
    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        const heading = section.querySelector('.section-title');
        const content = section.querySelectorAll('.about-content, .skills-container, .projects-grid, .certificates-slider, .contact-content');
        
        if (heading) {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8
            });
        }
        
        if (content) {
            content.forEach(item => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.2
                });
            });
        }
    });
    
    // Skill bars animation
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        gsap.from(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            width: 0,
            duration: 1.5,
            ease: 'power3.out'
        });
    });
    
    // Project filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    gsap.from(item, {
                        y: 50,
                        opacity: 0,
                        duration: 0.5
                    });
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Certificate slider
    const slider = document.querySelector('.certificates-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});
