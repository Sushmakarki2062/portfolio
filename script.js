// =========================================
// PORTFOLIO JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // TYPING EFFECT
    // =====================================

    const typing = document.getElementById("typing");

    const words = [
        "BCA Student",
        "Web Developer",
        "Frontend Developer",
        "UI Designer",
        "PHP Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typing.textContent = currentWord.substring(0, charIndex++);
        } else {

            typing.textContent = currentWord.substring(0, charIndex--);
        }

        let speed = deleting ? 70 : 120;

        if (!deleting && charIndex === currentWord.length + 1) {

            deleting = true;
            speed = 1500;

        } else if (deleting && charIndex === 0) {

            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // =====================================
    // STICKY NAVBAR SHADOW
    // =====================================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

        } else {

            navbar.style.boxShadow = "none";
        }

    });

    // =====================================
    // MOBILE MENU
    // =====================================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    // =====================================
    // ACTIVE MENU
    // =====================================

    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");
            }

        });

    });

    // =====================================
    // SCROLL REVEAL
    // =====================================

    const revealItems = document.querySelectorAll(
        ".skill-card,.service-card,.project-card,.timeline-item,.about-content,.about-image"
    );

    function reveal() {

        revealItems.forEach(item => {

            const windowHeight = window.innerHeight;

            const top = item.getBoundingClientRect().top;

            if (top < windowHeight - 100) {

                item.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", reveal);

    reveal();

});

// =========================================
// BACK TO TOP BUTTON
// =========================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});