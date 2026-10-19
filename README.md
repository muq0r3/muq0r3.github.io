# MuQ 的 Hexo 博客

这是发布到 <https://muq0r3.github.io> 的 Hexo 博客源码。站点使用 Matery 主题，GitHub Actions 负责构建和发布，`public/` 是生成产物，不提交到仓库。

## 目录说明

| 路径 | 作用 |
| --- | --- |
| `source/_posts/` | 博客文章，Markdown 文件 |
| `source/about/` | 关于页 |
| `source/contact/` | 联系页 |
| `source/images/` | 文章共用图片 |
| `themes/hexo-theme-matery-master/` | 当前主题及其配置 |
| `_config.yml` | 站点地址、文章命名、搜索、RSS、sitemap |
| `.github/workflows/pages.yml` | GitHub Pages 自动构建和发布 |
| `public/` | 本地构建产物，已被忽略 |

## 本地环境

需要 Node.js 20+ 和 Git。第一次拿到项目后，在 `E:\blog` 执行：

```powershell
npm ci
```

如果 `package-lock.json` 有变化，改用：

```powershell
npm install
```

## 本地预览

```powershell
npm run dev
```

浏览器打开 <http://localhost:4000>。修改 Markdown 或主题文件后刷新页面；停止服务按 `Ctrl+C`。

构建一次静态站点：

```powershell
npm run build
```

生成结果在 `public/`。这个目录不需要提交。

检查首页、关于页和主题结构：

```powershell
npm test
```

## 写一篇新文章

在项目根目录执行：

```powershell
npm run new "文章标题"
```

Hexo 会在 `source/_posts/` 生成一个带日期的 Markdown 文件。打开它，把 Front Matter 和正文补完整：

```markdown
---
title: 文章标题
date: 2026-10-18 10:00:00
categories:
  - 具身智能
tags:
  - NeRF
  - 三维视觉
description: 一句话说明这篇文章解决什么问题。
cover: false
mathjax: false
---

## 问题背景

从你真正想回答的问题开始。

## 正文

用二级标题组织主要章节。
```

字段说明：

- `title`：文章标题，也会出现在浏览器标题和首页卡片中。
- `date`：发布时间。Hexo 按时间倒序排列文章。
- `categories`：分类，通常一篇文章放一个主分类。
- `tags`：关键词，可以多个。
- `description`：摘要，用于首页和搜索引擎描述。
- `cover: false`：不把文章设为首页封面轮播。
- `mathjax: true`：只有需要公式的文章才打开，减少页面加载。
- `updated`：可选。需要手动维护更新时间时再加，例如 `updated: 2026-10-20 12:00:00`。

文章文件名的日期不影响 URL；URL 由 `_config.yml` 里的 `permalink` 决定，当前格式是 `/年/月/日/标题/`。

## 图片、公式和代码

把图片放在 `source/images/<文章英文短名>/`，正文中用站内绝对路径引用：

```markdown
![模型结构](/images/nerf-basics/model-structure.png)
```

这样在本地预览和 GitHub Pages 上都能找到图片。不要使用 `C:\...` 或 `file:///...`。

需要公式时，在 Front Matter 加 `mathjax: true`，然后使用：

```markdown
行内公式：$E=mc^2$

独立公式：

$$
\mathcal{L} = \sum_{i=1}^{N} \| \hat{y}_i - y_i \|^2
$$
```

代码块使用三个反引号，并在开头注明语言：

````markdown
```python
def hello(name: str) -> str:
    return f"Hello, {name}"
```
````

## 发布流程

### 第一次迁移 GitHub 仓库

GitHub 上的 `master` 目前保存的是旧的构建产物。本站改为把源码放在 `source` 分支，并让 Actions 发布构建结果，因此不要直接向旧 `master` 推源码。

当前本地仓库使用 `source` 分支，并配置了 `origin`。第一次推送：

```powershell
git push -u origin source
```

然后在 GitHub 仓库页面完成一次设置：

1. 打开 `Settings` → `Pages`。
2. 在 `Build and deployment` 中把 `Source` 设为 `GitHub Actions`。
3. 打开 `Actions`，确认 `Deploy Hexo to GitHub Pages` 成功。
4. 访问 <https://muq0r3.github.io> 检查首页、关于页和文章页。

如果希望以后默认在 `source` 分支工作，可以在 GitHub 的 `Settings` → `General` 中把默认分支改为 `source`。旧 `master` 可以保留作为历史备份。

### 日常发布

只有三步：

```powershell
git add .
git commit -m "post: 文章标题"
git push
```

推送后，GitHub Actions 会自动执行 `npm ci`、`npm run build`、上传 `public/` 并部署到 Pages。通常一两分钟后刷新 <https://muq0r3.github.io> 就能看到新文章。

判断发布成功的位置：

1. 本地 `npm run build` 退出码为 0。
2. GitHub 的 `Actions` 中最新的 `Deploy Hexo to GitHub Pages` 是绿色。
3. Pages 地址上的文章、图片和导航都正常。

本项目不使用 `hexo deploy`，也没有 `npm run deploy`。不要运行旧的部署命令，否则可能把生成文件推到源码分支。

## 发布前检查清单

- `npm run build` 成功。
- `npm test` 成功。
- 本地预览中文章标题、日期、分类和标签正确。
- 图片路径使用 `/images/...` 或可访问的完整 URL。
- 需要公式的文章已设置 `mathjax: true`。
- 文章没有引用本机绝对路径。
- 没有把 token、密码、私有数据写进 Markdown。
- `git status` 中只包含你准备发布的文件。

## 常见问题

**Actions 在 `npm ci` 失败**

通常是没有提交 `package-lock.json`，或者本地改过 `package.json` 但没有同步 lock 文件。运行 `npm install`，把 `package.json` 和 `package-lock.json` 一起提交。

**Pages 仍是旧内容**

先看 `Actions` 是否成功，再检查 `Settings` → `Pages` 的 Source 是否为 `GitHub Actions`。浏览器有缓存时可用无痕窗口打开。

**新文章没有出现在首页**

检查文件是否在 `source/_posts/`、Front Matter 是否以两行 `---` 结束，以及 `date` 是否为有效的日期时间。`_config.yml` 中 `future: true` 会允许未来日期的文章参与构建。

**文章里的图片 404**

确认图片已经提交到 `source/images/`，并且 Markdown 路径大小写完全一致。GitHub Pages 区分大小写。

**想恢复一篇旧文章**

旧文章在删除前的 Git 历史中。先查看提交：

```powershell
git log --all --oneline -- source/_posts
```

再从对应提交取回文件，例如：

```powershell
git show 995a417:"source/_posts/hello-world.md"
```

把输出内容重新保存为新的 Markdown 文件即可。

## 当前优化点

- 清空旧文章和编辑器临时文件，保留空目录给新内容。
- 修正站点的时区、文章文件名、分类和更新时间策略。
- 接入本地搜索索引、Atom RSS 和 sitemap。
- 修复搜索按钮、RSS 入口、首页 GitHub 图标和页脚年份重复的问题。
- 增加空首页引导、404 页面、关于页正文和更清晰的移动端样式。
- 用 GitHub Actions 把“源码分支”和“发布产物”分开，避免旧部署方式覆盖源码。
