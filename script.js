// =========================================
// PORTFOLIO INTERACTIVE JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {


    // =====================================
    // 3. TYPING EFFECT
    // =====================================

    const typing = document.getElementById("typing");
    if (typing) {
        const words = [
            "BCA Student",
            "Web Developer",
            "Frontend Developer",
            "UI/UX Designer",
            "PHP & DB Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typing.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typing.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 60 : 110;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1800; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }


    // =====================================
    // 4. STICKY NAVBAR & ACTIVE LINK TRACKER
    // =====================================

    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section[id], header[id]");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active link tracking
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });


    // =====================================
    // 5. MOBILE MENU DRAWER
    // =====================================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    const barsSVG = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const closeSVG = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const isExpanded = navLinks.classList.contains("active");
            menuBtn.innerHTML = isExpanded ? closeSVG : barsSVG;
        });

        // Close menu on link click
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.innerHTML = barsSVG;
            });
        });
    }


    // =====================================
    // 6. SKILL CATEGORY FILTERING
    // =====================================

    const filterBtns = document.querySelectorAll(".filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            skillCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0) scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px) scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });


    // =====================================
    // 7. BACK TO TOP BUTTON
    // =====================================

    const topBtn = document.createElement("button");
    topBtn.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;
    topBtn.id = "topBtn";
    topBtn.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // =====================================
    // 8. PURE VANILLA CONTACT FORM HANDLER
    // =====================================

    const contactForm = document.getElementById("contactForm");

    function showToast(message) {
        let container = document.querySelector(".toast-container");
        if (!container) {
            container = document.createElement("div");
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `
            <span class="toast-icon">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 50);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("name");
            const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Friend";
            showToast(`Thank you, ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

});