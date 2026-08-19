/* ==========================================================================
   SUSHMA KARKI - PORTFOLIO INTERACTIVE JAVASCRIPT
   Technologies: Vanilla JavaScript (ES6+), DOM Manipulation, Event Handling
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------------------------
       1. MOBILE NAVIGATION MENU TOGGLE
       ---------------------------------------------------------------------- */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        // Toggle mobile drawer open/close
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close mobile drawer when clicking any link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }


    /* ----------------------------------------------------------------------
       2. STICKY NAVBAR & ACTIVE SCROLLSPY HIGHLIGHTING
       ---------------------------------------------------------------------- */
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section[id]");

    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Sticky Navbar styling
        if (header) {
            if (scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Active link highlight based on current viewport section
        sections.forEach(currentSection => {
            const sectionHeight = currentSection.offsetHeight;
            const sectionTop = currentSection.offsetTop - 120;
            const sectionId = currentSection.getAttribute("id");
            const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add("active");
                } else {
                    targetLink.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", handleScroll);


    /* ----------------------------------------------------------------------
       3. TYPING ANIMATION FOR HERO SUBTITLE
       ---------------------------------------------------------------------- */
    const typingElement = document.getElementById("typing");

    if (typingElement) {
        const phrases = [
            "Aspiring Web Developer",
            "BCA Student at TU",
            "Frontend Tech Enthusiast",
            "Clean Code Practitioner"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Delete characters
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Type characters
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            // Pause at end of full phrase
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } 
            // Switch to next phrase after full deletion
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(typeText, typingSpeed);
        }

        // Start typing loop
        typeText();
    }


    /* ----------------------------------------------------------------------
       4. SKILLS CATEGORY FILTERING
       ---------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Active button indicator
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            // Show / Hide skill cards according to data category
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


    /* ----------------------------------------------------------------------
       5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for legacy browser support
        revealElements.forEach(el => el.classList.add("active"));
    }


    /* ----------------------------------------------------------------------
       6. CONTACT FORM CLIENT-SIDE VALIDATION & USER MESSAGE
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Form Inputs
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const subjectInput = document.getElementById("subject");
            const messageInput = document.getElementById("message");

            // Error Elements
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const subjectError = document.getElementById("subjectError");
            const messageError = document.getElementById("messageError");

            let isValid = true;

            // Simple Email Regex Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Reset Previous Validation States
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => input.classList.remove("error"));
            [nameError, emailError, subjectError, messageError].forEach(err => err.classList.remove("show"));

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.classList.add("error");
                nameError.classList.add("show");
                isValid = false;
            }

            // Validate Email
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add("error");
                emailError.classList.add("show");
                isValid = false;
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add("error");
                subjectError.classList.add("show");
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.classList.add("error");
                messageError.classList.add("show");
                isValid = false;
            }

            // If Valid -> Show Success Message (Client-Side Only)
            if (isValid) {
                const senderName = nameInput.value.trim();
                
                formAlert.className = "form-alert success";
                formAlert.style.display = "block";
                formAlert.textContent = `Thank you, ${senderName}! Your message has been validated and sent successfully. I will get back to you soon.`;

                // Reset Form Fields
                contactForm.reset();

                // Hide Alert after 6 seconds
                setTimeout(() => {
                    formAlert.style.display = "none";
                }, 6000);
            }
        });
    }


    /* ----------------------------------------------------------------------
       7. BACK TO TOP BUTTON
       ---------------------------------------------------------------------- */
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    document.body.appendChild(backToTopBtn);

    // Show/Hide back-to-top button depending on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    // Smooth scroll to top on button click
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});