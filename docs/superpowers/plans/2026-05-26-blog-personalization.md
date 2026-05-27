# Blog Personalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Personalize the Hexo Matery blog for MuQ, update GitHub/contact/deploy information, hide template-only modules, and publish two embodied intelligence study notes.

**Architecture:** Keep the existing Hexo + Matery theme structure intact. Make scoped configuration changes in root and theme YAML files, add publishable image assets under `source/images`, and add two Markdown posts under `source/_posts`.

**Tech Stack:** Hexo 7.3.0, Matery theme, EJS theme templates, Markdown posts, local npm scripts.

---

## File Structure

- Modify `E:\blog\_config.yml`: site metadata and GitHub Pages deploy target.
- Modify `E:\blog\themes\hexo-theme-matery-master\_config.yml`: Matery menu, social links, homepage text, disabled modules, about-page project/skill sections.
- Create `E:\blog\source\images\embodied-study\nerf-architecture.png`: copied image asset from the study folder.
- Create `E:\blog\source\_posts\具身智能学习笔记-01-背景-闭环与核心挑战.md`: polished day1 study article.
- Create `E:\blog\source\_posts\具身智能学习笔记-02-三维视觉-NeRF-与-3DGS.md`: polished day2 study article with fixed image path.
- No Git commit step can be completed because `E:\blog` is not a Git repository.

---

### Task 1: Update Root Hexo Configuration

**Files:**
- Modify: `E:\blog\_config.yml`

- [ ] **Step 1: Inspect current root config**

Run: `Get-Content -LiteralPath '_config.yml' -Encoding UTF8`

Expected: file contains `title: MuQ`, `author: MuQ`, `url: http://moonlight280900.github.io`, and deploy repo `git@github.com:moonlight280900/moonlight280900.github.io.git`.

- [ ] **Step 2: Apply root config changes**

Set these exact values:

```yaml
description: '记录具身智能、三维视觉、强化学习、多模态模型与安全技术学习过程。'
keywords: 具身智能, 三维视觉, NeRF, 3DGS, 强化学习, 多模态, 安全学习
url: https://muq0r3.github.io
deploy:
  type: git
  repo: git@github.com:muq0r3/muq0r3.github.io.git
  branch: master
```

Keep existing `title: MuQ`, `author: MuQ`, `language: zh-CN`, permalink settings, and other Hexo defaults unchanged.

- [ ] **Step 3: Verify old deploy identity is gone from root config**

Run: `rg -n "moonlight280900|muq0r3.github.io|muq0r3/muq0r3.github.io" _config.yml`

Expected: only `muq0r3.github.io` and `muq0r3/muq0r3.github.io` appear; `moonlight280900` does not appear.

---

### Task 2: Update Matery Theme Configuration

**Files:**
- Modify: `E:\blog\themes\hexo-theme-matery-master\_config.yml`

- [ ] **Step 1: Inspect theme config**

Run: `Get-Content -LiteralPath 'themes\hexo-theme-matery-master\_config.yml' -Encoding UTF8`

Expected: file contains Matery menu entries, `indexbtn`, `socialLink`, `reward`, `profile`, `myProjects`, `mySkills`, `myGallery`, `music`, `subtitle`, and `githubLink`.

- [ ] **Step 2: Hide template-only navigation**

Remove or comment out this menu block:

```yaml
  Friends:
    url: /friends
    icon: fas fa-address-book
```

Keep `Index`, `Tags`, `Categories`, `Archives`, `About`, and `Contact`.

- [ ] **Step 3: Update homepage and social links**

Set these exact values:

```yaml
dream:
  enable: true
  showTitle: true
  title: 学习记录
  text: 把每天遇到的概念、公式、工具和问题认真记录下来，让零散的学习过程逐渐沉淀成可回看的知识地图。

music:
  enable: false

indexbtn:
  enable: true
  name: Github
  icon: fab fa-github-alt
  url: https://github.com/muq0r3

socialLink:
  github:  https://github.com/muq0r3
  email: muq0r3@gmail.com
  facebook:
  twitter:
  qq: 2870097972
  weibo:
  zhihu:
  rss: true
```

- [ ] **Step 4: Disable temporary personal modules**

Set these exact values:

```yaml
reward:
  enable: false

myProjects:
  enable: false

myGallery:
  enable: false
```

Leave their existing `data` blocks in place if that is simpler and valid YAML; Hexo will not render them when `enable: false`.

- [ ] **Step 5: Update about profile and current directions**

Set the profile values:

```yaml
profile:
  avatar: /medias/avatar.jpg
  career: Software Engineer
  introduction: 这里记录我的技术学习过程，近期重点是具身智能、三维视觉、强化学习与多模态模型，也会保留安全工具、模糊测试和密码学相关笔记。
```

Replace `mySkills.data` with:

```yaml
mySkills:
  enable: true
  data:
    具身智能:
      background: 'linear-gradient(to right, #009688 0%, #26A69A 100%)'
      percent: 35%
    三维视觉:
      background: 'linear-gradient(to right, #1976D2 0%, #42A5F5 100%)'
      percent: 35%
    NeRF / 3DGS:
      background: 'linear-gradient(to right, #5E35B1 0%, #7E57C2 100%)'
      percent: 30%
    强化学习:
      background: 'linear-gradient(to right, #EF6C00 0%, #FFA726 100%)'
      percent: 25%
    多模态模型:
      background: 'linear-gradient(to right, #00897B 0%, #4DB6AC 100%)'
      percent: 30%
    安全技术学习:
      background: 'linear-gradient(to right, #455A64 0%, #78909C 100%)'
      percent: 55%
```

- [ ] **Step 6: Update GitHub corner and typed subtitle**

Set:

```yaml
githubLink:
  enable: true
  url: https://github.com/muq0r3
  title: GitHub

subtitle:
  enable: true
  loop: true
  showCursor: true
  startDelay: 300
  typeSpeed: 100
  backSpeed: 50
  sub1: 记录具身智能与安全技术的学习过程
  sub2: Learning Embodied AI, vision, RL and security step by step
```

- [ ] **Step 7: Verify theme config no longer points at template author as primary user content**

Run: `rg -n "blinkfox|moonlight280900|932313608|hexo-theme-matery|Fenix|typora-vue-theme" themes\hexo-theme-matery-master\_config.yml`

Expected: `moonlight280900` and `932313608` do not appear. `blinkfox` may remain only in comments or disabled example data if `myProjects.enable` is false; if active user-facing values still point to `blinkfox`, fix them.

---

### Task 3: Add Embodied Study Image Asset

**Files:**
- Create: `E:\blog\source\images\embodied-study\nerf-architecture.png`

- [ ] **Step 1: Create image destination directory**

Run: `New-Item -ItemType Directory -Force -Path 'source\images\embodied-study'`

Expected: directory exists at `E:\blog\source\images\embodied-study`.

- [ ] **Step 2: Copy NeRF architecture image**

Run: `Copy-Item -LiteralPath 'D:\embodied-study\asserts\NeRF的主要网络架构.png' -Destination 'source\images\embodied-study\nerf-architecture.png' -Force`

Expected: file exists at `E:\blog\source\images\embodied-study\nerf-architecture.png`.

- [ ] **Step 3: Verify copied image**

Run: `Get-Item -LiteralPath 'source\images\embodied-study\nerf-architecture.png' | Select-Object FullName,Length`

Expected: `Length` is greater than 0.

---

### Task 4: Publish Day 1 Embodied Intelligence Article

**Files:**
- Create: `E:\blog\source\_posts\具身智能学习笔记-01-背景-闭环与核心挑战.md`

- [ ] **Step 1: Read source note**

Run: `Get-Content -LiteralPath 'D:\embodied-study\reports\day1背景.md' -Encoding UTF8`

Expected: source note contains definition, three-part structure, closed loop, core components, and challenges.

- [ ] **Step 2: Create polished article**

Create the post with this front matter and content:

```markdown
---
title: 具身智能学习笔记 01：背景、闭环与核心挑战
date: 2026-05-16 17:21:03
categories:
  - 具身智能
tags:
  - 具身智能
  - 学习笔记
  - 智能体
top: true
cover: false
mathjax: false
---

最近开始系统学习《具身智能原理与实践》，这篇先整理第一天的背景概念。我的目标不是把书上的内容重新抄一遍，而是把每个概念放到“智能体如何在物理世界中完成任务”的问题里理解。

## 什么是具身智能

具身智能强调智能体通过“本体”与物理环境发生交互。这里的智能不是只停留在文本、图像或离线推理中，而是需要通过身体、传感器、执行器和环境反馈形成闭环。

可以把它拆成三个部分：

- 本体：机器人、机械臂、移动平台或其他可以承载感知与动作的实体。
- 智能系统：负责感知、理解、规划、决策和控制的算法系统。
- 环境交互：智能体在真实或仿真环境中执行动作，并接收反馈。

## 从离身智能到具身智能

离身智能更像是在静态数据上完成识别、生成或推理，例如回答问题、识别图片、生成文本。具身智能则多了一层现实约束：智能体必须在环境中行动，并为行动结果负责。

这种差异让具身智能天然带有“闭环”特征：

```text
感知 -> 理解 / 规划 -> 执行 -> 环境反馈 -> 再感知
```

这个闭环也是后续理解三维视觉、强化学习、多模态模型和机器人控制的主线。

## 核心组成

### 感知

感知负责让智能体理解环境。当前的趋势是从多个独立算法，逐渐走向统一的技术框架，例如视觉基础模型、CLIP、MVP、R3M 这类视觉表示，以及结合视觉语言模型的多模态数据理解。

### 规划

规划负责把目标拆成可执行步骤。对于具身智能来说，规划不只是“想出步骤”，还要考虑环境状态、动作可行性、任务约束和执行反馈。

### 操控

操控负责把计划落到动作上。强化学习常用于学习控制策略，但泛化能力仍然是难点。近年来也出现了把 Transformer 架构、大模型和机器人动作结合起来的 VLA 模型方向。

## 主要挑战

学习第一天后，我觉得具身智能的难点可以分成几类：

- 数据层面：高质量交互数据稀缺，真实机器人数据采集成本高。
- 模型层面：智能化水平仍需提高，尤其是跨场景泛化能力。
- 任务分解：复杂任务如何拆解成稳定、可执行的子任务仍然困难。
- 世界模型：模型对真实物理世界的抽象能力有限。
- 推理效率：大模型推理速度较慢，影响实时交互。
- 系统层面：标准化、适配性和可靠性仍需要工程化积累。
- 伦理价值：具身系统进入真实环境后，安全和价值对齐会更重要。

## 小结

这一天的重点是建立整体框架：具身智能不是单一算法，而是“本体 + 智能系统 + 环境交互”的系统问题。后续学习三维视觉、强化学习和多模态模型时，我会继续把它们放回这个闭环里理解。
```

- [ ] **Step 3: Verify article path and metadata**

Run: `Get-Content -LiteralPath 'source\_posts\具身智能学习笔记-01-背景-闭环与核心挑战.md' -Encoding UTF8 | Select-Object -First 20`

Expected: front matter includes title, date, categories, tags, and `top: true`.

---

### Task 5: Publish Day 2 Embodied Intelligence Article

**Files:**
- Create: `E:\blog\source\_posts\具身智能学习笔记-02-三维视觉-NeRF-与-3DGS.md`

- [ ] **Step 1: Read source note**

Run: `Get-Content -LiteralPath 'D:\embodied-study\reports\day2 基础技术.md' -Encoding UTF8`

Expected: source note contains 3D representation, NeRF, 3DGS, and unfinished RL/large-model headings.

- [ ] **Step 2: Create polished article**

Create the post with this front matter and content:

```markdown
---
title: 具身智能学习笔记 02：三维视觉、NeRF 与 3DGS
date: 2026-05-18 17:27:35
categories:
  - 具身智能
tags:
  - 具身智能
  - 三维视觉
  - NeRF
  - 3DGS
top: true
cover: false
mathjax: true
---

第二天的学习重点是具身智能中的基础技术，尤其是三维视觉。具身智能体要在物理世界中行动，首先要理解空间结构，因此三维表示、NeRF 和 3D Gaussian Splatting 都是很重要的基础。

## 三维表达方式

三维世界可以用显式表达或隐式表达来建模。

### 显式表达

体素是三维空间中的基本单位，可以理解为三维版本的像素。一个体素可以表示为：

$$
V(i,j,k) \in \{0,1\}
$$

点云直接记录空间点的位置和属性：

$$
P = \{p_i\},\quad p_i = \{x_i,y_i,z_i,c_i,I_i\},\quad i \in \{1,2,\ldots,n\}
$$

其中 $c_i$ 表示颜色，$I_i$ 表示强度。点云通常可以通过激光扫描仪或深度相机获取。

网格由顶点、边和面组成：

$$
M = (V,E,F)
$$

它常见于三维建模软件、计算机图形算法和三维扫描结果。

### 隐式表达

隐式表达不是直接存储几何结构，而是通过函数描述空间。常见方式包括：

- 占用函数 OF：判断某个位置是否被占据，0 表示未占据，1 表示占据。
- 符号距离函数 SDF：正值表示物体外部，负值表示物体内部，0 表示表面。

隐式表达的优势是紧凑，适合用神经网络拟合连续空间。

## NeRF 技术

NeRF 的全称是 Neural Radiance Fields，主要用于新视角合成。它的目标是利用少量二维图像观察数据，隐式建模三维场景，并生成未见过视角下的逼真图像。

NeRF 的基本思路是：对每条观察光线进行采样，得到一系列沿光线分布的三维采样点。神经网络接收采样点的三维坐标和视角方向，输出 RGB 颜色值和体密度值。之后通过体积渲染，把这些采样点的信息沿光线加权累计，生成对应像素。

可以写成：

$$
F_\theta(x,y,z,\theta,\phi) \rightarrow (R,G,B,\sigma)
$$

其中 $(\theta,\phi)$ 表示观察角度，$\sigma$ 表示体密度值。体密度会影响光线在该点被吸收或穿透的程度，因此也能表达遮挡关系。

![NeRF 的主要网络架构](/images/embodied-study/nerf-architecture.png)

这里的 $\gamma(x)$ 表示对空间坐标进行位置编码，$\gamma(d)$ 表示对视角方向进行位置编码。训练方式主要基于像素级监督。

我目前的理解是：NeRF 并不是显式存储大量几何数据，而是通过调整 MLP 的网络权重来拟合一个神经辐射场。这种方式紧凑，也能处理光照、材质变化和复杂遮挡。

## 3D Gaussian Splatting

三维高斯泼溅，也就是 3D Gaussian Splatting，常简称 3DGS。它把高斯分布与点云数据结合起来，用空间中的一组三维高斯椭球表示场景。

对于初始稀疏点云中的每个点 $p_i$，可以用高斯核把它映射成场景空间中的椭球状影响分布：

$$
G_i(x)=\exp\left(-\frac{1}{2}(x-p_i)^T\Sigma^{-1}(x-p_i)\right)
$$

其中 $p_i$ 作为均值，$\Sigma$ 是协方差矩阵，用来刻画椭球的形状和朝向。训练过程中，3DGS 会不断调整这些参数，让椭球集合更好地拟合三维场景。

拟合完成后，可以对属性分布做加权处理：

$$
f(x)=\sum_i w_iG_i(x)
$$

之后结合投影和光栅化，就可以渲染出高度逼真的场景图像。

## 3DGS 的基本流程

我把流程暂时整理为六步：

1. 初始化稀疏点云。
2. 创建三维高斯椭球集合。
3. 将三维椭球投影到二维图像平面。
4. 进行可微光栅化渲染。
5. 通过训练过程优化参数。
6. 使用自适应密度控制改善表达效果。

稀疏点云可以来自 SfM，也可以在空间中随机初始化一些点。光栅化时，图像通常会被划分成小瓦片，例如 $16 \times 16$ 的 tile，这样可以利用 CUDA 并行执行。

## 待继续学习

day2 的后半部分还列出了强化学习和大模型相关主题，包括价值学习、策略学习、模仿学习、大语言模型训练技术、视觉与多模态基础模型。这些内容我还没有展开，后续会继续整理成单独笔记。

## 小结

三维视觉是具身智能感知环节的重要基础。体素、点云、网格偏显式表达，OF、SDF、NeRF 更偏隐式表达，而 3DGS 则提供了一种高效、可渲染、适合实时显示的场景表示方式。
```

- [ ] **Step 3: Verify image path and math metadata**

Run: `rg -n "mathjax: true|/images/embodied-study/nerf-architecture.png|D:\\\\embodied-study" source\_posts\具身智能学习笔记-02-三维视觉-NeRF-与-3DGS.md`

Expected: `mathjax: true` and `/images/embodied-study/nerf-architecture.png` appear; `D:\embodied-study` does not appear.

---

### Task 6: Build and Local Verification

**Files:**
- Read: generated `E:\blog\public` output after build

- [ ] **Step 1: Generate the Hexo site**

Run: `npm run build`

Expected: command exits with code 0 and Hexo writes generated files to `public`.

- [ ] **Step 2: Search generated output for stale identity**

Run: `rg -n "moonlight280900|932313608|blinkfox/hexo-theme-matery|D:\\\\embodied-study" public`

Expected: no stale user identity or local absolute image path appears. Theme attribution in footer may still mention Matery if generated as `Theme Matery`; this is acceptable as attribution, but links should not be primary personal links.

- [ ] **Step 3: Start local Hexo server**

Run: `npm run server`

Expected: server starts and reports a local URL, usually `http://localhost:4000`.

- [ ] **Step 4: Browser-check key pages**

Open the local URL and check:

- Home page loads.
- Menu no longer includes Friends.
- GitHub links point to `https://github.com/muq0r3`.
- About page shows the updated introduction and current learning directions.
- Day1 and Day2 articles appear.
- Day2 article renders the NeRF image from `/images/embodied-study/nerf-architecture.png`.

- [ ] **Step 5: Stop local server**

Stop the `npm run server` process after verification.

- [ ] **Step 6: Record Git limitation**

Run: `git status --short`

Expected: command fails with “not a git repository”. Note this in the final response; no commit can be made from `E:\blog`.
