document.addEventListener('DOMContentLoaded', function() {
    
    let currentPage = 'turing';
    const turingPage = document.getElementById('turing-page');
    const adaPage = document.getElementById('ada-page');
    
    function switchPage() {
        if (currentPage === 'turing') {
            turingPage.classList.remove('active');
            adaPage.classList.add('active', 'page-transition');
            document.body.classList.add('ada-theme');
            currentPage = 'ada';
            updateFooterQuote();
        } else {
            adaPage.classList.remove('active');
            turingPage.classList.add('active', 'page-transition');
            document.body.classList.remove('ada-theme');
            currentPage = 'turing';
            updateFooterQuote();
        }
        
        setTimeout(() => {
            const activeElements = document.querySelectorAll('.page.active .timeline-item, .page.active .work-card, .page.active .legacy-text');
            activeElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, Math.random() * 200);
            });
        }, 100);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateFooterQuote() {
        const footerQuote = document.getElementById('footer-quote');
        if (currentPage === 'ada') {
            footerQuote.textContent = '"The more I study, the more insatiable do I feel my genius for it to be." - Ada Lovelace';
        } else {
            footerQuote.textContent = '"Sometimes it is the people no one expects anything from who do the things that no one can imagine."';
        }
    }
    
    const pageSwitchButtons = document.querySelectorAll('.page-switch');
    pageSwitchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            switchPage();
        });
    });
    
    const clickableTitles = document.querySelectorAll('.clickable-title');
    clickableTitles.forEach(title => {
        title.addEventListener('click', function() {
            switchPage();
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-links a:not(.page-switch)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = currentPage === 'ada' ? 'rgba(26, 10, 26, 0.98)' : 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = currentPage === 'ada' ? '0 2px 20px rgba(255, 105, 180, 0.1)' : '0 2px 20px rgba(0, 255, 136, 0.1)';
        } else {
            nav.style.background = currentPage === 'ada' ? 'rgba(26, 10, 26, 0.95)' : 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('.page.active .section');
            if (firstSection) {
                const offsetTop = firstSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    function generateBinaryCode() {
        const binaryElements = document.querySelectorAll('.binary-code');
        binaryElements.forEach(element => {
            let binaryText = '';
            const rows = 50;
            const cols = 40;
            
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    binaryText += Math.random() > 0.5 ? '1' : '0';
                    if (j % 8 === 7) binaryText += ' ';
                }
                binaryText += '\n';
            }
            element.textContent = binaryText;
        });
    }
    
    generateBinaryCode();
    setInterval(generateBinaryCode, 2000);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.timeline-item, .work-card, .legacy-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroes = document.querySelectorAll('.hero');
        heroes.forEach(hero => {
            if (hero.closest('.page').classList.contains('active')) {
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent) {
                    const rate = scrolled * -0.5;
                    heroContent.style.transform = `translateY(${rate}px)`;
                }
            }
        });
    });
    
    function typeWriter(element, text, speed = 100) {
        element.innerHTML = '';
        let i = 0;
        const timer = setInterval(function() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const isAda = currentPage === 'ada';
            this.style.background = isAda ? 'rgba(58, 42, 58, 0.8)' : 'rgba(42, 42, 42, 0.8)';
            this.style.boxShadow = isAda ? '0 25px 50px rgba(255, 105, 180, 0.15)' : '0 25px 50px rgba(0, 255, 136, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'var(--accent-bg)';
            this.style.boxShadow = 'none';
        });
    });
    
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const isAda = currentPage === 'ada';
            this.style.background = isAda ? 'rgba(255, 105, 180, 0.1)' : 'rgba(0, 255, 136, 0.1)';
            this.style.borderLeft = '4px solid var(--accent-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'var(--accent-bg)';
            this.style.borderLeft = 'none';
        });
    });
    
    function createParticle() {
        const particle = document.createElement('div');
        const isAda = currentPage === 'ada';
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = isAda ? 'rgba(255, 105, 180, 0.3)' : 'rgba(0, 255, 136, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const animation = particle.animate([
            { transform: 'translateY(-10px)', opacity: 0 },
            { transform: 'translateY(50px)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    setInterval(createParticle, 3000);
    
    let typedSequence = '';
    const secretWords = { turing: 'TURING', ada: 'LOVELACE' };
    
    document.addEventListener('keydown', (e) => {
        if (e.key.match(/[a-zA-Z]/)) {
            typedSequence += e.key.toUpperCase();
            const currentSecretWord = secretWords[currentPage];
            
            if (typedSequence.length > currentSecretWord.length) {
                typedSequence = typedSequence.slice(-currentSecretWord.length);
            }
            
            if (typedSequence === currentSecretWord) {
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 3000);
                
                const messages = {
                    turing: '🤖 "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human" - A.T.',
                    ada: '💎 "The Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform." - A.L.'
                };
                
                const message = document.createElement('div');
                message.textContent = messages[currentPage];
                message.style.position = 'fixed';
                message.style.top = '50%';
                message.style.left = '50%';
                message.style.transform = 'translate(-50%, -50%)';
                message.style.background = 'rgba(0, 0, 0, 0.95)';
                message.style.color = 'var(--accent-color)';
                message.style.padding = '2rem';
                message.style.borderRadius = '10px';
                message.style.fontSize = '1.1rem';
                message.style.textAlign = 'center';
                message.style.zIndex = '9999';
                message.style.fontFamily = 'Courier New, monospace';
                message.style.maxWidth = '80%';
                message.style.border = '2px solid var(--accent-color)';
                message.style.animation = 'fadeInUp 0.5s ease';
                
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.style.opacity = '0';
                    setTimeout(() => message.remove(), 500);
                }, 4000);
                
                typedSequence = '';
            }
        }
    });
    
    window.addEventListener('resize', function() {
        const activeElements = document.querySelectorAll('.page.active .timeline-item, .page.active .work-card');
        activeElements.forEach(el => {
            el.style.transition = 'none';
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 100);
        });
    });
    
    updateFooterQuote();
    
    setTimeout(() => {
        const initialElements = document.querySelectorAll('.page.active .hero-content');
        initialElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 500);
    
    console.log('💡 "We can only see a short distance ahead, but we can see plenty there that needs to be done." - Alan Turing');
});