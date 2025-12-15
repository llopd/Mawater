// 通用打字机效果函数
function typeWriterEffect(element, text, speed) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

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


    
    // 初始化点击产生星星效果
    initStarClick();
    
    // 初始化惊喜盒子
    initSurpriseBox();
    
    // 初始化聊天机器人
    initChatBot();
    
    // 初始化圣诞树点击事件
    initChristmasTreeClick();
});

// 圣诞树点击事件
function initChristmasTreeClick() {
    const treeClickText = document.getElementById('treeClickText');
    if (treeClickText) {
        treeClickText.addEventListener('click', () => {
            // 创建星星效果
            createFloatingStars();
            
            // 如果聊天机器人已初始化，可以在这里添加一条特殊消息
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            
            if (chatMessages && chatInput) {
                // 直接操作DOM添加消息，避免访问内部函数
                const messageDiv = document.createElement('div');
                messageDiv.className = 'bot-message';
                const contentElement = document.createElement('p');
                messageDiv.appendChild(contentElement);
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // 使用通用打字机效果函数
                const reply = '你点击了圣诞树！🎄 圣诞快乐呀！✨';
                const typingSpeed = 20 + Math.random() * 10;
                typeWriterEffect(contentElement, reply, typingSpeed);
                
                // 模拟用户输入并发送一条消息，以触发聊天机器人的回复
                setTimeout(() => {
                    // 这里可以添加一个自动回复的逻辑
                    const autoReply = '圣诞树是不是很可爱呀？🎄';
                    const autoReplyDiv = document.createElement('div');
                    autoReplyDiv.className = 'bot-message';
                    const autoReplyContent = document.createElement('p');
                    autoReplyDiv.appendChild(autoReplyContent);
                    
                    chatMessages.appendChild(autoReplyDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // 使用通用打字机效果函数
                    typeWriterEffect(autoReplyContent, autoReply, typingSpeed);
                }, 2000);
            }
        });
    }
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





// 聊天机器人功能
function initChatBot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    // 对话历史记录（上下文管理）
    let conversationHistory = [];
    
    // 从本地存储加载聊天记录
    loadChatHistory();
    
    // 发送消息事件
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // 添加用户消息到历史
        conversationHistory.push({ type: 'user', content: message, timestamp: Date.now() });
        
        // 添加用户消息到界面
        addMessage(message, 'user');
        chatInput.value = '';
        
        // 保存聊天记录
        saveChatHistory();
        
        // 机器人回复
        setTimeout(() => {
            const reply = getBotReply(message, conversationHistory);
            
            // 添加机器人回复到历史
            conversationHistory.push({ type: 'bot', content: reply, timestamp: Date.now() });
            
            // 保持历史记录在合理范围内（最多20条消息）
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }
            
            // 机器人消息使用打字机效果
            addMessageWithTypewriter(reply, 'bot');
            
            // 保存聊天记录
            saveChatHistory();
        }, 500 + Math.random() * 1000);
    }
    
    // 添加消息到聊天窗口
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 添加消息（带打字机效果）
    function addMessageWithTypewriter(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
        const contentElement = document.createElement('p');
        contentElement.textContent = '';
        messageDiv.appendChild(contentElement);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 使用通用打字机效果函数
        const typingSpeed = 20 + Math.random() * 10;
        typeWriterEffect(contentElement, text, typingSpeed);
    }
    
    // 保存聊天记录到本地存储
    function saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    }
    
    // 从本地存储加载聊天记录
    function loadChatHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            conversationHistory = JSON.parse(savedHistory);
            // 重新显示聊天记录
            chatMessages.innerHTML = '';
            conversationHistory.forEach(msg => {
                addMessage(msg.content, msg.type);
            });
        }
    }
    
    // 机器人回复逻辑（带上下文）
    function getBotReply(userMessage, history) {
        const message = userMessage.toLowerCase();
        
        // 检查历史上下文
        const recentHistory = history.slice(-6); // 检查最近的6条消息
        const hasRecentQuestion = recentHistory.some(msg => 
            msg.content.includes('吗') || msg.content.includes('？') || msg.content.includes('?')
        );
        
        const previousBotMsg = recentHistory.reverse().find(msg => msg.type === 'bot');
        
        // 关键词回复
        const replies = {
            // 问候类
            '你好': ['你好呀！很高兴认识你！😊', '嗨！有什么可以帮助你的吗？✨', '你好！今天过得怎么样？😄', '哈喽～白开水来啦！👋', '你好呀水总！最近还好吗？🥰'],
            '嗨': ['嗨呀！😊', '哈喽～👋', '嗨嗨！今天有什么开心的事吗？✨'],
            '早上好': ['早上好呀！🌞', '早安！今天也要元气满满哦！✨', '早上好水总！开启美好的一天吧！😊'],
            '中午好': ['中午好呀！🍚', '午安！该吃饭啦！😊', '中午好水总！今天吃什么好吃的呀？😋'],
            '晚上好': ['晚上好呀！🌙', '晚安前的问候～😊', '晚上好水总！今天过得开心吗？✨'],
            '晚安': ['晚安呀！🌙', '做个好梦！😴', '晚安水总！明天见啦！💤', '睡个好觉，明天又是新的一天！✨'],
            
            // 感谢类
            '谢谢': ['不客气！这是我应该做的！😉', '不用谢，很高兴能帮到你！😊', '能帮到你我也很开心！🥰', '嘿嘿～举手之劳啦！✨', '没关系的！😊'],
            '谢谢啦': ['不客气哒！😉', '小事一桩啦！✨', '能帮到你我超开心的！🥰'],
            '太感谢了': ['哎呀不用这么客气啦！😊', '能帮到你我也很荣幸！✨', '嘿嘿～开心就好！🥰'],
            
            // 核心关键词类
            '水总': ['水总是人生中最珍贵的财富！👫', '友谊长存！💖', '水总，你是我最好的朋友！❤️', '水总～有什么我能帮你的吗？😊', '水总好呀！今天心情怎么样？✨', '水总～谢谢你一直以来的陪伴！🥰', '水总～我们的友谊像星星一样闪亮！✨', '水总～你是我最珍贵的朋友！❤️'],
            '礼物': ['这份礼物是专门为你准备的哦！🎁', '礼物虽小，心意满满！✨', '打开礼物看看吧！里面有我的小心意哦！🥰', '这份礼物承载着我们的友谊～🎁', '精心准备的礼物，希望你喜欢！😊'],
            
            // 情绪类
            '开心': ['看到你开心我也很开心！😄', '快乐要一起分享才更美好！✨', '你的开心就是我的快乐！🥰', '哇～真替你开心！😊', '开心的心情要传递给大家哦！✨', '快乐翻倍啦！😄'],
            '快乐': ['快乐是生活的调味剂！😄', '愿你每天都充满快乐！✨', '保持快乐，生活更美好！😊', '快乐就像阳光一样温暖！☀️', '让我们一起快乐每一天！🥰'],
            '高兴': ['哈哈～看得出来你很开心呢！😊', '高兴的感觉真好！✨', '能让你高兴我也很满足！🥰'],
            '难过': ['别难过，我会一直陪着你的！🤗', '一切都会好起来的！❤️', '有什么不开心的可以和我说说！😊', '摸摸头～难过的时候我在这儿！🤗', '别伤心啦，明天会更好的！✨', '难过的话就哭出来吧，我陪着你！❤️'],
            '伤心': ['别伤心，一切都会过去的！❤️', '我会一直陪着你的！🤗', '想哭就哭吧，哭完就舒服了！😊'],
            '不开心': ['为什么不开心呀？和我说说吧！😊', '别不开心啦，笑一个！😄', '我来给你讲个笑话好不好？✨'],
            
            // 日常话题类
            '天气': ['今天天气真不错呢！☀️', '记得多喝水，照顾好自己！💧', '天气变化无常，注意增减衣物！🌤️', '今天天气好好呀，适合出门散步！✨', '下雨啦～记得带伞哦！🌧️', '天气好冷呀，要穿厚衣服哦！❄️'],
            '吃饭': ['记得按时吃饭哦！🍽️', '吃好吃的啦！真羡慕！😋', '美食是生活的一大乐趣！🍕', '肚子饿了吗？快去吃饭吧！😊', '今天吃什么好吃的呀？😋', '多吃点哦，身体最重要！❤️'],
            '睡觉': ['早点休息哦！晚安！🌙', '睡个好觉，明天又是美好的一天！😴', '熬夜对身体不好，记得早睡！✨', '困了就去睡觉吧，晚安！💤', '充足的睡眠很重要哦！😴'],
            '工作': ['工作辛苦了！要注意休息哦！💼', '认真工作的样子最棒啦！✨', '工作虽然累，但要保持好心情哦！😊'],
            '学习': ['学习加油！你是最棒的！📚', '认真学习的样子超可爱！😊', '学习虽然辛苦，但收获满满的！✨'],
            '游戏': ['玩游戏要适度哦！🎮', '游戏好玩吗？可以分享给我吗？😊', '玩游戏放松一下也不错！✨'],
            '电影': ['看电影啦！是什么好片呀？🎬', '电影好看吗？推荐一下呀！😊', '看电影是个不错的放松方式！✨'],
            
            // 时间类
            '时间': ['时光荏苒，但友谊长存！⏳', '珍惜每一刻美好的时光！🌟', '时间会证明我们的友谊！❤️', '时间过得真快呀！⏰', '珍惜当下的每一分每一秒！✨'],
            '回忆': ['美好的回忆是最珍贵的宝藏！📸', '珍惜我们一起度过的时光！✨', '回忆让生活更加美好！😊', '那些美好的回忆我都记得哦！🥰', '回忆就像星星一样闪亮！✨'],
            '今天': ['今天过得怎么样呀？😊', '今天有什么有趣的事吗？✨', '今天也要开心哦！😄'],
            '明天': ['明天又是新的一天！✨', '明天有什么计划吗？😊', '期待明天的到来！🌟'],
            
            // 互动类
            '惊喜': ['点击惊喜盒子看看有什么惊喜吧！🎊', '惊喜总是让人开心！😁', '生活需要惊喜来点缀！✨', '惊喜来啦！准备好接招了吗？🎁', '惊喜盒子里有我的小心意哦！🥰'],
            '喜欢': ['我当然喜欢啦！这是我们友谊的见证！🥰', '太喜欢了，谢谢你的用心！😊', '喜欢得不得了！❤️', '哇～好喜欢！😊', '这份喜欢我会珍藏的！✨'],
            '想你': ['我也想你呀！期待我们下次见面！👫', '思念是友谊的纽带！❤️', '我也很想念和你一起的时光！😊', '想你啦！什么时候见面呀？🥰', '想念你的笑容！😊'],
            '爱你': ['我也爱你呀！❤️', '谢谢你的爱！我也超爱你的！🥰', '爱你哦！我的水总！💖'],
            '抱抱': ['来啦！抱抱～🤗', '给你一个大大的拥抱！🤗', '抱抱你，温暖一下！❤️'],
            '亲亲': ['mua～😘', '亲亲～我的水总！😘', '嘿嘿～害羞啦！😊'],
            
            // 其他类
            '圣诞树': ['圣诞树好漂亮呀！🎄', '圣诞快乐！🎄', '圣诞树装饰得真好看！✨'],
            '星星': ['星星就像我们的友谊一样闪亮！✨', '看！天上的星星在眨眼睛呢！🌟', '星星真漂亮！😊'],
            '月亮': ['月亮好圆呀！🌙', '月光下的夜晚真美好！✨', '月亮代表我的心！❤️'],
            '阳光': ['阳光明媚的一天！☀️', '阳光照在身上暖暖的！😊', '阳光就像你的笑容一样温暖！✨'],
            '白开水': ['是的！我就是你的白开水呀！😊', '白开水来啦！有什么我能帮你的吗？✨', '白开水永远陪伴着你！💧']
        };
        
        // 上下文相关回复
        const contextReplies = {
            // 感谢后的回复
            '感谢.*回复|谢谢.*回复|谢谢你': ['不用客气！能和你聊天很开心！😊', '随时为你服务！😉', '能帮到你我也很荣幸！🥰'],
            // 连续提问的回复
            '.*吗.*\?|.*吗.*？': ['让我想想...🤔', '这个问题很有趣呢！😁', '根据我的了解...😊'],
            // 重复提问的回复
            '.*刚才.*说什么|.*没听清|.*再说一遍': previousBotMsg ? 
                [`刚才我说：${previousBotMsg.content} 😊`, `让我再说一遍：${previousBotMsg.content} 📝`] : 
                ['抱歉，我刚才没说什么特别的呢！😅', '我们重新开始聊天吧！😊'],
            // 情绪相关回复
            '.*开心|.*快乐|.*高兴': ['看到你开心我也很开心！😄', '快乐是会传染的！✨', '保持这份好心情哦！😊'],
            '.*难过|.*伤心|.*不开心': ['别难过，一切都会好起来的！❤️', '我会一直陪着你的！🤗', '有什么烦恼可以告诉我！😊']
        };
        
        // 检查上下文关键词
        for (const [key, responseList] of Object.entries(contextReplies)) {
            if (new RegExp(key).test(message)) {
                return responseList[Math.floor(Math.random() * responseList.length)];
            }
        }
        
        // 检查普通关键词
        for (const [key, responseList] of Object.entries(replies)) {
            if (message.includes(key)) {
                return responseList[Math.floor(Math.random() * responseList.length)];
            }
        }
        
        // 通用回复（根据上下文调整）
        let generalReplies = [
            '我不太明白你的意思，可以换个方式说吗？🤔',
            '哈哈，这很有趣！😁',
            '愿我们的友谊越来越深厚！👫',
            '珍惜当下，享受美好时光！🌟',
            '你今天过得怎么样？😊',
            '友谊是人生中最美好的礼物！🎁',
            '能和你聊天真开心！😊',
            '说点有趣的事情吧！😄',
            '时间过得真快呢！⏳'
        ];
        
        // 根据上下文调整通用回复
        if (hasRecentQuestion) {
            generalReplies = [
                '这是个好问题！让我想想...🤔',
                '我觉得...😊',
                '这个嘛，我认为...🌟',
                '哈哈，你真会问！😁',
                '根据我的理解...📚'
            ];
        }
        
        return generalReplies[Math.floor(Math.random() * generalReplies.length)];
    }
    
    // 事件监听
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}