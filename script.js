// Initialize EmailJS
emailjs.init('e46EVAGDaBr6H9rZ2');

// Mobile Menu Toggle
let l1, l2, l3, t1;

function initMenuElements() {
    l1 = document.querySelector(".nav-line1");
    l2 = document.querySelector(".nav-line2");
    l3 = document.querySelector(".nav-line3");
    t1 = document.querySelector(".nav-menu h1");
    
    // Add click event to close button
    if (t1) {
        t1.addEventListener('click', function(e) {
            e.stopPropagation();
            hideMenu();
        });
    }
}

function showMenu() {
    document.querySelector(".mobile-menu").classList.add("active");
    if (l1 && l2 && l3 && t1) {
        l1.style.display = "none";
        l2.style.display = "none";
        l3.style.display = "none";
        t1.style.display = "block";
    }
    document.querySelector("body").style.overflow = "hidden";
}

function hideMenu() {
    document.querySelector(".mobile-menu").classList.remove("active");
    if (l1 && l2 && l3 && t1) {
        t1.style.display = "none";
        l1.style.display = "block";
        l2.style.display = "block";
        l3.style.display = "block";
    }
    document.querySelector("body").style.overflow = "visible";
}
document.addEventListener('DOMContentLoaded', function() {
    initMenuElements();
    
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                hideMenu();
            }
        });
    }
    
    // Loading animation code...
});


// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Scroll to Top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (document.querySelector('.mobile-menu').classList.contains('active')) {
                hideMenu();
            }
            
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stat-card')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.detail-item, .mv-card, .stat-card, .program-card, .company-card, .office-card, .download-card, .testimonial-card, .placement-highlight-card, .location-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Counter Animation
function animateCounter(card) {
    const numberElement = card.querySelector('.stat-number');
    if (!numberElement || numberElement.classList.contains('animated')) return;
    
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    numberElement.classList.add('animated');
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            numberElement.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = target;
        }
    };
    
    updateCounter();
}

// Form Submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Not provided',
        organization: document.getElementById('organization').value || 'Not provided',
        message: document.getElementById('message').value
    };
    
    emailjs.send('service_7jq651h', 'template_2azjmnp', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            submitBtn.innerHTML = '<span>Message Sent!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            document.getElementById('contactForm').reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)';
            }, 3000);
        }, function(error) {
            console.log('FAILED...', error);
            
            submitBtn.innerHTML = '<span>Failed. Try Again</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)';
            }, 3000);
        });
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroLogo = document.querySelector('.hero-logo-bg');
    
    if (heroContent && scrolled < 600) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroLogo) {
        heroLogo.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.program-card, .company-card, .office-card, .download-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMenuElements();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor effect for desktop
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button, .cta-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .cta-button-secondary, .submit-btn, .download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Download PDF functions (Note: These alert users to contact for PDFs)
// In a production environment, you would link to actual PDF files
function downloadProposal(event) {
    if (event) event.preventDefault();
    alert('To request our Company Proposal PDF, please contact us at:\n\nEmail: nexdigiintern@gmail.com\nPhone: +91 90039 81816\n\nWe will send you the detailed proposal immediately!');
}

function downloadSoftware(event) {
    if (event) event.preventDefault();
    alert('To request our Software Placement Details PDF, please contact us at:\n\nEmail: nexdigiintern@gmail.com\nPhone: +91 90039 81816\n\nWe will send you comprehensive information about our IT placements!');
}

function downloadCore(event) {
    if (event) event.preventDefault();
    alert('To request our Core Engineering Placement Details PDF, please contact us at:\n\nEmail: nexdigiintern@gmail.com\nPhone: +91 90039 81816\n\nWe will send you detailed information about our core placements!');
}

// Smooth scroll behavior for all browsers
if (CSS.supports('scroll-behavior', 'smooth')) {
    document.documentElement.style.scrollBehavior = 'smooth';
}

console.log('NEXDIGI Website Loaded Successfully! 🚀');
console.log('Version: 2.0 - Enhanced with comprehensive placement information');
