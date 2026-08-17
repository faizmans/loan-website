document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Navbar & Scroll Detection
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
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

    // 3. Smooth Scroll Intersection Observers (Reveal Animations)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Dynamic Statistics Counter
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                // If float, handle differently
                const isFloat = entry.target.getAttribute('data-target').includes('.');
                const increment = target / 50; // Speed of counting

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

    // 5. Interactive EMI Calculator Logic
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTenureInput = document.getElementById('loan-tenure');

    const amountVal = document.getElementById('amount-val');
    const rateVal = document.getElementById('rate-val');
    const tenureVal = document.getElementById('tenure-val');

    const emiResult = document.getElementById('emi-result');
    const interestResult = document.getElementById('interest-result');
    const totalResult = document.getElementById('total-result');

    const formatCurrency = (num) => {
        return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
    };

    const calculateEMI = () => {
        const p = parseFloat(loanAmountInput.value);
        const r = parseFloat(interestRateInput.value) / 12 / 100;
        const n = parseFloat(loanTenureInput.value) * 12;

        // EMI Formula: P * R * (1+R)^N / ((1+R)^N - 1)
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;

        // Update UI Text
        amountVal.innerText = formatCurrency(p).replace('$', '');
        rateVal.innerText = interestRateInput.value;
        tenureVal.innerText = loanTenureInput.value;

        // Update Results
        emiResult.innerText = formatCurrency(emi);
        interestResult.innerText = formatCurrency(totalInterest);
        totalResult.innerText = formatCurrency(totalPayment);
    };

    // Add Event Listeners to Sliders
    [loanAmountInput, interestRateInput, loanTenureInput].forEach(input => {
        input.addEventListener('input', calculateEMI);
    });

    // Initial Calculation
    calculateEMI();

    // 6. Dynamic Footer Year
    document.getElementById('current-year').innerText = new Date().getFullYear();
});

// =========================================
    // 1. PRELOADER LOGIC
    // =========================================
    // Wait for the full cinematic SVG animation to finish (2.8 seconds), then reveal the site
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2800);

    // =========================================
    // 2. DYNAMIC HERO TEXT ROTATOR
    // =========================================
    const dynamicTextElement = document.getElementById('dynamic-text');
    const words = ["Financing", "Mortgages", "Capital", "Wealth"];
    let wordIndex = 0;

    setInterval(() => {
        // Fade out
        dynamicTextElement.classList.add('text-fade-out');
        
        setTimeout(() => {
            // Change word while invisible
            wordIndex = (wordIndex + 1) % words.length;
            dynamicTextElement.innerText = words[wordIndex];
            
            // Fade back in
            dynamicTextElement.classList.remove('text-fade-out');
        }, 400); // Matches the CSS transition time
    }, 3500); // Changes every 3.5 seconds