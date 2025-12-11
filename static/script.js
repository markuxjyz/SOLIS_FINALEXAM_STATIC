// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // In a real application, this would send data to a server
        // For now, just show a success message
        alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add active class to navbar links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Back to top button functionality
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .leadership-card').forEach(el => {
    observer.observe(el);
});

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    .skill-category, .project-card, .timeline-item, .cert-card, .leadership-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-category.animate, 
    .project-card.animate, 
    .timeline-item.animate, 
    .cert-card.animate, 
    .leadership-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Initialize animations on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .leadership-card').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate');
        }
    });
});

// Theme switcher (optional feature)
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle dark mode';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add dark mode styles
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        body.dark-mode {
            --dark-color: #f8fafc;
            --light-color: #1e293b;
            --gray-color: #cbd5e1;
            background-color: #0f172a;
            color: #f1f5f9;
        }
        
        body.dark-mode .navbar,
        body.dark-mode .about-card,
        body.dark-mode .skill-category,
        body.dark-mode .project-card,
        body.dark-mode .timeline-content,
        body.dark-mode .cert-card,
        body.dark-mode .leadership-card,
        body.dark-mode .contact-form input,
        body.dark-mode .contact-form textarea {
            background-color: #1e293b;
            color: #f1f5f9;
        }
        
        body.dark-mode .hero {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        
        body.dark-mode .skills,
        body.dark-mode .education {
            background-color: #0f172a;
        }
        
        body.dark-mode .skill-tag {
            background-color: #334155;
            color: #e2e8f0;
        }
        
        body.dark-mode .project-footer {
            background-color: #334155;
            border-color: #475569;
        }
        
        body.dark-mode .footer {
            background-color: #0f172a;
        }
    `;
    document.head.appendChild(darkModeStyles);
    
}

// Uncomment to enable theme switcher
// initThemeSwitcher();
