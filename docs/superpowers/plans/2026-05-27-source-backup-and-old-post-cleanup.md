# Source Backup And Old Post Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the Hexo source under version control and clean the older Markdown posts so the blog is recoverable and easier to read.

**Architecture:** Keep generated deployment artifacts out of source control with `.gitignore`, initialize `E:\blog` as the source repository, then rewrite the old posts as normal Hexo Markdown. The generated site remains deployed to `muq0r3/muq0r3.github.io` through `hexo deploy`.

**Tech Stack:** Hexo, Markdown, Git, PowerShell, existing Matery theme.

---

### Task 1: Source Repository Baseline

**Files:**
- Modify: `E:\blog\.gitignore`
- Create: `E:\blog\.git`

- [ ] **Step 1: Confirm source directory is not already a Git repository**

Run: `git rev-parse --is-inside-work-tree`

Expected: exit code 1 with `fatal: not a git repository`.

- [ ] **Step 2: Ensure generated files stay ignored**

Keep `.gitignore` entries for `node_modules/`, `public/`, `.deploy*/`, `db.json`, logs, and OS metadata.

- [ ] **Step 3: Initialize Git repository**

Run: `git init`

Expected: Git creates `E:\blog\.git`.

- [ ] **Step 4: Review staged source set before committing**

Run: `git status --short`

Expected: source/config/theme/docs files appear; `node_modules/`, `public/`, `.deploy_git/`, and `db.json` do not appear.

### Task 2: Old Markdown Cleanup

**Files:**
- Modify: `E:\blog\source\_posts\SQLMap.md`
- Modify: `E:\blog\source\_posts\从零开始学习AFL.md`
- Modify: `E:\blog\source\_posts\hello-world.md`

- [ ] **Step 1: Rewrite SQLMap post**

Replace mojibake text with clean Chinese sections:

```markdown
## 工具定位
## 基本用法
## 常用参数
## 示例场景
## 学习提醒
```

- [ ] **Step 2: Rewrite AFL post**

Replace mojibake text with clean Chinese sections:

```markdown
## 为什么学习 AFL
## 基本概念
## 最小使用流程
## 输出目录
## 下一步阅读
```

- [ ] **Step 3: Replace default Hello World post**

Turn the default Hexo sample into a short blog reorganization note with proper `date`, `categories`, and `tags`.

### Task 3: Verification And Publishing

**Files:**
- Generated: `E:\blog\public\...`
- Generated deploy cache: `E:\blog\.deploy_git\...`

- [ ] **Step 1: Build the site**

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 2: Check generated old posts**

Use local generated HTML to confirm no mojibake remains in the rewritten old post pages and that code blocks still render.

- [ ] **Step 3: Commit source backup**

Run:

```powershell
git add .
git commit -m "chore: back up hexo source and clean old posts"
```

Expected: source repository has an initial commit.

- [ ] **Step 4: Deploy site**

Run: `npx hexo deploy`

Expected: exit code 0 and GitHub Pages deploy cache pushes a new commit.
