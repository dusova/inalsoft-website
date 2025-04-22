document.addEventListener('DOMContentLoaded', function() {
    'use strict';


    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });


    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: ['Çözüm Ortağınız', 'Yenilikçi Ekibiniz', 'Dijital Rehberiniz'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }


    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;


    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');


    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }


    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }


    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');

    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            languageDropdown.classList.toggle('show');
        });


        document.addEventListener('click', function(e) {
            if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });


        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                languageOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                languageToggle.textContent = this.textContent.substring(0, 2) + ' ';
                const icon = document.createElement('i');
                icon.className = 'fas fa-chevron-down';
                languageToggle.appendChild(icon);
                languageDropdown.classList.remove('show');
            });
        });
    }


    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    }


    const fadeElements = document.querySelectorAll('.fade-up, .hero-image');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.9) {
                element.classList.add('active');
            }
        });
    }


    checkFade();


    window.addEventListener('scroll', checkFade);


    const counters = document.querySelectorAll('.counter-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    counter.textContent = Math.floor(current);

                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                filterButtons.forEach(btn => btn.classList.remove('active'));


                this.classList.add('active');


                const filterValue = this.getAttribute('data-filter');


                portfolioItems.forEach(item => {
                    const animationDelay = item.getAttribute('data-aos-delay');
                    item.style.transition = 'all 0.4s ease';

                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.display = 'block';


                        item.offsetHeight;

                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';

                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }


    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));

                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                    window.scrollTo({
                        top: targetPosition - navbarHeight,
                        behavior: 'smooth'
                    });


                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });


    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;


            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (!nameInput.value.trim()) {
                nameError.classList.add('show');
                isValid = false;
            } else {
                nameError.classList.remove('show');
            }


            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.classList.add('show');
                isValid = false;
            } else {
                emailError.classList.remove('show');
            }


            const subjectInput = document.getElementById('subject');
            const subjectError = document.getElementById('subject-error');
            if (!subjectInput.value.trim()) {
                subjectError.classList.add('show');
                isValid = false;
            } else {
                subjectError.classList.remove('show');
            }


            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (!messageInput.value.trim()) {
                messageError.classList.add('show');
                isValid = false;
            } else {
                messageError.classList.remove('show');
            }

            if (isValid) {

                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success text-center mt-4';
                successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';


                formContainer.appendChild(successMessage);


                contactForm.reset();


                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });


        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            });
        });
    }


    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (cookieConsent && cookieAccept && cookieDecline) {

        const cookieChoice = localStorage.getItem('cookieChoice');

        if (!cookieChoice) {

            setTimeout(() => {
                cookieConsent.style.display = 'block';
                setTimeout(() => {
                    cookieConsent.style.opacity = '1';
                    cookieConsent.style.transform = 'translateY(0)';
                }, 100);
            }, 2000);
        }


        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieChoice', 'accepted');
            cookieConsent.style.opacity = '0';
            cookieConsent.style.transform = 'translateY(100%)';
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 500);
        });


        cookieDecline.addEventListener('click', function() {
            localStorage.setItem('cookieChoice', 'declined');
            cookieConsent.style.opacity = '0';
            cookieConsent.style.transform = 'translateY(100%)';
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 500);
        });
    }


    const preloader = document.querySelector('.preloader');
    if (preloader) {

        setTimeout(function() {
            preloader.classList.add('hide');


            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});