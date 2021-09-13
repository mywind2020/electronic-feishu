# electronic-feishu
飞书 linux客户端,基于electron


# 重要提示
目前飞书官方已经发布了原生的飞书linux版，请各位去飞书官网下载
https://www.feishu.cn/download


## 如何使用

你可以直接下载二进制包使用..也可以下载源码运行..

[下载二进制包](https://github.com/mywind2020/electronic-feishu/releases)

下载源码运行:

在下载和运行这个项目之前，你需要在电脑上安装 [Git](https://git-scm.com/) 和 [Node.js](https://nodejs.org/en/download/) (来自 [npm](https://www.npmjs.com/))。在命令行中输入:

```bash
# Clone this repository
git clone https://github.com/mywind2020/electronic-feishu.git
# Go into the repository
cd electronic-feishu
# Install dependencies and run the app
npm install && npm start

```

打包应用:

```bash
$./build.sh linux x64
可选参数:platform:	darwin, linux, win32
	    arch:		ia32, x64

```

