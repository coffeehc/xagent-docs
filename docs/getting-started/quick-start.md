---
title: 快速开始
status: stable
updated: 2026-07-05
---

# 快速开始

## 适用对象

本文适合希望快速定位 xAgent 文档结构和本地运行入口的读者。

## 这是什么

快速开始用于说明第一阶段文档站的阅读路径。它不替代 xAgent 主仓库的构建说明。

## 什么时候使用

当你需要快速了解 xAgent 的主要能力、术语和后续文档维护方式时，先阅读本文。

## 基本用法

文档站本地开发：

```bash
npm install
npm run start
```

文档站静态构建：

```bash
npm run build
```

xAgent 主程序的运行方式请以主仓库 `README.md` 为准。当前已知入口包括后端服务、Web 前端开发和生产构建，但本文不展开具体参数和配置项。

## 常见问题

### 为什么不在这里写完整安装手册？

第一阶段目标是搭建低维护文档中心。未校验的安装细节不会写成稳定说明。

### 为什么文档状态有 stable、experimental、planned？

状态用于区分已稳定说明、实验性能力和规划内容，避免把设计意图写成已完成事实。

### 修改文档时需要更新 Changelog 吗？

如果修改涉及功能行为、术语或用户可见说明，需要同步 [Changelog](/docs/changelog)。

## 相关文档

- [核心概念](/docs/getting-started/core-concepts)
- [文档贡献说明](https://github.com/coffeehc/xagent)
