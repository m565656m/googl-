// إدارة نظام النقاط
class PointsSystem {
    constructor() {
        this.points = 0;
        this.init();
    }
    
    init() {
        this.loadPoints();
        this.setupEventListeners();
    }
    
    loadPoints() {
        const savedPoints = localStorage.getItem('userPoints');
        this.points = savedPoints ? parseInt(savedPoints) : 0;
        this.updatePointsDisplay();
    }
    
    savePoints() {
        localStorage.setItem('userPoints', this.points.toString());
        this.updatePointsDisplay();
    }
    
    addPoints(amount) {
        this.points += amount;
        this.savePoints();
        
        // عرض إشعار
        this.showNotification(`تهانينا! لقد ربحت ${amount} نقطة`);
        
        // تأثير إضافة النقاط
        this.animatePoints(amount);
    }
    
    deductPoints(amount) {
        if (this.points >= amount) {
            this.points -= amount;
            this.savePoints();
            return true;
        }
        return false;
    }
    
    updatePointsDisplay() {
        const pointsElements = document.querySelectorAll('.points-value');
        pointsElements.forEach(el => {
            el.textContent = this.points.toLocaleString();
        });
        
        // تحديث شريط التقدم
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            const progressPercent = Math.min((this.points / 100) * 100, 100);
            progressBar.style.width = `${progressPercent}%`;
        }
    }
    
    showNotification(message) {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // إضافة الأنماط
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        `;
        
        document.body.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثوان
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    animatePoints(amount) {
        const pointsElement = document.getElementById('heroPoints');
        if (!pointsElement) return;
        
        // تأثير الرقم المتزايد
        const startPoints = this.points - amount;
        const endPoints = this.points;
        const duration = 1500;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const currentPoints = Math.floor(startPoints + (progress * amount));
            pointsElement.textContent = currentPoints.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    setupEventListeners() {
        // استمع لأحداث إضافة النقاط من الصفحات الأخرى
        document.addEventListener('pointsAdded', (e) => {
            this.addPoints(e.detail.amount);
        });
    }
}

// تهيئة نظام النقاط عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.pointsSystem = new PointsSystem();
});

// أنماط الإشعارات
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
    }
    
    .notification-content i {
        color: #4caf50;
        margin-left: 0.5rem;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);