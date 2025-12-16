// 配置参数
const MAX_HEARTS = 100; // 最大爱心数量
const HEART_SIZE_MIN = 12; // 最小爱心大小
const HEART_SIZE_MAX = 30; // 最大爱心大小
const ANIMATION_DURATION_MIN = 2; // 最小动画持续时间
const ANIMATION_DURATION_MAX = 5; // 最大动画持续时间
const CREATE_INTERVAL = 300; // 创建爱心的时间间隔（毫秒）

// 爱心颜色数组
const HEART_COLORS = [
    '#ff4d6d', // 粉红色
    '#ff6b9d', // 浅粉色
    '#f72585', // 深粉色
    '#b5179e', // 紫色
    '#7209b7', // 深紫色
    '#560bad', // 紫蓝色
    '#480ca8', // 蓝色
    '#3a0ca3', // 深蓝色
    '#3f37c9', // 靛蓝色
    '#4361ee', // 亮蓝色
    '#4895ef', // 浅蓝色
    '#4cc9f0'  // 青色
];

// 获取DOM元素
const heartsContainer = document.getElementById('heartsContainer');

// 随机数生成函数
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// 随机颜色生成函数
function getRandomColor() {
    const index = Math.floor(getRandom(0, HEART_COLORS.length));
    return HEART_COLORS[index];
}

// 创建爱心元素
function createHeart(x = null, y = null) {
    // 检查是否达到最大爱心数量
    if (heartsContainer.children.length >= MAX_HEARTS) {
        return;
    }

    // 创建爱心元素
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // 设置爱心位置
    if (x !== null && y !== null) {
        // 如果提供了位置，使用绝对定位
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.position = 'absolute';
        heart.style.animation = 'none';
    } else {
        // 否则随机位置
        const leftPosition = getRandom(0, 100);
        heart.style.left = `${leftPosition}%`;
    }

    // 设置爱心大小
    const size = getRandom(HEART_SIZE_MIN, HEART_SIZE_MAX);
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // 设置爱心颜色
    heart.style.backgroundColor = getRandomColor();

    // 设置动画属性（如果不是点击生成的）
    if (x === null && y === null) {
        const delay = getRandom(0, 1);
        heart.style.animationDelay = `${delay}s`;

        const duration = getRandom(ANIMATION_DURATION_MIN, ANIMATION_DURATION_MAX);
        heart.style.animationDuration = `${duration}s`;

        heart.style.opacity = getRandom(0.7, 1);
    }

    // 添加点击事件
    heart.addEventListener('click', () => explodeHeart(heart));

    // 添加到容器
    heartsContainer.appendChild(heart);

    // 如果是自动生成的爱心，添加动画结束事件
    if (x === null && y === null) {
        heart.addEventListener('animationend', () => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        });
    }

    return heart;
}

// 爱心爆炸效果
function explodeHeart(heart) {
    // 生成爆炸的小爱心
    const fragmentCount = 8;
    
    for (let i = 0; i < fragmentCount; i++) {
        const fragment = document.createElement('div');
        fragment.classList.add('heart');
        fragment.classList.add('explode');
        
        // 设置碎片大小
        const size = heart.offsetWidth * 0.4;
        fragment.style.width = `${size}px`;
        fragment.style.height = `${size}px`;
        
        // 设置碎片颜色
        fragment.style.backgroundColor = heart.style.backgroundColor;
        
        // 设置碎片位置
        fragment.style.left = `${heart.offsetLeft + heart.offsetWidth / 2}px`;
        fragment.style.top = `${heart.offsetTop + heart.offsetHeight / 2}px`;
        fragment.style.position = 'absolute';
        
        // 计算碎片飞出的方向
        const angle = (Math.PI * 2 * i) / fragmentCount;
        const distance = getRandom(50, 150);
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        // 设置CSS变量
        fragment.style.setProperty('--end-x', `${endX}px`);
        fragment.style.setProperty('--end-y', `${endY}px`);
        
        // 添加到容器
        heartsContainer.appendChild(fragment);
        
        // 动画结束后移除
        fragment.addEventListener('animationend', () => {
            if (fragment.parentNode) {
                fragment.parentNode.removeChild(fragment);
            }
        });
    }
    
    // 移除原爱心
    if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
    }
}

// 点击屏幕生成爱心
function handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    
    // 创建多个爱心
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeart(x, y);
        }, i * 50);
    }
}

// 自动创建爱心
function autoCreateHearts() {
    setInterval(() => {
        createHeart();
    }, CREATE_INTERVAL);
}

// 初始化函数
function init() {
    // 添加点击事件
    document.addEventListener('click', handleClick);
    
    // 开始自动创建爱心
    autoCreateHearts();
    
    // 初始化时创建一批爱心
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
