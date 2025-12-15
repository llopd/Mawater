# 创意网页礼物

这是一个创意唯美的网页形式小礼物，适合送给朋友，表达友谊之情。

## 功能特点

### 🎨 视觉效果
- **梦幻背景**：粒子效果营造浪漫氛围
- **星星动画**：点击页面任意位置产生星星效果
- **惊喜盒子**：互动式惊喜体验
- **照片轮播**：展示美好回忆
- **响应式设计**：完美适配手机端

### ✨ 交互功能
- 开场动画效果
- 点击产生星星特效
- 惊喜盒子互动
- 自动照片轮播
- 鼠标悬停效果

### 📱 技术特点
- 使用纯HTML、CSS、JavaScript实现
- 无需复杂框架，轻量化设计
- 支持现代浏览器
- 可直接部署到Netlify

## 快速开始

### 本地运行

```bash
# 进入项目目录
cd gift-web

# 启动本地服务器
python -m http.server 8000

# 访问 http://localhost:8000
```

### Netlify部署

1. 将项目推送到GitHub仓库
2. 登录Netlify官网
3. 点击"New site from Git"
4. 选择你的GitHub仓库
5. 无需配置构建命令，Netlify会自动识别静态网站
6. 点击"Deploy site"

## 自定义内容

### 修改照片

在`index.html`文件中修改照片链接：

```html
<img src="https://via.placeholder.com/600x400?text=美好时光1" alt="美好时光1">
```

### 修改文字内容

在`index.html`文件中修改文字信息：

```html
<div class="message-text">
    时光荏苒，友谊长存。
    感谢你出现在我的生命里，
    带给我那么多快乐和温暖。
    愿我们的友谊像星星一样，
    永远闪亮，永不褪色。
</div>
```

### 修改颜色主题

在`style.css`文件中修改CSS变量或直接修改颜色值：

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 项目结构

```
gift-web/
├── index.html          # 主页面文件
├── style.css           # 样式文件
├── script.js           # 交互逻辑文件
├── README.md           # 项目说明文档
├── .gitignore          # Git忽略文件
└── netlify.toml        # Netlify配置文件
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
