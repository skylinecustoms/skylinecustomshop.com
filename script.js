// Modern JavaScript for Skyline Customs Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observeElements = () => {
        const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .stat');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };
    
    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                    const suffix = counter.textContent.replace(/[0-9]/g, '');
                    let current = 0;
                    const increment = target / 60;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    };
    
    // Initialize animations
    observeElements();
    animateCounters();
    
    // Car showcase rotation (if you add multiple car images later)
    let currentCar = 0;
    const cars = document.querySelectorAll('.car-card');
    
    const rotateCars = () => {
        if (cars.length > 1) {
            cars[currentCar].classList.remove('active');
            currentCar = (currentCar + 1) % cars.length;
            cars[currentCar].classList.add('active');
        }
    };
    
    // Auto-rotate cars every 5 seconds
    if (cars.length > 1) {
        setInterval(rotateCars, 5000);
    }
    
    // Form handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(e);
        });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }
    
    // Form validation
    const validateForm = (formData) => {
        const errors = [];
        
        if (!formData.get('name').trim()) {
            errors.push('Name is required');
        }
        
        if (!formData.get('phone').trim()) {
            errors.push('Phone number is required');
        }
        
        const email = formData.get('email');
        if (email && !isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        return errors;
    };
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Show success message
    const showSuccessMessage = () => {
        const form = document.getElementById('contact-form');
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <div style="
                background: #d4edda;
                color: #155724;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #c3e6cb;
                display: flex;
                align-items: center;
                gap: 12px;
            ">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Message sent successfully!</strong><br>
                    <small>We'll get back to you within 24 hours.</small>
                </div>
            </div>
        `;
        
        form.insertBefore(successMsg, form.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
    };
    
    // Show error message
    const showErrorMessage = (errors) => {
        const form = document.getElementById('contact-form');
        const existingError = form.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = `
            <div style="
                background: #f8d7da;
                color: #721c24;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #f5c6cb;
            ">
                <strong>Please correct the following errors:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        form.insertBefore(errorMsg, form.firstChild);
        
        // Scroll to error message
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    // Loading state for form button
    const setLoadingState = (button, isLoading) => {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            button.style.opacity = '1';
        }
    };
    
    // Add floating CTA visibility based on scroll
    let floatingCTA = document.querySelector('.floating-cta');
    if (floatingCTA) {
        window.addEventListener('scroll', () => {
            // Show floating CTA after scrolling past hero section
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (window.scrollY > heroHeight) {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.visibility = 'visible';
            } else {
                floatingCTA.style.opacity = '0';
                floatingCTA.style.visibility = 'hidden';
            }
        });
        
        // Initially hide floating CTA
        floatingCTA.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        floatingCTA.style.opacity = '0';
        floatingCTA.style.visibility = 'hidden';
    }
    
    // Add click tracking for analytics (if you implement Google Analytics later)
    const trackClick = (element, action) => {
        element.addEventListener('click', () => {
            // Google Analytics 4 event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    event_category: 'engagement',
                    event_label: element.textContent.trim()
                });
            }
        });
    };
    
    // Track important button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary, .service-cta, .nav-cta, .float-btn').forEach(btn => {
        trackClick(btn, 'button_click');
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
        trackClick(tel, 'phone_click');
    });
    
    // Performance optimization: Lazy load images (if you add real car images)
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    };
    
    lazyLoadImages();
    
    // Service worker registration for PWA capabilities (optional)
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        window.addEventListener('load', () => {
            // Register service worker if you create one
            // navigator.serviceWorker.register('/sw.js');
        });
    }
});

// Global functions (needed for inline event handlers)

// FAQ Toggle Function
window.toggleFAQ = function(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
};

// Form Submit Function
window.submitForm = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Remove existing error messages
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showErrorMessage(errors);
        return;
    }
    
    // Set loading state
    setLoadingState(submitBtn, true);
    
    // Simulate form submission (replace with your actual endpoint)
    setTimeout(() => {
        // In a real implementation, you would send the data to your server
        // fetch('/submit-form', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         showSuccessMessage();
        //         form.reset();
        //     } else {
        //         showErrorMessage(['There was an error sending your message. Please try again.']);
        //     }
        // })
        // .catch(error => {
        //     showErrorMessage(['There was an error sending your message. Please try again.']);
        // })
        // .finally(() => {
        //     setLoadingState(submitBtn, false);
        // });
        
        // For demo purposes, just show success message
        showSuccessMessage();
        form.reset();
        setLoadingState(submitBtn, false);
        
        // Track form submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'contact_form'
            });
        }
    }, 2000);
};

// Helper functions for form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name').trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.get('phone').trim()) {
        errors.push('Phone number is required');
    }
    
    const email = formData.get('email');
    if (email && !isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
            display: flex;
            align-items: center;
            gap: 12px;
        ">
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Message sent successfully!</strong><br>
                <small>We'll get back to you within 24 hours.</small>
            </div>
        </div>
    `;
    
    form.insertBefore(successMsg, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

function showErrorMessage(errors) {
    const form = document.getElementById('contact-form');
    const existingError = form.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.innerHTML = `
        <div style="
            background: #f8d7da;
            color: #721c24;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #f5c6cb;
        ">
            <strong>Please correct the following errors:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    form.insertBefore(errorMsg, form.firstChild);
    
    // Scroll to error message
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        button.style.opacity = '1';
    }
}