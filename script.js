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

        // Visual Breakdown Elements
        const principalBar = document.getElementById('principal-bar');
        const interestBar = document.getElementById('interest-bar');
        const principalPercentText = document.getElementById('principal-percent');
        const interestPercentText = document.getElementById('interest-percent');

        const formatCurrency = (num) => {
            return '₹' + Math.round(num).toLocaleString('en-IN');
        };

        const formatToIndianWords = (num) => {
            if (num >= 10000000) return (num / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
            if (num >= 100000) return (num / 100000).toFixed(2).replace(/\.00$/, '') + ' L';
            if (num >= 1000) return (num / 1000).toFixed(2).replace(/\.00$/, '') + ' K';
            return num.toString();
        };

        const updateSliderFill = (input) => {
            // Calculates the percentage of the slider's position for dynamic CSS filling
            const value = (input.value - input.min) / (input.max - input.min) * 100;
            input.style.setProperty('--slider-fill', `${value}%`);
        };

        const calculateEMI = () => {
            requestAnimationFrame(() => {
                const p = parseFloat(loanAmountInput.value);
                const r = parseFloat(interestRateInput.value) / 12 / 100;
                const n = parseFloat(loanTenureInput.value) * 12;

                const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalPayment = emi * n;
                const totalInterest = totalPayment - p;

                // Update Texts
                amountVal.innerHTML = `${Math.round(p).toLocaleString('en-IN')} <small style="opacity:0.8; margin-left:4px;">(${formatToIndianWords(p)})</small>`;
                rateVal.innerText = interestRateInput.value;
                tenureVal.innerText = loanTenureInput.value;

                emiResult.innerText = formatCurrency(emi);
                interestResult.innerText = formatCurrency(totalInterest);
                totalResult.innerText = formatCurrency(totalPayment);

                // Update Visual Breakdown Bar
                const principalPercentage = (p / totalPayment) * 100;
                const interestPercentage = (totalInterest / totalPayment) * 100;

                principalBar.style.width = `${principalPercentage}%`;
                interestBar.style.width = `${interestPercentage}%`;

                principalPercentText.innerText = `${principalPercentage.toFixed(1)}%`;
                interestPercentText.innerText = `${interestPercentage.toFixed(1)}%`;

                // Update Slider Fills
                updateSliderFill(loanAmountInput);
                updateSliderFill(interestRateInput);
                updateSliderFill(loanTenureInput);
            });
        };

        // Add Event Listeners
        [loanAmountInput, interestRateInput, loanTenureInput].forEach(input => {
            input.addEventListener('input', () => {
                calculateEMI();
            });
        });

        // Initialize
        calculateEMI();
    }


    // =========================================
    // PREMIUM FAQ ACCORDION LOGIC
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        
        questionButton.addEventListener('click', () => {
            // Check if the clicked item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items to keep the UI clean (Optional, but very Apple-like)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // If it wasn't active before, open it now
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});