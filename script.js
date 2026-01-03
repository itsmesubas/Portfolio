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
    // Remove or comment out these lines (around line 105-115):
// Skill bars animation

        
     // Section animations
gsap.utils.toArray('section').forEach(section => {
    const heading = section.querySelector('.section-title');
    const content = section.querySelectorAll('.about-content, .skills-grid, .projects-grid, .certificates-slider, .contact-content');
    
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
fetch('https://api.countapi.xyz/hit/subashdahal17.com.np')
.then(res => res.json())
.then(data => {
  document.getElementById("counter").textContent = data.value;
});