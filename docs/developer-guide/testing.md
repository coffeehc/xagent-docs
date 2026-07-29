---
title: Testing
status: stable
updated: 2026-07-05
unlisted: true
---

# Testing

## 适用对象

本文适合维护 xAgent 使用手册和相关文档内容的开发者。

## 这是什么

Testing 用于说明文档站的基本验证要求。当前以静态构建、类型检查和链接检查为主。

## 什么时候使用

每次修改导航、文档链接、Docusaurus 配置或依赖后，都应运行构建验证。

## 基本用法

```bash
npm run build
```

如果修改 TypeScript 代码，也可以运行：

```bash
npm run typecheck
```

## 相关文档

- [反馈文档问题](/docs/cooperation/idea)
