// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initIntroAnimation();
    initSurpriseBox();
    initDateDisplay();
    initConfetti();
    initChatbot(); // 初始化聊天机器人
});

// 开场动画函数
function initIntroAnimation() {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');
    
    // 3秒后隐藏开场动画，显示主内容
    setTimeout(() => {
        intro.classList.add('hidden');
        mainContent.classList.add('visible');
    }, 3000);
}

// 照片轮播函数
function initPhotoSlider() {
    const slides = document.querySelectorAll('.photo-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;
    
    // 显示当前幻灯片
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }
    
    // 上一张幻灯片
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
        resetSlideInterval();
    }
    
    // 下一张幻灯片
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
        resetSlideInterval();
    }
    
    // 重置自动播放定时器
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // 开始自动播放
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 3000); // 3秒切换一次
    }
    
    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    const photoContainer = document.querySelector('.photo-container');
    
    photoContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    photoContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // 向左滑动，下一张
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // 向右滑动，上一张
            prevSlide();
        }
    }
    
    // 初始化显示第一张幻灯片
    showSlide(0);
    startSlideInterval();
}

// 惊喜盒子函数
function initSurpriseBox() {
    const surpriseBox = document.getElementById('surpriseBox');
    let isOpen = false;
    
    surpriseBox.addEventListener('click', () => {
        if (!isOpen) {
            surpriseBox.classList.add('open');
            createConfetti();
            createFloatingStars();
            isOpen = true;
            
            // 3秒后关闭
            setTimeout(() => {
                surpriseBox.classList.remove('open');
                isOpen = false;
            }, 3000);
        }
    });
}

// 创建漂浮星星效果
function createFloatingStars() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = '✨';
            star.style.position = 'fixed';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = Math.random() * 15 + 10 + 'px';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '9999';
            star.style.animation = 'floatStar 3s ease-out forwards';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 3000);
        }, i * 100);
    }
}

// 五彩纸屑效果函数
function initConfetti() {
    // 在页面加载时预创建一些五彩纸屑
    const confettiContainer = document.querySelector('.surprise-content');
    for (let i = 0; i < 20; i++) {
        createConfettiElement(confettiContainer);
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.surprise-content');
    
    // 创建更多五彩纸屑
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = createConfettiElement(confettiContainer);
            
            // 3秒后移除
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

function createConfettiElement(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // 随机颜色
    const colors = ['#ff6b9d', '#f8b500', '#fff', '#4ecdc4', '#96ceb4', '#ffeaa7'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 随机位置和大小
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    
    // 随机动画延迟和持续时间
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    container.appendChild(confetti);
    return confetti;
}

// 日期显示函数
function initDateDisplay() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    
    // 格式化日期
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    
    dateElement.textContent = now.toLocaleDateString('zh-CN', options);
}

// 添加滚动动画效果
function initScrollAnimations() {
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
    
    // 观察所有需要滚动动画的元素
    const animatedElements = document.querySelectorAll('.message-text, .photo-section, .message-section, .interactive-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 点击星星动画效果
function initStarClick() {
    document.addEventListener('click', (e) => {
        // 创建星星元素
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'fixed';
        star.style.left = e.clientX + 'px';
        star.style.top = e.clientY + 'px';
        star.style.fontSize = '24px';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.animation = 'starFloat 1s ease-out forwards';
        
        // 添加到文档
        document.body.appendChild(star);
        
        // 动画结束后移除
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 1000);
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes starFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(0, -50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 延迟初始化滚动动画和点击星星效果
setTimeout(() => {
    initScrollAnimations();
    initStarClick();
}, 3500);

// 防止移动端双击缩放
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 添加页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // 页面显示时恢复动画
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// 平滑滚动效果
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化平滑滚动
setTimeout(smoothScroll, 1000);

// 响应式调整
window.addEventListener('resize', function() {
    // 根据屏幕尺寸调整元素大小
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 初始化视窗高度变量
window.dispatchEvent(new Event('resize'));

// 页面加载完成提示
window.addEventListener('load', function() {
    console.log('页面加载完成，祝您使用愉快！');
});

// ==================== 聊天机器人功能 ====================

// 对话历史记录（上下文管理）
let conversationHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

// 初始化聊天机器人
function initChatbot() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const inputField = document.getElementById('chatbotInput');
    const sendButton = document.getElementById('chatbotSendBtn');
    
    // 加载历史记录
    if (conversationHistory.length > 0) {
        // 清空当前聊天界面
        messagesContainer.innerHTML = '';
        
        // 显示历史记录
        conversationHistory.forEach(message => {
            addMessageToChat(messagesContainer, message.content, message.type);
        });
    }
    
    // 添加发送消息事件监听
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 滚动到底部
    scrollToBottom(messagesContainer);
}

// 发送消息函数
function sendMessage() {
    const inputField = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');
    const message = inputField.value.trim();
    
    if (message === '') return;
    
    // 显示用户消息
    addMessageToChat(messagesContainer, message, 'user');
    
    // 清空输入框
    inputField.value = '';
    
    // 添加用户消息到历史
    conversationHistory.push({ type: 'user', content: message });
    
    // 保持历史记录在合理范围内（最多20条消息）
    if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
    }
    
    // 保存历史记录到localStorage
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    
    // 滚动到底部
    scrollToBottom(messagesContainer);
    
    // 机器人回复（添加延迟增加真实感）
    setTimeout(() => {
        const reply = getBotReply(message, conversationHistory);
        
        // 显示机器人回复
        addMessageToChat(messagesContainer, reply, 'bot');
        
        // 添加机器人回复到历史
        conversationHistory.push({ type: 'bot', content: reply });
        
        // 保持历史记录在合理范围内
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
        // 保存历史记录到localStorage
        localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
        
        // 滚动到底部
        scrollToBottom(messagesContainer);
    }, 500 + Math.random() * 1000);
}

// 添加消息到聊天界面
function addMessageToChat(container, message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender + '-message';
    
    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';
    
    if (sender === 'bot') {
        // 机器人消息使用打字机效果
        messageElement.appendChild(contentElement);
        container.appendChild(messageElement);
        scrollToBottom(container);
        typeWriter(contentElement, message);
    } else {
        // 用户消息立即显示
        contentElement.textContent = message;
        messageElement.appendChild(contentElement);
        container.appendChild(messageElement);
    }
}

// 打字机效果函数
function typeWriter(element, text) {
    let i = 0;
    const speed = 20; // 打字速度（毫秒/字符）
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 滚动到底部
function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

// 机器人回复逻辑（带上下文）
function getBotReply(message, history) {
    // 使用NLP库分析消息
    const doc = nlp(message);
    const normalizedMessage = doc.normalize().out('text');
    
    // 增强的关键词提取和分析
    const keywords = doc.keywords().out('array');
    const hasQuestion = doc.has('#Question');
    const hasExclamation = doc.has('#Exclamation');
    const mentionsTime = doc.has('#Time');
    const mentionsEmotion = doc.has('#Emotion');
    const mentionsPersonal = doc.has('#Person');
    const hasPositive = doc.has('#Positive');
    const hasNegative = doc.has('#Negative');
    
    // 检查消息类型
    const isGreeting = doc.match('(你好|嗨|哈喽|早上好|下午好|晚上好)').found;
    const isFarewell = doc.match('(再见|拜拜|下次见|晚安)').found;
    const isThanks = doc.match('(谢谢|感谢|感激)').found;
    const isApology = doc.match('(对不起|抱歉|不好意思)').found;
    const isRequest = doc.match('(请|麻烦|能不能|可不可以)').found;
    
    // 检查历史上下文
    const recentHistory = history.slice(-6); // 检查最近的6条消息
    const hasRecentQuestion = recentHistory.some(msg => 
        msg.type === 'user' && (msg.content.includes('吗') || msg.content.includes('？') || msg.content.includes('?'))
    );
    
    // 获取上一条机器人消息
    const previousBotMsg = recentHistory.reverse().find(msg => msg.type === 'bot');
    
    // 获取对话主题上下文（最近提到的关键词）
    const recentKeywords = [];
    recentHistory.forEach(msg => {
        if (msg.type === 'user') {
            const msgDoc = nlp(msg.content);
            const msgKeywords = msgDoc.keywords().out('array');
            recentKeywords.push(...msgKeywords);
        }
    });
    
    // 移除重复关键词
    const uniqueRecentKeywords = [...new Set(recentKeywords)];
    
    // 上下文相关回复
    const contextReplies = {
        // 感谢后的回复
        '感谢.*回复|谢谢.*回复|谢谢你|感谢你|太感谢了': [
            '不用客气！能和你聊天真的很开心！😊',
            '随时为你服务！我很乐意帮助你！😉',
            '能帮到你我也很快乐！继续聊吧！✨'
        ],
        // 连续提问的回复
        '.*吗.*\?|.*吗.*？|.*什么.*\?|.*什么.*？': [
            '这个问题很有意思，让我想想...🤔',
            '我很喜欢这个问题！让我仔细思考一下...😁',
            '这是个好问题，谢谢你问我！😊'
        ],
        // 重复提问的回复
        '.*刚才.*说什么|.*没听清|.*再说一遍|.*重复一遍': previousBotMsg ? 
            [`刚才我说：${previousBotMsg.content} 😊`, `让我再说一遍：${previousBotMsg.content} 📝`, `好的，我刚才说的是：${previousBotMsg.content} 👌`] : 
            ['抱歉，我刚才没说什么特别的呢！😅', '我们重新开始聊天吧！😊', '没关系，让我们继续聊别的话题吧！✨'],
        // 确认理解的回复
        '.*对吗|.*对吧|.*是不是': [
            '是的，我也这么认为！😊',
            '你说得很对！✨',
            '我完全同意你的看法！👍'
        ],
        // 不理解的回复
        '.*不懂|.*不明白|.*不知道|.*不清楚': [
            '没关系，我可以慢慢给你解释！😊',
            '别担心，我们可以一起学习！📚',
            '这确实有点复杂，让我用简单的方式解释给你听！👩‍🏫'
        ]
    };
    
    // 增强的通用回复
    const generalReplies = {
        // 问候
        '你好|嗨|哈喽|早上好|下午好|晚上好': [
            '你好呀，水总！很高兴见到你！😊',
            '嗨！今天过得怎么样？✨',
            '水总好！有什么我可以帮助你的吗？👋'
        ],
        // 告别
        '再见|拜拜|下次见|晚安': [
            '再见，水总！期待下次聊天！👋',
            '拜拜！记得常来找我玩哦！❤️',
            '晚安！做个好梦！🌙',
            '下次见！我会一直在这里等你！😊'
        ],
        // 感谢
        '谢谢|感谢|感激|多谢': [
            '不用谢！能帮到你我很开心！😘',
            '不客气啦！这是我应该做的！😊',
            '能为你服务是我的荣幸！✨'
        ],
        // 道歉
        '对不起|抱歉|不好意思|失礼了': [
            '没关系的！我不会放在心上的！😄',
            '别在意，我们还是好朋友！❤️',
            '没关系，每个人都会有不小心的时候！😊'
        ],
        // 情绪表达
        '开心|高兴|快乐|幸福|兴奋': [
            '看到你开心我也超级开心！😊',
            '保持好心情哦！快乐会传染的！✨',
            '能分享你的快乐我感到很荣幸！🎊'
        ],
        '难过|伤心|不开心|沮丧|失落': [
            '别难过，我会一直陪着你的！❤️',
            '一切都会好起来的！相信明天会更好！☀️',
            '如果你需要倾诉，我随时都在这里听你说！👂',
            '抱抱你！让我来安慰你！🤗'
        ],
        '无聊|没意思|没劲': [
            '让我陪你聊聊天吧！😊',
            '要不要我给你讲个笑话？😁',
            '我们可以聊聊你感兴趣的话题！✨',
            '来，让我们一起找点有趣的事情做！🎮'
        ],
        // 个人信息
        '名字|叫什么|你是谁|是什么|做什么的': [
            '我叫白开水，是你的专属聊天小助手！😊',
            '我的名字是白开水，很高兴认识你！✨',
            '我是专为你设计的聊天机器人，随时为你服务！👩‍💻',
            '你可以叫我白开水，我会一直陪伴着你！❤️'
        ],
        // 兴趣爱好
        '喜欢|爱好|兴趣|特长|擅长': [
            '我喜欢和你聊天！😊',
            '我的爱好就是倾听你的故事！👂',
            '我最擅长的就是让你开心！😁',
            '能和你分享爱好是我的荣幸！✨'
        ],
        // 时间天气
        '时间|几点|现在|今天|明天|昨天': [
            `现在是${new Date().toLocaleString('zh-CN', { hour: '2-digit', minute: '2-digit' })}哦！⏰`,
            '珍惜每一刻的美好时光！✨',
            '时间过得真快，让我们好好享受当下！😊'
        ],
        '天气|气温|冷暖|下雨|晴天|阴天': [
            '今天天气看起来不错呢！☀️',
            '记得根据天气增减衣物哦！🧥',
            '无论什么天气，有你聊天就很美好！😊'
        ],
        // 礼物相关
        '礼物|惊喜|特别|心意': [
            '这个礼物是特别为你准备的！🎁',
            '希望这个礼物能带给你快乐！😊',
            '心意最重要，希望你能喜欢！❤️',
            '每一份礼物都包含着满满的爱！✨'
        ],
        // 称呼
        '水总': [
            '哎！我在呢！😊',
            '水总有什么吩咐吗？✨',
            '水总好！很高兴为您服务！👋',
            '收到！水总，我听您的！👍'
        ]
    };
    
    // 检查上下文相关回复
    for (const pattern in contextReplies) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(normalizedMessage)) {
            return getRandomReply(contextReplies[pattern]);
        }
    }
    
    // 检查通用回复
    for (const pattern in generalReplies) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(normalizedMessage)) {
            return getRandomReply(generalReplies[pattern]);
        }
    }
    
    // 基于NLP的智能回复
    if (hasQuestion) {
        if (uniqueRecentKeywords.length > 0) {
            return getRandomReply([
                `关于${uniqueRecentKeywords[0]}的问题，我觉得...🤔`,
                `你问的关于${uniqueRecentKeywords[0]}的问题很有趣呢！😊`,
                `让我想想${uniqueRecentKeywords.join('和')}相关的内容...✨`
            ]);
        }
        return getRandomReply([
            '这是个好问题！让我思考一下...🤔',
            '关于这个问题，我觉得...😊',
            '嗯，这个问题有点意思！让我仔细想想！✨'
        ]);
    } else if (hasExclamation) {
        return getRandomReply([
            '哇！你看起来很兴奋呢！😊',
            '我能感受到你的热情！✨',
            '哈哈，你说得太对了！😁'
        ]);
    } else if (mentionsTime) {
        return getRandomReply([
            '时间过得真快啊！让我们珍惜每一刻！⏰',
            '时间是最好的礼物，让我们好好利用它！🎁',
            '每一分钟都很宝贵，很高兴能和你一起度过！😊'
        ]);
    } else if (mentionsEmotion || hasPositive || hasNegative) {
        if (hasPositive) {
            return getRandomReply([
                '看到你这么开心，我也很高兴！😊',
                '正能量满满呢！继续保持哦！✨',
                '能分享你的快乐，我感到很荣幸！❤️'
            ]);
        } else if (hasNegative) {
            return getRandomReply([
                '别难过，一切都会好起来的！❤️',
                '我理解你的感受，让我陪着你！👂',
                '有时候负面情绪也是正常的，重要的是要学会调整！😊'
            ]);
        } else {
            return getRandomReply([
                '情绪是很重要的，要好好照顾自己哦！❤️',
                '表达情绪是很勇敢的事！我很欣赏你！😊',
                '我能理解你的感受！让我们一起面对！✨'
            ]);
        }
    } else if (keywords.length > 0) {
        return getRandomReply([
            `你提到了${keywords.join('、')}，这很有趣呢！我们可以深入聊聊！😊`,
            `${keywords[0]}？我对这个话题也很感兴趣！✨`,
            `关于${keywords.join('和')}，我有一些想法想和你分享！🤔`,
            `${keywords[0]}是个不错的话题！让我说说我的看法...👩‍💬`
        ]);
    } else if (uniqueRecentKeywords.length > 0) {
        // 如果当前消息没有关键词，但历史中有，基于历史关键词回复
        return getRandomReply([
            `我们刚才在聊${uniqueRecentKeywords.join('和')}，继续说说吧！😊`,
            `关于${uniqueRecentKeywords[0]}，你还有什么想分享的吗？🤔`,
            `刚才提到的${uniqueRecentKeywords.join('和')}很有意思，我想了解更多！✨`
        ]);
    }
    
    // 默认回复
    return getRandomReply([
        '我不太明白你的意思，可以再说一遍吗？😊',
        '这个话题很有趣，我们可以深入聊聊！✨',
        '谢谢你和我分享这些！能告诉我更多吗？🤔',
        '我会认真听你说的！请继续！👂',
        '你的想法很特别，能详细说说吗？✨',
        '这个话题我很感兴趣，继续分享吧！😊'
    ]);
}

// 从回复列表中随机选择一个回复
function getRandomReply(replies) {
    return replies[Math.floor(Math.random() * replies.length)];
}