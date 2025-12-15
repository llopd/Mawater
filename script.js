// DOM加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 开场动画
    setTimeout(() => {
        const intro = document.getElementById('intro');
        const container = document.getElementById('container');
        
        intro.style.opacity = '0';
        
        setTimeout(() => {
            intro.style.display = 'none';
            container.style.display = 'block';
        }, 1000);
    }, 2000);

    // 初始化照片轮播
    initPhotoSlider();
    
    // 初始化点击产生星星效果
    initStarClick();
    
    // 初始化惊喜盒子
    initSurpriseBox();
});

// 照片轮播功能
function initPhotoSlider() {
    const slider = document.getElementById('photoSlider');
    const slides = document.querySelectorAll('.photo-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // 显示当前幻灯片
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        showSlide(currentIndex);
    }
    
    // 自动轮播
    let autoSlide = setInterval(nextSlide, 3000);
    
    // 按钮事件监听
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, 3000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, 3000);
    });
}

// 点击产生星星效果
function initStarClick() {
    document.addEventListener('click', (e) => {
        createStar(e.clientX, e.clientY);
    });
}

// 创建星星元素
function createStar(x, y) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = x - 10 + 'px';
    star.style.top = y - 10 + 'px';
    
    // 随机大小和颜色
    const size = Math.random() * 20 + 10;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // 随机颜色（黄色系）
    const hue = Math.random() * 60 + 40;
    const saturation = Math.random() * 50 + 50;
    const lightness = Math.random() * 30 + 60;
    star.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // 随机旋转
    star.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(star);
    
    // 动画结束后移除
    setTimeout(() => {
        star.style.animation = 'floatStar 2s ease-out forwards';
        setTimeout(() => {
            star.remove();
        }, 2000);
    }, 100);
}

// 惊喜盒子功能
function initSurpriseBox() {
    const surpriseBox = document.getElementById('surpriseBox');
    let isOpened = false;
    
    surpriseBox.addEventListener('click', () => {
        if (isOpened) return;
        
        isOpened = true;
        surpriseBox.classList.add('open');
        
        // 创建漂浮星星效果
        createFloatingStars();
        
        // 更新盒子内容
        const boxContent = surpriseBox.querySelector('.box-content');
        boxContent.innerHTML = `
            <h4>✨ 惊喜！✨</h4>
            <p style="font-size: 1.2rem; color: #ff6b6b;">友谊长存！</p>
        `;
    });
}

// 创建漂浮星星效果
function createFloatingStars() {
    // 创建大量星星
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createStar(x, y);
        }, i * 50);
    }
}

// 添加页面滚动效果
document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.photo-section');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// 添加照片悬停效果
document.addEventListener('DOMContentLoaded', () => {
    const photos = document.querySelectorAll('.photo-slide img');
    
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', () => {
            photo.style.transform = 'scale(1.1)';
        });
        
        photo.addEventListener('mouseleave', () => {
            photo.style.transform = 'scale(1)';
        });
    });
});