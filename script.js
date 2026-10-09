// Shared script for index.html and the service pages.
// Every element is optional, so the same file works on any page.
(() => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    const darkModeIcon = document.querySelector('#darkMode-icon');

    const closeMenu = () => {
        if (menuIcon) menuIcon.classList.remove('bx-x');
        if (navbar) navbar.classList.remove('active');
    };

    // mobile menu
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // active link on scroll + sticky header
    window.addEventListener('scroll', () => {
        const top = window.scrollY;
        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            if (top >= offset && top < offset + sec.offsetHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector('header nav a[href="#' + sec.id + '"]');
                if (active) active.classList.add('active');
            }
        });
        if (header) header.classList.toggle('sticky', top > 100);
        closeMenu();
    });

    // dark / light mode, remembered between pages and visits
    const storage = {
        get: () => { try { return localStorage.getItem('dark-mode'); } catch (e) { return null; } },
        set: (v) => { try { localStorage.setItem('dark-mode', v); } catch (e) { /* ignore */ } }
    };
    const applyDark = (on) => {
        document.body.classList.toggle('dark-mode', on);
        if (darkModeIcon) darkModeIcon.classList.toggle('bx-sun', on);
    };
    applyDark(storage.get() === 'true');
    if (darkModeIcon) {
        darkModeIcon.addEventListener('click', () => {
            const on = !document.body.classList.contains('dark-mode');
            applyDark(on);
            storage.set(on);
        });
    }

    // testimonials slider (index only)
    if (window.Swiper && document.querySelector('.mySwiper')) {
        new Swiper('.mySwiper', {
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true }
        });
    }

    // scroll reveal (index only; service pages use their own CSS animations)
    if (window.ScrollReveal && document.querySelector('.home-content')) {
        ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
        ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        ScrollReveal().reveal('.services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
        ScrollReveal().reveal('.home-content h3, .about-content', { origin: 'right' });
    }

    // scroll progress bar
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        scrollIndicator.style.setProperty('--scroll-width', pct + '%');
    });

    // contact form: opens the visitor's email app with the message filled in
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
            window.location.href = 'mailto:fikertetadesse1403@gmail.com'
                + '?subject=' + encodeURIComponent(data.get('subject') || 'Website enquiry')
                + '&body=' + encodeURIComponent(body);
        });
    }

    // current year in the footer
    const yearEl = document.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
