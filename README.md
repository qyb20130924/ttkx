# Happy Everyday (天天开心)
一个温暖治愈的小网站，希望能给你带来每天的好心情 🌟

## ✨ 功能介绍
- 📜 **每日开心语录**：点击按钮随机获取一句温暖治愈的小句子，给你加油打气
- 😄 **随机小笑话**：轻松一刻，赶走坏心情，让你笑一笑
- ✍️ **开心小事打卡**：记录你今天的开心小事，也能看看大家分享的美好瞬间
- 📱 **全响应式设计**：电脑、手机、平板都能完美适配，随时随地都能使用

## 📁 项目结构
```
happy-everyday/
├── README.md          # 项目介绍文档
├── package.json       # 项目依赖配置
├── server.js          # 后端服务主文件
├── public/            # 前端静态文件目录
│   ├── index.html     # 网站主页面
│   ├── css/
│   │   └── style.css  # 样式文件
│   ├── js/
│   │   └── app.js    # 前端交互脚本
│   └── images/
│       └── banner.jpg # 网站顶部banner图
└── data/              # 数据文件目录
    ├── quotes.json    # 开心语录数据
    ├── jokes.json     # 小笑话数据
    └── moments.json   # 用户提交的开心小事数据
```

## 🚀 本地运行
你可以很轻松地在本地运行这个项目：

1. **克隆项目**
```bash
git clone https://github.com/你的GitHub用户名/happy-everyday.git
cd happy-everyday
```

2. **安装依赖**
```bash
npm install
```

3. **启动服务**
```bash
npm start
```

4. **访问网站**
打开浏览器，访问 `http://localhost:3000` 就可以使用啦！

## 📦 部署到GitHub
你可以把这个项目完整发布到GitHub上，步骤如下：

1. 在你的GitHub上创建一个新的公开仓库，名字就叫 `happy-everyday`
2. 把本地的项目代码推送到这个仓库：
```bash
git init
git add .
git commit -m "Initial commit: Happy Everyday website"
git remote add origin https://github.com/你的GitHub用户名/happy-everyday.git
git push -u origin main
```

3. **部署服务**：
   - 如果你想部署完整的前后端服务，可以使用 [Render](https://render.com/) 或者 [Railway](https://railway.app/)，它们都支持免费部署Node.js项目，只需要连接你的GitHub仓库，就可以自动部署，非常方便
   - 如果你只需要静态的前端页面，也可以直接把 `public` 文件夹的内容部署到 GitHub Pages 上

## 💡 关于这个项目
生活已经够忙碌和辛苦了，希望这个小小的网站，能给每一个努力生活的你，带来一点点温暖和治愈。

不管今天过得怎么样，都要记得，你很棒，你值得所有的美好，要天天开心呀！

## 📄 许可证
MIT License
