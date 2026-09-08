// =========================================================================
// MAIN JAVASCRIPT FILE - GUIDANCE POINT CONSULTING
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. PRELOADER LOGIC (Runs First)
    // =========================================
    // Waits 2.8 seconds for the cinematic SVG animation to finish, then adds the 'loaded' class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2800); 

    // =========================================
    // 2. DYNAMIC HERO TEXT ROTATOR
    // =========================================
    const dynamicTextElement = document.getElementById('dynamic-text');
    if (dynamicTextElement) {
        const words = ["Financing,", "Mortgages,", "Capital,", "Wealth,"];
        let wordIndex = 0;

        setInterval(() => {
            dynamicTextElement.classList.add('text-fade-out');
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                dynamicTextElement.innerText = words[wordIndex];
                dynamicTextElement.classList.remove('text-fade-out');
            }, 400); 
        }, 3500); 
    }

    // =========================================
    // 3. DYNAMIC NAVBAR SCROLL EFFECT
    // =========================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // =========================================
    // 4. MOBILE MENU TOGGLE
    // =========================================
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        const navItems = document.querySelectorAll('.nav-links a');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // =========================================
    // 5. SMOOTH SCROLL REVEAL ANIMATIONS
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =========================================
    // 6. DYNAMIC STATISTICS COUNTER
    // =========================================
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetAttr = entry.target.getAttribute('data-target');
                    const target = parseFloat(targetAttr);
                    let count = 0;
                    
                    const isFloat = targetAttr.includes('.');
                    const increment = target / 60; // Smoothness speed

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            entry.target.innerText = isFloat ? count.toFixed(1) : Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // =========================================
    // 7. INTERACTIVE & SMOOTH EMI CALCULATOR
    // =========================================
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTenureInput = document.getElementById('loan-tenure');

    if (loanAmountInput && interestRateInput && loanTenureInput) {
        const amountVal = document.getElementById('amount-val');
        const rateVal = document.getElementById('rate-val');
        const tenureVal = document.getElementById('tenure-val');

        const emiResult = document.getElementById('emi-result');
        const interestResult = document.getElementById('interest-result');
        const totalResult = document.getElementById('total-result');

        const principalBar = document.getElementById('principal-bar');
        const interestBar = document.getElementById('interest-bar');
        const principalPercent = document.getElementById('principal-percent');
        const interestPercent = document.getElementById('interest-percent');

        const formatCurrency = (num) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(num);
        };

        const formatShortAmount = (amount) => {
            if (amount >= 10000000) {
                let cr = (amount / 10000000).toFixed(2);
                return parseFloat(cr) + ' Cr';
            } else if (amount >= 100000) {
                let lk = (amount / 100000).toFixed(2);
                return parseFloat(lk) + ' L';
            }
            return amount;
        };

        function calculateEMI() {
            const principal = parseFloat(loanAmountInput.value);
            const annualRate = parseFloat(interestRateInput.value);
            const tenureYears = parseFloat(loanTenureInput.value);

            updateSliderColors();

            const formattedPrincipal = new Intl.NumberFormat('en-IN').format(principal);
            amountVal.innerHTML = `${formattedPrincipal} <small style="opacity:0.8; margin-left:4px;">(${formatShortAmount(principal)})</small>`;
            rateVal.innerText = annualRate + '%';
            tenureVal.innerText = tenureYears + ' Yrs';

            const r = annualRate / 12 / 100; 
            const n = tenureYears * 12;      

            let emi = 0;
            let totalAmount = 0;
            let totalInterest = 0;

            if (annualRate === 0) {
                emi = principal / n;
                totalAmount = principal;
                totalInterest = 0;
            } else {
                emi = principal * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
                totalAmount = emi * n;
                totalInterest = totalAmount - principal;
            }

            emiResult.innerText = formatCurrency(emi);
            interestResult.innerText = formatCurrency(totalInterest);
            totalResult.innerText = formatCurrency(totalAmount);

            const principalPercentage = (principal / totalAmount) * 100;
            const interestPercentage = (totalInterest / totalAmount) * 100;

            principalBar.style.width = principalPercentage + '%';
            interestBar.style.width = interestPercentage + '%';
            
            principalPercent.innerText = principalPercentage.toFixed(1) + '%';
            interestPercent.innerText = interestPercentage.toFixed(1) + '%';
        }

        function updateSliderColors() {
            [loanAmountInput, interestRateInput, loanTenureInput].forEach(slider => {
                const min = slider.min || 0;
                const max = slider.max || 100;
                const val = slider.value;
                const percentage = ((val - min) / (max - min)) * 100;
                slider.style.setProperty('--slider-fill', percentage + '%');
            });
        }

        loanAmountInput.addEventListener('input', calculateEMI);
        interestRateInput.addEventListener('input', calculateEMI);
        loanTenureInput.addEventListener('input', calculateEMI);

        calculateEMI();
    }

    // =========================================
    // 8. PREMIUM FAQ ACCORDION LOGIC
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        
        questionButton.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================
    // 9. DYNAMIC MARKET TICKER PLACEMENT
    // =========================================
    const ticker = document.getElementById('market-ticker');
    if (navbar && ticker) {
        function updateTickerPosition() {
            const navHeight = navbar.offsetHeight;
            ticker.style.top = `${navHeight}px`;
        }
        updateTickerPosition();
        window.addEventListener('resize', updateTickerPosition);
        window.addEventListener('scroll', updateTickerPosition);
    }
// =========================================
    // 10. VIP CONCIERGE EXIT-INTENT POPUP
    // =========================================
    const exitOverlay = document.getElementById('vip-exit-overlay');
    const closeBtn = document.getElementById('close-concierge');
    
    if (exitOverlay && closeBtn) {
        
        const showConcierge = () => {
            const hasSeenPopup = sessionStorage.getItem('conciergeShown');
            if (!hasSeenPopup) {
                // Small delay ensures CSS display kicks in before opacity transition
                setTimeout(() => {
                    exitOverlay.classList.add('active');
                }, 10);
                sessionStorage.setItem('conciergeShown', 'true');
            }
        };

        // --- DESKTOP LOGIC ---
        document.addEventListener('mouseleave', (e) => {
            // Trigger when mouse leaves the top boundary of the viewport
            if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
                showConcierge();
            }
        });

        // --- MOBILE LOGIC (Optimized Scroll Detection) ---
        let lastScrollY = window.scrollY;
        let isScrolling;

        window.addEventListener('scroll', () => {
            // Clear the timeout throughout the scroll
            window.clearTimeout(isScrolling);

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(() => {
                const currentScrollY = window.scrollY;
                const scrollSpeed = lastScrollY - currentScrollY; // Positive means scrolling UP
                
                // If they scroll UP by more than 40px, and are far enough down the page
                if (scrollSpeed > 40 && currentScrollY > 600) {
                    showConcierge();
                }
                lastScrollY = currentScrollY;
            }, 50); // Checks every 50ms during scroll
        }, { passive: true });

        // --- FALLBACK LOGIC ---
        // Trigger after 45 seconds of reading
        setTimeout(showConcierge, 45000); 

        // --- CLOSE LOGIC ---
        const closePopup = () => {
            exitOverlay.classList.remove('active');
        };

        closeBtn.addEventListener('click', closePopup);

        exitOverlay.addEventListener('click', (e) => {
            // Only close if they click the dark background, not the white card itself
            if (e.target === exitOverlay) {
                closePopup();
            }
        });
    }

    
    // =========================================
    // [FUTURE UPDATES GO HERE]
    // =========================================
    
    // --> Add new Javascript logic below this line <--


}); // <-- End of DOMContentLoaded block