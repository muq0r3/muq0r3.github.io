---
title: 具身智能基础：动作空间、机器人本体与控制概念
date: 2026-10-29 22:17:45
categories:
  - 具身智能
tags:
  - 具身智能
  - 动作空间
  - 机器人
  - 运动学
description: 具身智能基础概念整理，涵盖动作空间、任务、数据集、机器人本体、运动学与动力学。
cover: false
mathjax: false
---

<div class="lesson-callout">
    <div class="lesson-callout__icon"><i class="fas fa-link"></i></div>
    <div>
        <p>
            可见 <a href="https://embodiedterms.com/" target="_blank" rel="noopener">具身智能新手名词表 · 2900+ 个专有名词按学习顺序讲清楚</a>，
            主要收录了很多基础的具身智能名词与解释，可供学习，本文按照自己的学习需求进行挑选和重新整理。
        </p>
        <p><strong>具身智能核心是感知—决策—行动—反馈闭环。</strong></p>
    </div>
</div>

## <span class="section-icon"><i class="fas fa-compass"></i></span> 一、动作空间与泛化

### 01 · 动作空间

时间维度分为 **Absolute**（直接预测位置）和 **Delta**（预测增量）；空间维度上分为 **Joint Space**（关节空间）和 **Task Space**（任务空间）。

在实操中，Delta 强于 Absolute，Joint Delta + Flow-matching 越练越强。不过末端执行器（end-effector）数据更多，Joint 数据也更难对齐。

### 02 · VLM 与动作头

<span class="note-badge"><i class="fas fa-triangle-exclamation"></i> 训练注意</span>

冻结 VLM 微调动作头会使效果表现变差，因为这割裂了语义与控制。

### 03 · 自回归与扩散

<div class="compare-grid">
    <div class="compare-card">
        <i class="fas fa-arrow-trend-up"></i>
        <strong>自回归</strong>
        <p>低频，实时性差，但有因果推理。</p>
    </div>
    <div class="compare-card">
        <i class="fas fa-wave-square"></i>
        <strong>扩散</strong>
        <p>高频，实时性强，无误差累积，但缺少逻辑推理能力。</p>
    </div>
</div>

### 04 · 泛化能力

具身的泛化能力体现在指令和动作上，涉及语言描述、环境、操作的物体和新技能。

<a href="https://arxiv.org/abs/2503.01238" target="_blank" rel="noopener">STAR-Gen</a> 将其分为视觉、语义和行为三类。

### 05 · 两类基本任务

**Locomotion** 的 Sim2Real 好解决，**Manipulation** 的 Sim2Real 难解决，它们是两个基本的具身任务。

### 06 · 末端轨迹与关节轨迹

末端轨迹到关节轨迹常常使用 IK 和轨迹控制解决；人形还需要同时处理平衡和脚底接触，这属于运控的工作。

## <span class="section-icon"><i class="fas fa-robot"></i></span> 二、任务、数据集与机器人本体

### 07 · 常见数据集

<div class="dataset-grid">
    <div class="dataset-card">
        <i class="fas fa-layer-group"></i>
        <strong>Open X-Embodiment</strong>
        <span>多机器人、多任务、多场景，统一为 RLDS 格式</span>
    </div>
    <div class="dataset-card">
        <i class="fas fa-table"></i>
        <strong>BridgeDataV2</strong>
        <span>桌面操作任务，包含图像、动作和语言指令</span>
    </div>
    <div class="dataset-card">
        <i class="fas fa-camera"></i>
        <strong>DROID</strong>
        <span>采集环境更多</span>
    </div>
    <div class="dataset-card">
        <i class="fas fa-house"></i>
        <strong>RT-1</strong>
        <span>家庭和桌面操作任务</span>
    </div>
    <div class="dataset-card">
        <i class="fas fa-flask"></i>
        <strong>LIBERO</strong>
        <span>仿真 Benchmark</span>
    </div>
    <div class="dataset-card">
        <i class="fas fa-boxes-stacked"></i>
        <strong>RoboMimic</strong>
        <span>框架，也是数据集集合</span>
    </div>
    <div class="dataset-card">
        <i class="fas fa-cubes"></i>
        <strong>Meta-World</strong>
        <span>仿真 Benchmark</span>
    </div>
</div>

### 08 · FK 与 IK

<span class="note-badge"><i class="fas fa-arrows-rotate"></i> 运动学</span>

简单来说，正向运动学和反向运动学的作用是：

| 方法 | 输入 | 输出 |
| --- | --- | --- |
| **FK**（Forward Kinematic） | 关节角度 | 末端位姿 |
| **IK**（Inverse Kinematics） | 末端位姿目标 | 关节角度 |

运行还是得在关节空间上运行。

### 09 · 机械臂

<div class="robot-grid">
    <div class="robot-card">
        <strong>6 自由度</strong>
        <p>足够让末端到达空间中任意位置和朝向。</p>
    </div>
    <div class="robot-card">
        <strong>7 自由度</strong>
        <p>多出一个冗余关节，可以绕开障碍。</p>
    </div>
</div>

常见平台包括 Franka、UR5e、WidowX、SO-100，以及 ALOHA 双臂平台。

### 10 · 四足机器人

<span class="note-badge"><i class="fas fa-paw"></i> 本体</span>

每条腿 3 个关节，全身约 12 个自由度。常见平台包括 Spot、ANYbotics ANYmal、宇树 Go2 和云深处绝影系列。

### 11 · 人形机器人

包括双腿和轮式两类，全身有二三十到五十多个自由度。

常见平台包括本田 ASIMO、波士顿动力 Atlas、特斯拉 Optimus、Figure 03、宇树 G1；银河通用 Galbot G1 是轮式人形。

### 12 · 基本任务

<div class="task-chips">
    <span>Manipulation</span>
    <span>Grasping</span>
    <span>Pick-and-Place</span>
    <span>Bimanual Manipulation</span>
    <span>Dexterous Manipulation（灵巧手操作）</span>
    <span>Locomotion</span>
    <span>Navigation</span>
    <span>Vision-and-Language Navigation</span>
    <span>Mobile Manipulation</span>
    <span>Long-horizon Task</span>
</div>

## <span class="section-icon"><i class="fas fa-diagram-project"></i></span> 三、观测、策略与系统结构

### 13 · 观测 → 策略 → 动作

各种任务都可以统一为 **观测 → 策略 → 动作** 的循环。

<div class="note-flow">
    <span><i class="fas fa-eye"></i> 观测</span>
    <i class="fas fa-arrow-right"></i>
    <span><i class="fas fa-code-branch"></i> 策略</span>
    <i class="fas fa-arrow-right"></i>
    <span><i class="fas fa-hand-pointer"></i> 动作</span>
</div>

观测是智能体每个时刻从环境中得到的信息，是策略的输入。动作空间是智能体每一步所能做动作的集合和动作的数值格式。VLA 模型常把连续动作离散为 token 输出，或者用扩散、流匹配、直接回归来生成连续值。策略是根据当前观测决定下一步做什么动作的规则，通常是一个神经网络。

### 14 · 开环与闭环

<div class="compare-grid">
    <div class="compare-card">
        <i class="fas fa-arrow-right-long"></i>
        <strong>Open-loop</strong>
        <p>执行过程中不看反馈，按事先算好的指令一口气做完。</p>
    </div>
    <div class="compare-card">
        <i class="fas fa-rotate"></i>
        <strong>Closed-loop</strong>
        <p>边做边看，每一步都会根据最新的观测结果调整下一步动作。</p>
    </div>
</div>

### 15 · Brain–Cerebellum Architecture

<div class="lesson-callout lesson-callout--compact">
    <div class="lesson-callout__icon"><i class="fas fa-brain"></i></div>
    <div>
        <p>
            将机器人系统分为负责理解和规划的 <strong>大脑</strong>，以及负责执行动作的 <strong>小脑</strong>。
        </p>
        <p>
            大脑通常为多模态大模型，可以理解指令、感知场景、拆解任务和高层决策；小脑把子任务变为具体动作，可以是技能库、VLA 策略、强化学习或传统控制写成的运动控制器。
        </p>
    </div>
</div>

### 16 · OOD Zero-shot

**OOD**（out-of-distribution）Zero-shot。

### 17 · 关节模组

绝大多数组合为电机 + 减速器（行星、谐波或 RV）+ 编码器（测角度）+ 驱动器（控制电流），乃至力矩传感器和抱闸。

## <span class="section-icon"><i class="fas fa-cube"></i></span> 四、空间、坐标与动力学

### 18 · 三维空间中的 Pose

Pose 为六自由度：x、y、z，以及三个转动自由度。

<div class="task-chips">
    <span>欧拉角：会有万向节死锁现象</span>
    <span>四元数：分量顺序各家不同</span>
    <span>旋转矩阵</span>
</div>

### 19 · 坐标系

<div class="task-chips">
    <span>世界坐标系（World Frame）</span>
    <span>基坐标系（Base Frame）</span>
    <span>坐标系（Coordinate Frame）</span>
</div>

### 20 · 旋转矩阵

**Rotation Matrix（旋转矩阵）** 是一个单位正交矩阵。

### 21 · 动力学

Dynamics 研究力和力矩如何产生运动，回答“给多大力矩会有什么加速度”。

<div class="compare-grid">
    <div class="compare-card">
        <i class="fas fa-calculator"></i>
        <strong>正动力学</strong>
        <p>已知力矩求加速度，物理引擎每一步都在算。</p>
    </div>
    <div class="compare-card">
        <i class="fas fa-sliders"></i>
        <strong>逆动力学</strong>
        <p>已知期望运动求所需力矩，用于重力补偿和力矩控制。</p>
    </div>
</div>

运动学只管几何；抓重物、快速运动、腿足平衡则离不开动力学。
