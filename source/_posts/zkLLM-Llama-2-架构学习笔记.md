---
title: zkLLM：Llama 2 架构学习笔记
date: 2024-09-18 18:49:52
categories:
  - 大模型
tags:
  - zkLLM
  - Llama 2
  - Transformer
  - 大语言模型
mathjax: false
---

这篇笔记整理 Llama 2 的几个关键结构，作为后续理解 zkLLM、模型推理验证和大模型系统优化的基础。

<!-- more -->

## Llama 2 的整体结构

Llama 2 采用 Decoder-only Transformer 架构，主要面向自回归语言建模。和 Encoder-Decoder 结构相比，它的结构更直接：模型根据前文 token 预测下一个 token。

几个关键特征包括：

- Decoder-only Transformer。
- Pre-normalization，也就是在子层之前进行归一化。
- 使用 RMSNorm。
- 使用 SwiGLU 激活函数。
- 使用 RoPE 旋转位置编码。
- 上下文长度从 Llama 1 的 2K 扩展到 4K。
- 部分模型使用 Grouped-Query Attention（GQA）降低推理开销。

## RMSNorm 与前置归一化

Llama 2 使用 RMSNorm，而不是传统 LayerNorm。RMSNorm 只根据均方根进行缩放，省去了均值中心化步骤，计算更轻量。

前置归一化的结构通常更有利于深层 Transformer 的训练稳定性。简单理解就是：先把输入规范化，再进入注意力层或前馈网络。

## RoPE 旋转位置编码

RoPE（Rotary Position Embedding）会把位置信息注入到 Query 和 Key 中。它不是把位置向量直接加到 token embedding 上，而是通过旋转变换让注意力计算感知相对位置。

RoPE 的好处是：

- 更适合自回归模型。
- 对相对位置关系表达更自然。
- 在长上下文扩展中有较多改进空间。

## SwiGLU 前馈网络

Llama 2 的前馈网络使用 SwiGLU。和普通 FFN 相比，SwiGLU 通过门控机制增强非线性表达能力。

从直觉上看，门控结构可以让模型更灵活地选择哪些中间特征被保留，哪些被抑制。

## Causal Mask

自回归语言模型只能看到当前位置之前的 token，不能偷看未来信息。因此训练和推理中都需要 causal mask。

这个 mask 保证第 `t` 个位置只能依赖 `0` 到 `t` 的上下文，符合文本生成的因果顺序。

## KV Cache

推理阶段如果每生成一个 token 都重新计算完整上下文，会非常浪费。KV Cache 会缓存过去 token 的 Key 和 Value，让后续生成只计算新增 token 的部分。

它能显著提升生成速度，但也会带来显存占用问题。上下文越长，KV Cache 越大。

## Grouped-Query Attention

Grouped-Query Attention 是 Multi-Query Attention 和 Multi-Head Attention 之间的折中。它让多组 Query 共享较少的 Key/Value 头，从而减少 KV Cache 规模。

这个设计对于推理非常有用，因为大模型部署时常常受限于显存带宽和 KV Cache 占用。

## 和 zkLLM 的关系

如果要把大模型推理放到零知识证明或可验证计算框架中，模型结构会直接影响证明成本。

需要重点关注：

- 矩阵乘法的证明开销。
- 激活函数是否容易算术化。
- 注意力机制中的 softmax 和归一化。
- KV Cache 和长上下文带来的状态规模。
- 量化后模型是否更适合证明系统。

所以学习 Llama 2 架构不仅是为了理解模型本身，也是在为后续理解 zkLLM 中“如何证明一次推理确实按模型执行”打基础。
