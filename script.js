document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.timeline-item, .work-card, .legacy-text');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    function generateBinaryCode() {
        const binaryContainer = document.querySelector('.binary-code');
        if (!binaryContainer) return;
        
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
        
        binaryContainer.textContent = binaryText;
        
        setInterval(() => {
            let newBinaryText = '';
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    newBinaryText += Math.random() > 0.5 ? '1' : '0';
                    if (j % 8 === 7) newBinaryText += ' ';
                }
                newBinaryText += '\n';
            }
            binaryContainer.textContent = newBinaryText;
        }, 2000);
    }

    generateBinaryCode();

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(42, 42, 42, 0.8)';
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 136, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'var(--accent-bg)';
            this.style.boxShadow = 'none';
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 136, 0.1)';
            this.style.borderLeft = '4px solid var(--accent-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'var(--accent-bg)';
            this.style.borderLeft = 'none';
        });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#bio').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 255, 136, 0.3)';
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
    const secretWord = 'TURING';

    document.addEventListener('keydown', (e) => {
        if (e.key.match(/[a-zA-Z]/)) {
            typedSequence += e.key.toUpperCase();
            
            if (typedSequence.length > secretWord.length) {
                typedSequence = typedSequence.slice(-secretWord.length);
            }
            
            if (typedSequence === secretWord) {
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 3000);
                
                const message = document.createElement('div');
                message.textContent = '🤖 "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human" - A.T.';
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

    console.log('🤖 Alan Turing tribute site loaded successfully');
    console.log('💡 "We can only see a short distance ahead, but we can see plenty there that needs to be done." - Alan Turing');
});