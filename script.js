// ==================== MOBILE MENU ====================
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // ==================== DARK MODE (FIXED DEFAULT) ====================
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }

    function updateThemeToggleText() {
        if (!themeToggle) return;

        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        themeToggle.setAttribute(
            'aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    updateThemeToggleText();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');

            const theme = document.body.classList.contains('dark-mode')
                ? 'dark'
                : 'light';

            localStorage.setItem('theme', theme);
            updateThemeToggleText();
        });
    }

    // ==================== ABOUT IMAGE ANIMATION ====================
    const images = document.querySelectorAll(".about-img");

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    images.forEach(img => imageObserver.observe(img));

    // ==================== PROJECT CARD ANIMATION ====================
    const projectCards = document.querySelectorAll('.project-card');

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        projectObserver.observe(card);
    });

    // ==================== SECTION ANIMATION ====================
    const sections = document.querySelectorAll(".project-section, .project-split");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "0.6s ease";
        sectionObserver.observe(el);
    });

    // ==================== SCROLL TO TOP BUTTON ====================
    let scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.id = 'scrollBtn';

    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });

    console.log('Portfolio loaded successfully');

    // ==================== BEFORE / AFTER SLIDER FIX ====================
   <script id="ba-slider-fixed">
document.querySelectorAll(".ba-slider").forEach((slider) => {
    const after = slider.querySelector(".ba-after img"); // target IMAGE now
    const handle = slider.querySelector(".ba-handle");

    let isDragging = false;

    function move(clientX) {
        const rect = slider.getBoundingClientRect();
        let x = clientX - rect.left;

        // clamp
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percent = (x / rect.width) * 100;

        // move handle
        handle.style.left = percent + "%";

        // reveal image (KEY FIX)
        after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }

    // MOUSE
    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        move(e.clientX);
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        move(e.clientX);
    });

    // TOUCH
    slider.addEventListener("touchstart", (e) => {
        isDragging = true;
        move(e.touches[0].clientX);
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        move(e.touches[0].clientX);
    });

    // OPTIONAL: set default to middle
    move(slider.getBoundingClientRect().left + slider.offsetWidth / 2);
});
</script>

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAV ACTIVE SCROLL ====================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active',
            link.getAttribute('href') === `#${current}`
        );
    });
});

// ==================== BACKGROUND GLOW EFFECT ====================
document.addEventListener("mousemove", (e) => {
    const glows = document.querySelectorAll(".glow");

    const x = (e.clientX / window.innerWidth - 0.5) * 60;
    const y = (e.clientY / window.innerHeight - 0.5) * 60;

    glows.forEach((g, i) => {
        g.style.transform =
            `translate(${x * (i + 1)}px, ${y * (i + 1)}px) translate(-50%, -50%)`;
    });
});
