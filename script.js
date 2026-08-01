// ======================================
// Rahul Gupta Portfolio JavaScript
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Mobile Menu
    // ==========================

    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".mobile-close");

    if (hamburger && mobileMenu) {

        hamburger.addEventListener("click", () => {
            mobileMenu.classList.add("open");
        });

    }

    if (closeBtn && mobileMenu) {

        closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });

    }

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });

    });

    // ==========================
    // Dark / Light Theme
    // ==========================

    const themeBtn = document.getElementById("theme-toggle");

    if (themeBtn) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("light");

            if (document.body.classList.contains("light")) {

                localStorage.setItem("theme", "light");
                themeBtn.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

            } else {

                localStorage.setItem("theme", "dark");
                themeBtn.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

            }

        });

    }

    // ==========================
    // Sticky Navbar
    // ==========================

    const nav = document.querySelector("nav");

    if (nav) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 80) {

                nav.style.background = "rgba(11,15,25,.95)";
                nav.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,.3)";

            } else {

                nav.style.background =
                    "rgba(11,15,25,.75)";
                nav.style.boxShadow = "none";

            }

        });

    }

    // ==========================
    // Active Navigation
    // ==========================

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    // ==========================
    // Scroll Reveal
    // ==========================

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.classList.add("visible");

            }

        });

    }, {

        threshold: 0.2

    });

    revealElements.forEach(el => observer.observe(el));

    // ==========================
    // Smooth Scroll
    // ==========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    // ==========================
    // Scroll To Top
    // ==========================

    const scrollBtn = document.querySelector(".scroll-top");

    if (scrollBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                scrollBtn.classList.add("show");

            } else {

                scrollBtn.classList.remove("show");

            }

        });

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    // ==========================
    // Hero Image Mouse Effect
    // ==========================

    const heroImage = document.querySelector(".image-wrapper");

    if (heroImage) {

        window.addEventListener("mousemove", e => {

            const x =
                (window.innerWidth / 2 - e.pageX) / 45;

            const y =
                (window.innerHeight / 2 - e.pageY) / 45;

            heroImage.style.transform =
                `rotateY(${x}deg) rotateX(${-y}deg)`;

        });

    }

    // ==========================
    // Typing Animation
    // ==========================

    const roles = [
        "Python Full Stack Developer",
        "Backend Developer",
        "Frontend Developer",
        "React Developer",
        "AI Developer"
    ];

    const typingRole =
        document.getElementById("typing-role");

    if (typingRole) {

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeWriter() {

            const current = roles[roleIndex];

            if (!deleting) {

                typingRole.textContent =
                    current.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === current.length) {

                    deleting = true;

                    setTimeout(typeWriter, 1500);

                    return;
                }

            } else {

                typingRole.textContent =
                    current.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) % roles.length;

                }

            }

            setTimeout(
                typeWriter,
                deleting ? 50 : 100
            );

        }

        typeWriter();

    }
});

// ==========================
// EmailJS Integration
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    emailjs.init({
        publicKey: "Q6bT5F5UvfjnkmkVQ"
    });

    const contactForm = document.querySelector(".contact-form");

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Send email to you
        emailjs.sendForm(
            "service_jriz27o",
            "template_lndfl8o",
            contactForm
        )
        .then(() => {

            // Send auto reply
            return emailjs.sendForm(
                "service_jriz27o",
                "template_6sxgp3d",
                contactForm
            );

        })
        .then(() => {

            alert("✅ Message sent successfully!");
            contactForm.reset();

        })
        .catch((error) => {

            console.error(error);
            alert(error.text);

        });

    });

});