// ========================================
// إعدادات التاريخ والموقع (يمكن تعديلها بسهولة)
// ========================================

// تاريخ الحفل - عدّل هذا التاريخ حسب موعد حفلك
// التنسيق: السنة، الشهر (0 = يناير، 11 = ديسمبر)، اليوم، الساعة، الدقيقة
const weddingDate = new Date(2025, 10, 22, 14, 30, 0); // 22 نوفمبر 2025، 2:30 عصراً

// رابط موقع القاعة على خرائط جوجل - ضع رابط الموقع الحقيقي هنا
const venueMapUrl = 'https://maps.app.goo.gl/vr7eccefZHPzVgNY7?g_st=atm';

// ========================================
// العد التنازلي
// ========================================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    // حساب الأيام والساعات والدقائق والثواني
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // تحديث العرض
    document.getElementById('days').textContent = formatNumber(days);
    document.getElementById('hours').textContent = formatNumber(hours);
    document.getElementById('minutes').textContent = formatNumber(minutes);
    document.getElementById('seconds').textContent = formatNumber(seconds);

    // إذا انتهى العد التنازلي
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = `
            <div style="font-family: 'Amiri', serif; font-size: 2rem; color: var(--primary-gold); padding: 20px;">
                🎉 مبارك! اليوم هو يوم الحفل 🎉
            </div>
        `;
    }
}

// تنسيق الأرقام (إضافة صفر أمام الأرقام الأحادية)
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// تحديث العد التنازلي كل ثانية
setInterval(updateCountdown, 1000);

// تشغيل أول مرة عند تحميل الصفحة
updateCountdown();

// ========================================
// زر الخريطة
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // شاشة الترحيب
    // ========================================
    
    const welcomeScreen = document.getElementById('welcomeScreen');
    const openInvitationBtn = document.getElementById('openInvitationBtn');
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (openInvitationBtn && welcomeScreen) {
        openInvitationBtn.addEventListener('click', function() {
            // إخفاء شاشة الترحيب
            welcomeScreen.classList.add('hidden');
            
            // تشغيل الموسيقى
            if (backgroundMusic) {
                backgroundMusic.play().then(() => {
                    console.log('✅ تم تشغيل الموسيقى!');
                    // تحديث أيقونة زر الموسيقى
                    if (playIcon && pauseIcon && musicToggle) {
                        playIcon.style.display = 'none';
                        pauseIcon.style.display = 'inline';
                        musicToggle.classList.add('playing');
                    }
                }).catch((error) => {
                    console.log('⚠️ لم يتم تشغيل الموسيقى:', error);
                });
            }
            
            // إزالة العنصر من DOM بعد انتهاء الأنيميشن
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 800);
        });
    }

    const mapButton = document.getElementById('mapButton');
    
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            // فتح رابط الخريطة في نافذة جديدة
            window.open(venueMapUrl, '_blank');
        });
    }

    // ========================================
    // التحكم بالموسيقى
    // ========================================
    
    if (musicToggle && backgroundMusic) {
        // التحكم بالتشغيل والإيقاف عند الضغط على الزر
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

    // ========================================
    // التمرير التلقائي الناعم
    // ========================================
    
    let autoScrollInterval;
    let inactivityTimer;
    let isAutoScrolling = false;
    let autoScrollEnabled = false; // متغير للتحكم في تفعيل الخاصية
    const inactivityDelay = 6500; // 6.5 ثوانٍ
    const scrollSpeed = 5; // سرعة التمرير (بكسل في كل خطوة)
    const scrollStepDelay = 50; // التأخير بين كل خطوة (ميلي ثانية)
    
    // دالة بدء التمرير التلقائي
    function startAutoScroll() {
        if (isAutoScrolling || !autoScrollEnabled) return;
        
        isAutoScrolling = true;
        console.log('🔄 بدء التمرير التلقائي...');
        
        autoScrollInterval = setInterval(() => {
            // التمرير لأسفل بشكل ناعم
            window.scrollBy({
                top: scrollSpeed,
                behavior: 'auto'
            });
            
            // إيقاف التمرير عند الوصول إلى نهاية الصفحة
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                stopAutoScroll();
                console.log('✅ وصلنا لنهاية الصفحة');
            }
        }, scrollStepDelay);
    }
    
    // دالة إيقاف التمرير التلقائي
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
            console.log('⏸️ تم إيقاف التمرير التلقائي');
        }
        isAutoScrolling = false;
    }
    
    // دالة إعادة تعيين مؤقت عدم النشاط
    function resetInactivityTimer(event) {
        if (!autoScrollEnabled) return; // لا تفعل شيء إذا لم يتم تفعيل الخاصية بعد
        
        // تجاهل حدث scroll إذا كان من التمرير التلقائي
        if (event && event.type === 'scroll' && isAutoScrolling) {
            return;
        }
        
        // إيقاف التمرير التلقائي إذا كان يعمل
        stopAutoScroll();
        
        // إلغاء المؤقت السابق
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }
        
        console.log('🔄 إعادة ضبط المؤقت - 10 ثوانٍ جديدة');
        
        // بدء مؤقت جديد
        inactivityTimer = setTimeout(() => {
            console.log('⏰ انتهت 10 ثوانٍ من عدم النشاط - بدء التمرير');
            startAutoScroll();
        }, inactivityDelay);
    }
    
    // الأحداث التي تدل على نشاط المستخدم
    const userActivityEvents = [
        'mousedown',
        'keypress',
        'touchstart',
        'wheel' // حركة عجلة الفأرة
    ];
    
    // إضافة مستمع خاص للـ scroll (مع معالجة خاصة)
    let lastScrollTop = 0;
    document.addEventListener('scroll', function(e) {
        if (!autoScrollEnabled) return;
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // إذا كان التمرير يدوياً (ليس من التمرير التلقائي)
        if (Math.abs(currentScrollTop - lastScrollTop) > scrollSpeed + 1) {
            console.log('🖱️ تمرير يدوي - إعادة ضبط المؤقت');
            resetInactivityTimer(e);
        }
        
        lastScrollTop = currentScrollTop;
    }, { passive: true });
    
    // دالة لتفعيل التمرير التلقائي بعد فتح الدعوة
    function enableAutoScroll() {
        autoScrollEnabled = true;
        console.log('✅ تم تفعيل خاصية التمرير التلقائي');
        console.log('⏳ انتظار 10 ثوانٍ من عدم النشاط...');
        
        // إضافة مستمعات للأحداث
        userActivityEvents.forEach(event => {
            document.addEventListener(event, resetInactivityTimer, { passive: true });
        });
        
        // بدء المؤقت مباشرة
        inactivityTimer = setTimeout(() => {
            console.log('⏰ انتهت 10 ثوانٍ - بدء التمرير التلقائي الآن!');
            startAutoScroll();
        }, inactivityDelay);
    }
    
    // تفعيل التمرير بعد فتح الدعوة
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', () => {
            console.log('🎉 تم فتح الدعوة - سيتم تفعيل التمرير التلقائي بعد 2 ثانية');
            setTimeout(() => {
                enableAutoScroll();
            }, 2000); // بدء التتبع بعد ثانيتين من فتح الدعوة
        });
    } else {
        // إذا لم تكن هناك شاشة ترحيب، ابدأ مباشرة
        console.log('⚙️ لا توجد شاشة ترحيب - بدء التمرير التلقائي مباشرة');
        setTimeout(() => {
            enableAutoScroll();
        }, 2000);
    }

    // ========================================
    // رسوم متحركة عند التمرير (اختياري)
    // ========================================
    
    // إضافة تأثيرات عند ظهور العناصر أثناء التمرير
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

    // مراقبة الأقسام الرئيسية
    const sections = document.querySelectorAll('.names-section, .invitation-text, .date-time-section, .countdown-section, .venue-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ========================================
// دالات مساعدة لتحديث المحتوى (اختياري)
// ========================================

// يمكنك استخدام هذه الدوال لتحديث المحتوى برمجياً
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

// ========================================
// معلومات للمطورين
// ========================================

console.log('%c💒 موقع دعوة عقد قران', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cلتعديل تاريخ الحفل، قم بتحرير المتغير weddingDate في ملف script.js', 'color: #6b6b6b;');
console.log('%cلتعديل رابط الموقع، قم بتحرير المتغير venueMapUrl في ملف script.js', 'color: #6b6b6b;');
