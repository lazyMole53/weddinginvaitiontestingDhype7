const weddingDate = new Date(2025, 10, 22, 14, 30, 0);
const venueMapUrl = 'https://maps.app.goo.gl/vr7eccefZHPzVgNY7?g_st=atm';

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = formatNumber(days);
    document.getElementById('hours').textContent = formatNumber(hours);
    document.getElementById('minutes').textContent = formatNumber(minutes);
    document.getElementById('seconds').textContent = formatNumber(seconds);

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = `
            <div style="font-family: 'Amiri', serif; font-size: 2rem; color: var(--primary-gold); padding: 20px;">
                🎉 مبارك! اليوم هو يوم الحفل 🎉
            </div>
        `;
    }
}

function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

setInterval(updateCountdown, 1000);
updateCountdown();

document.addEventListener('DOMContentLoaded', function() {
    
    const welcomeScreen = document.getElementById('welcomeScreen');
    const openInvitationBtn = document.getElementById('openInvitationBtn');
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (openInvitationBtn && welcomeScreen) {
        openInvitationBtn.addEventListener('click', function() {
            welcomeScreen.classList.add('hidden');
            
            if (backgroundMusic) {
                backgroundMusic.play().then(() => {
                    console.log('✅ تم تشغيل الموسيقى!');
                    if (playIcon && pauseIcon && musicToggle) {
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'inline';
                        musicToggle.classList.add('playing');
                    }
                }).catch((error) => {
                    console.log('⚠️ لم يتم تشغيل الموسيقى:', error);
                });
            }
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 800);
        });
    }

    const mapButton = document.getElementById('mapButton');
    
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            window.open(venueMapUrl, '_blank');
        });
    }

    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                musicToggle.classList.add('playing');
            } else {
                backgroundMusic.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
                musicToggle.classList.remove('playing');
            }
        });
    }

    let autoScrollInterval;
    let inactivityTimer;
    let isAutoScrolling = false;
    let autoScrollEnabled = false;
    const inactivityDelay = 6500;
    const scrollSpeed = 5;
    const scrollStepDelay = 50;
    
    function startAutoScroll() {
        if (isAutoScrolling || !autoScrollEnabled) return;
        
        isAutoScrolling = true;
        console.log('🔄 بدء التمرير التلقائي...');
        
        autoScrollInterval = setInterval(() => {
            window.scrollBy({
                top: scrollSpeed,
                behavior: 'auto'
            });
            
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                stopAutoScroll();
                console.log('✅ وصلنا لنهاية الصفحة');
            }
        }, scrollStepDelay);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
            console.log('⏸️ تم إيقاف التمرير التلقائي');
        }
        isAutoScrolling = false;
    }
    
    function resetInactivityTimer(event) {
        if (!autoScrollEnabled) return;
        
        if (event && event.type === 'scroll' && isAutoScrolling) {
            return;
        }
        
        stopAutoScroll();
        
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
        
        console.log('🔄 إعادة ضبط المؤقت - 10 ثوانٍ جديدة');
        
        inactivityTimer = setTimeout(() => {
            console.log('⏰ انتهت 10 ثوانٍ من عدم النشاط - بدء التمرير');
            startAutoScroll();
        }, inactivityDelay);
    }
    
    const userActivityEvents = [
        'mousedown',
        'keypress',
        'touchstart',
        'wheel'
    ];
    
    let lastScrollTop = 0;
    document.addEventListener('scroll', function(e) {
        if (!autoScrollEnabled) return;
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(currentScrollTop - lastScrollTop) > scrollSpeed + 1) {
            console.log('🖱️ تمرير يدوي - إعادة ضبط المؤقت');
            resetInactivityTimer(e);
        }
        
        lastScrollTop = currentScrollTop;
    }, { passive: true });
    
    function enableAutoScroll() {
        autoScrollEnabled = true;
        console.log('✅ تم تفعيل خاصية التمرير التلقائي');
        console.log('⏳ انتظار 10 ثوانٍ من عدم النشاط...');
        
        userActivityEvents.forEach(event => {
            document.addEventListener(event, resetInactivityTimer, { passive: true });
        });
        
        inactivityTimer = setTimeout(() => {
            console.log('⏰ انتهت 10 ثوانٍ - بدء التمرير التلقائي الآن!');
            startAutoScroll();
        }, inactivityDelay);
    }
    
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', () => {
            console.log('🎉 تم فتح الدعوة - سيتم تفعيل التمرير التلقائي بعد 2 ثانية');
            setTimeout(() => {
                enableAutoScroll();
            }, 2000);
        });
    } else {
        console.log('⚙️ لا توجد شاشة ترحيب - بدء التمرير التلقائي مباشرة');
        setTimeout(() => {
            enableAutoScroll();
        }, 2000);
    }

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

    const sections = document.querySelectorAll('.names-section, .invitation-text, .date-time-section, .countdown-section, .venue-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

function updateNames(groomName, brideName) {
    document.getElementById('groomName').textContent = groomName;
    document.getElementById('brideName').textContent = brideName;
}

function updateInvitationText(mainText) {
    document.getElementById('mainText').textContent = mainText;
}

function updateEventDetails(date, time) {
    document.getElementById('eventDate').textContent = date;
    document.getElementById('eventTime').textContent = time;
}

function updateVenue(venueName, venueAddress, mapUrl) {
    document.getElementById('venueName').textContent = venueName;
    document.getElementById('venueAddress').textContent = venueAddress;
    venueMapUrl = mapUrl;
}

console.log('%c💒 موقع دعوة عقد قران', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cلتعديل تاريخ الحفل، قم بتحرير المتغير weddingDate في ملف script.js', 'color: #6b6b6b;');
console.log('%cلتعديل رابط الموقع، قم بتحرير المتغير venueMapUrl في ملف script.js', 'color: #6b6b6b;');
