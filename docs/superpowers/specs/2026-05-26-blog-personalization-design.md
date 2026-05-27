# Hexo 博客个性化设计

日期：2026-05-26

## 背景

当前项目是一个 Hexo 博客，启用主题为 `hexo-theme-matery-master`。现有配置中博客部署到 `moonlight280900.github.io`，需要迁移到 `muq0r3.github.io`。站点名称和作者为 `MuQ`，用户当前 GitHub 为 `muq0r3`。主题中仍保留较多默认内容，包括主题作者项目、默认个人简介、打赏、朋友页、相册、音乐播放器等。

用户希望尽量保留 Matery 原主题的外观和结构，只替换不属于自己的信息，并把近期《具身智能原理与实践》的学习进度整理成博客文章。

## 目标

将博客调整为“保留 Matery 原主题的具身智能学习实验室”：

- 保留 Matery 的 banner、文章卡片、归档、标签、目录、代码块等主要体验。
- 保留当前身份：`MuQ`、`Software Engineer`。
- 使用用户的新联系方式：邮箱 `muq0r3@gmail.com`，QQ `2870097972`。
- 使用当前 GitHub 用户：`muq0r3`。
- 将博客地址和部署仓库改为 `muq0r3.github.io`。
- 关闭或隐藏暂时不属于用户的模块，之后用户提供素材后再恢复。
- 将 `D:\embodied-study\reports` 中的 `day1` 和 `day2` 分别整理成两篇正式博客文章。

## 非目标

- 不大改主题布局，不重写 Matery 主题。
- 不做深度 CSS 重设计。
- 不新增评论系统、访问统计改造或第三方服务配置。
- 不配置打赏码、友链、相册真实内容；这些模块后续再补。

## 站点配置

根目录 `_config.yml` 保持站点名称 `MuQ` 和作者 `MuQ`。补充更贴合当前方向的描述和关键词，例如：

- `description`: 记录具身智能、三维视觉、强化学习、多模态模型与安全技术学习过程。
- `keywords`: 具身智能, 三维视觉, NeRF, 3DGS, 强化学习, 多模态, 安全学习

部署仓库和 GitHub Pages 地址改为：

- `url`: `https://muq0r3.github.io`
- `deploy.repo`: `git@github.com:muq0r3/muq0r3.github.io.git`

## 主题配置

更新 `themes/hexo-theme-matery-master/_config.yml`：

- `socialLink.email` 改为 `muq0r3@gmail.com`。
- `socialLink.qq` 改为 `2870097972`。
- `indexbtn.url` 从主题作者仓库改为用户 GitHub：`https://github.com/muq0r3`。
- `githubLink.url` 改为用户 GitHub：`https://github.com/muq0r3`，标题可从 `Fork Me` 改为 `GitHub`。
- 首页 `dream` 文案换成学习记录导向。
- 首页打字副标题换成具身智能学习导向。
- 关闭 `reward.enable`，后续有用户自己的打赏码时再启用。
- 关闭 `music.enable`，减少与技术博客无关的模板感。
- 从菜单隐藏 `Friends`，后续有友链时再恢复。
- 关闭 `myGallery.enable`。
- `myProjects` 不再展示主题作者项目，可关闭或改为学习路线模块。
- `mySkills` 改为用户当前学习方向，避免展示不确定的技能熟练度。

## 关于页

保留 Matery 关于页布局、头像结构和 `career: Software Engineer`。个人简介改为一段简洁说明：

> 这里记录我的技术学习过程，近期重点是具身智能、三维视觉、强化学习与多模态模型，也会保留安全工具、模糊测试和密码学相关笔记。

技能或方向模块建议展示：

- 具身智能
- 三维视觉
- NeRF / 3DGS
- 强化学习
- 多模态模型
- 安全技术学习

## 文章更新

从 `D:\embodied-study\reports` 生成两篇文章到 `source/_posts`。

第一篇：

- 标题：`具身智能学习笔记 01：背景、闭环与核心挑战`
- 来源：`day1背景.md`
- 分类：`具身智能`
- 标签：`具身智能`、`学习笔记`、`智能体`
- 内容结构：概念定义、组成部分、感知-规划-执行闭环、核心组成、主要挑战。

第二篇：

- 标题：`具身智能学习笔记 02：三维视觉、NeRF 与 3DGS`
- 来源：`day2 基础技术.md`
- 分类：`具身智能`
- 标签：`具身智能`、`三维视觉`、`NeRF`、`3DGS`
- 内容结构：三维表达方式、NeRF 技术、3DGS 技术、待补充方向。
- 将 `D:\embodied-study\asserts\NeRF的主要网络架构.png` 复制到博客可发布路径，例如 `source/images/embodied-study/nerf-architecture.png`。
- 将文章中的本地绝对图片路径改为 `/images/embodied-study/nerf-architecture.png`。

文章会保留用户原始学习笔记的内容和表达，但整理标题层级、段落、公式和图片路径，使其适合发布。

## 验证

实施完成后执行：

- `npm run build` 或 `npx hexo generate`
- 如构建成功，启动本地服务检查首页、关于页、文章页、图片路径和菜单显示。

当前 `E:\blog` 目录没有 `.git`，因此设计文档无法在本目录内提交到 Git。若后续需要提交，需要先确认真实 Git 工作区位置或重新初始化/克隆仓库。
