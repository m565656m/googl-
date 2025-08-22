// إعلانات عينة للعرض
const sampleAds = [
    {
        id: 1,
        type: "فيديو",
        title: "إعلان فيديو عن منتج جديد",
        description: "شاهد هذا الفيديو القصير عن منتجنا الجديد لمدة 30 ثانية واكسب 10 نقاط.",
        points: 10,
        duration: "30 ثانية",
        category: "فيديو"
    },
    {
        id: 2,
        type: "صورة",
        title: "عرض خاص على المنتجات",
        description: "اطلع على هذا العرض المميز لمدة 15 ثانية واكسب 5 نقاط.",
        points: 5,
        duration: "15 ثانية",
        category: "صور"
    },
    {
        id: 3,
        type: "استبيان",
        title: "استبيان رأي العملاء",
        description: "أجب على 5 أسئلة قصيرة حول تجربتك واكسب 15 نقطة.",
        points: 15,
        duration: "2 دقيقة",
        category: "استبيانات"
    },
    {
        id: 4,
        type: "فيديو",
        title: "إعلان ترويجي للخدمات",
        description: "شاهد هذا الفيديو التعريفي عن خدماتنا لمدة 45 ثانية واكسب 15 نقطة.",
        points: 15,
        duration: "45 ثانية",
        category: "فيديو"
    },
    {
        id: 5,
        type: "صورة",
        title: "عرض نهاية الأسبوع",
        description: "تعرف على عروض نهاية الأسبوع الحصرية واكسب 7 نقاط.",
        points: 7,
        duration: "20 ثانية",
        category: "صور"
    },
    {
        id: 6,
        type: "استبيان",
        title: "تقييم الخدمة",
        description: "ساعدنا في تحسين خدماتك من خلال الإجابة على 7 أسئلة قصيرة واكسب 20 نقطة.",
        points: 20,
        duration: "3 دقائق",
        category: "استبيانات"
    }
];

// عرض الإعلانات في الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const adsContainer = document.querySelector('.ads-container');
    
    if (adsContainer) {
        displayAds(sampleAds);
        setupFilterButtons();
    }
});

function displayAds(ads) {
    const adsContainer = document.querySelector('.ads-container');
    adsContainer.innerHTML = '';
    
    if (ads.length === 0) {
        adsContainer.innerHTML = `
            <div class="no-ads">
                <i class="fas fa-ad"></i>
                <h3>لا توجد إعلانات متاحة حالياً</h3>
                <p>يرجى التحقق لاحقاً للحصول على إعلانات جديدة</p>
            </div>
        `;
        return;
    }
    
    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.className = 'ad-item-detailed';
        adElement.innerHTML = `
            <div class="ad-header">
                <span class="ad-type">${ad.type}</span>
                <span class="ad-points-large">+${ad.points} نقاط</span>
            </div>
            <div class="ad-content-detailed">
                <h3 class="ad-title">${ad.title}</h3>
                <p class="ad-description">${ad.description}</p>
                <div class="ad-meta">
                    <span><i class="fas fa-clock"></i> ${ad.duration}</span>
                    <span><i class="fas fa-coins"></i> ${ad.points} نقاط</span>
                </div>
                <div class="ad-action">
                    <button class="watch-ad-btn-large" data-ad-id="${ad.id}">شاهد الإعلان</button>
                    <div class="ad-countdown" id="countdown-${ad.id}"></div>
                </div>
            </div>
        `;
        
        adsContainer.appendChild(adElement);
    });
    
    // إضافة مستمعي الأحداث للأزرار
    document.querySelectorAll('.watch-ad-btn-large').forEach(btn => {
        btn.addEventListener('click', function() {
            const adId = this.getAttribute('data-ad-id');
            const ad = sampleAds.find(a => a.id == adId);
            if (ad) {
                simulateAdView(ad);
            }
        });
    });
}

function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر الحالي
            this.classList.add('active');
            
            // تصفية الإعلانات
            const filter = this.textContent.trim();
            filterAds(filter);
        });
    });
}

function filterAds(filter) {
    let filteredAds = [];
    
    if (filter === 'الكل') {
        filteredAds = sampleAds;
    } else if (filter === 'فيديو') {
        filteredAds = sampleAds.filter(ad => ad.category === 'فيديو');
    } else if (filter === 'صور') {
        filteredAds = sampleAds.filter(ad => ad.category === 'صور');
    } else if (filter === 'استبيانات') {
        filteredAds = sampleAds.filter(ad => ad.category === 'استبيانات');
    } else if (filter === 'الأعلى ربحًا') {
        filteredAds = [...sampleAds].sort((a, b) => b.points - a.points);
    }
    
    displayAds(filteredAds);
}

function simulateAdView(ad) {
    const btn = document.querySelector(`.watch-ad-btn-large[data-ad-id="${ad.id}"]`);
    const countdownEl = document.getElementById(`countdown-${ad.id}`);
    
    if (!btn || !countdownEl) return;
    
    // تعطيل الزر أثناء المشاهدة
    btn.disabled = true;
    btn.textContent = 'جاري التحميل...';
    
    // محاكاة وقت التحميل
    setTimeout(() => {
        btn.textContent = 'جاري التشغيل...';
        
        // محاكاة وقت المشاهدة مع عد تنازلي
        let timeLeft = ad.duration.includes('ثانية') ? 
            parseInt(ad.duration) : 
            ad.duration.includes('دقيقة') ? 
            parseInt(ad.duration) * 60 : 30;
        
        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                countdownEl.textContent = `متبقي: ${timeLeft} ثانية`;
                timeLeft--;
            } else {
                clearInterval(countdownInterval);
                countdownEl.textContent = '';
                
                // منح النقاط للمستخدم
                if (window.pointsSystem) {
                    window.pointsSystem.addPoints(ad.points);
                }
                
                // إعادة تعيين الزر
                btn.disabled = false;
                btn.textContent = 'شاهد الإعلان';
                
                // عرض رسالة النجاح
                alert(`تهانينا! لقد ربحت ${ad.points} نقاط من مشاهدة الإعلان`);
            }
        }, 1000);
    }, 2000);
}