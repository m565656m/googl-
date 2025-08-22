// التنقل والرسوم المتحركة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تنظيم القائمة المتحركة
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // تأثيرات التمرير
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر لإضافة تأثيرات عند التمرير
    document.querySelectorAll('.step, .ad-card, .footer-section').forEach(el => {
        observer.observe(el);
    });
    
    // تأثيرات التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// تحميل بيانات المستخدم
function loadUserData() {
    const savedPoints = localStorage.getItem('userPoints');
    const pointsValue = document.getElementById('heroPoints');
    
    if (pointsValue && savedPoints) {
        pointsValue.textContent = parseInt(savedPoints).toLocaleString();
        
        // تحديث شريط التقدم
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            const points = parseInt(savedPoints);
            const progressPercent = Math.min((points / 100) * 100, 100);
            progressBar.style.width = `${progressPercent}%`;
        }
    }
}

// تأثيرات عند التمرير
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});