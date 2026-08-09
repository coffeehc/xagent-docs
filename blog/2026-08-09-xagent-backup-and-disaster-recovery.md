---
slug: xagent-backup-and-disaster-recovery
title: xAgent 在线备份与灾难恢复：从增量快照到 recovery.yml
date: 2026-08-09
description: 了解 xAgent 如何配置 S3 或 WebDAV 备份仓库、创建加密增量快照，并使用 recovery.yml 完成在线准备、停机切换、确认或回滚。
authors: [xagent]
tags: [backup, disaster-recovery, recovery, security, self-hosted]
image: /img/blog/xagent-0-0-8-beta/backup-management-zh.png
---

自托管系统的备份不能只回答“文件有没有传到远端”，还要回答三个更实际的问题：能否恢复、恢复时要停多久、切换失败后能否回到原状态。

xAgent `0.0.8.beta` 把这三个问题拆成一条可验证的流程：运行中创建加密增量快照，运行中下载并校验恢复数据，停机后完成目录切换，最后由管理员确认或回滚。

{/* truncate */}

![xAgent 0.0.8.beta 中文备份与恢复管理页](/img/blog/xagent-0-0-8-beta/backup-management-zh.png)

## 先理解两个“全量”

xAgent 的备份是**逻辑全量、物理增量**。

- 对恢复而言，每个完成的快照都能重建一份完整数据目录，不需要先恢复某个基础包，再按顺序重放一串增量包。
- 对远端仓库而言，文件按内容寻址。已经上传且内容未变化的对象会复用，后续备份只上传新增或变化内容。

快照清单只有在对象全部上传且完整标记写入后才可用于恢复。中断或未完成的任务不会被当成可恢复快照。

![xAgent 在线备份与灾难恢复流程](/img/blog/xagent-0-0-8-beta/backup-restore-flow-zh.svg)

## 第一步：配置备份仓库

进入管理员的备份管理页，选择 S3、兼容 S3 的对象存储或 WebDAV，填写仓库名称、endpoint 和远端根目录。S3 还需要 region、bucket 与凭据设置；WebDAV 使用用户名和密码。

建议按这个顺序操作：

1. 保存配置。
2. 测试连接，确认网络、认证和读写权限。
3. 初始化仓库。
4. 下载 `recovery.yml`，离线保存至少一份。
5. 手动执行一次备份，并确认出现完整快照。
6. 再启用定时策略，设置五段 Cron 表达式、IANA 时区和保留数量。

默认策略为每天 `02:00`（`0 2 * * *`）、UTC 时区、保留 7 个完整快照，但是否合适取决于业务恢复点目标。修改时应同时评估备份频率、单次变化量、远端容量和能够接受的数据损失窗口。

`recovery.yml` 是灾难恢复的独立入口。它包含仓库位置、访问凭据、解密材料和目标路径，不依赖原 xAgent 数据库或 KMS。也正因为如此，它属于高敏感文件：不要提交到 Git，不要放进 xAgent 自己的公共目录，也不要只保存在发生故障时可能一并损坏的主机上。

## 第二步：确认备份范围

备份采用白名单收集，重点覆盖恢复服务所需的正式状态，包括：

- `config.yml`、平台密钥和许可证；
- SQLite 数据库与正式文件对象；
- 用户工作区、用户数据、Memory、Skill 和模型配置；
- Tool 包、队列状态、文件处理组件配置与 Connector 相关状态。

临时目录、缓存、日志、PID、socket、lock、SQLite WAL/SHM、运行时下载资源和可重新生成的摘要缓存不会进入快照。SQLite 会通过在线备份接口生成一致副本，而不是直接复制正在写入的数据库文件。

还有一个容易忽略的边界：公共目录中通过 S3 或 WebDAV 接入的第三方内容不进入 xAgent 备份。xAgent 只保存接入配置和自身状态，远端文件应由对象存储的版本控制、跨区域复制、快照或其他备份策略保护。

## 第三步：创建并检查快照

备份管理页可以立即触发备份，也会显示备份任务与完成快照。快照信息包括创建时间、xAgent 版本与平台、文件数、逻辑大小和实际上传大小。

第一次备份通常会上传较多内容；后续即使每个快照仍可完整恢复，实际上传量也主要取决于这段时间发生了多少变化。保留策略删除的是过期快照引用，未被任何快照引用的对象才具备后续清理条件。

在灾难环境中，可以不依赖原数据库直接列出仓库中的完整快照：

```bash
xagent-server backup snapshots --recovery-config recovery.yml
```

## 第四步：在线准备恢复数据

准备最新完整快照：

```bash
xagent-server backup restore --recovery-config recovery.yml
```

准备指定快照：

```bash
xagent-server backup restore \
  --recovery-config recovery.yml \
  --snapshot <snapshot_id>
```

这一阶段会下载对象、验证完整性并重组数据目录，但**不会覆盖当前正在使用的数据目录**。因此可以在 xAgent 仍然运行时完成，把停机窗口留给最后的目录切换。

如果下载、解密或校验失败，当前服务目录保持不变。先修复仓库、凭据、网络或容量问题，再重新准备恢复，不要跳过校验直接切换。

## 第五步：停机并切换目录

在线准备完成后，先停止 xAgent，再执行：

```bash
xagent-server backup restore \
  --recovery-config recovery.yml \
  --continue
```

`--continue` 使用已经准备好的本地恢复日志，不会重新下载快照。xAgent 运行时持有文件锁，因此未停机就执行切换会被拒绝。这个限制不是额外步骤，而是为了避免恢复过程与正在写入的数据目录并发操作。

切换过程会保留可回滚的旧目录，并把进度写入持久化日志。命令或主机在中途退出时，正常启动会被恢复守卫阻止，并提示继续或回滚，避免系统在半切换状态下工作。

## 第六步：启动、验证、确认或回滚

目录切换完成后启动 xAgent，至少验证：

- 管理员可以登录，用户和权限符合所选恢复点；
- 最近会话、工作区文件、Memory、Skill、Tool 和 Connector 状态可读；
- 模型配置可用，关键会话可以完成一次只读检查；
- 备份管理页显示预期的仓库与快照；
- 日志中没有数据库、文件完整性或恢复守卫错误。

验证通过后清理恢复暂存和回滚副本：

```bash
xagent-server backup restore \
  --recovery-config recovery.yml \
  --confirm
```

验证失败时，先停止 xAgent，再回滚：

```bash
xagent-server backup restore \
  --recovery-config recovery.yml \
  --rollback
```

回滚后重新启动并验证原数据目录。`--confirm` 会清理回滚所需的信息，确认后不能再回滚，所以不要把“服务进程能启动”当作完整验证。

`--continue`、`--confirm` 和 `--rollback` 是互斥操作，也不能与 `--snapshot` 同时使用。

## 一次恢复演练应记录什么

真正可靠的备份策略需要定期演练。至少记录以下数据：

| 项目 | 应记录内容 |
| --- | --- |
| 恢复点 | 快照 ID、创建时间、xAgent 版本 |
| 在线准备 | 下载耗时、校验结果、暂存空间占用 |
| 停机窗口 | 停止服务到恢复服务的时间 |
| 验证 | 登录、权限、数据库、文件、会话、Connector 检查结果 |
| 处置 | 执行 `--confirm` 或 `--rollback` 的时间与操作者 |
| 异常 | 网络、凭据、容量、版本或完整性问题及处理方式 |

第一次演练建议在隔离主机和独立目录中完成，不要把首次恢复尝试直接放在唯一的生产实例上。

## 常见问题

### 在线准备完成后，数据已经恢复了吗？

没有。在线阶段只完成下载、校验和重组；必须停止 xAgent 并执行 `--continue`，才会切换正式数据目录。

### 原数据库损坏后还能选择快照吗？

可以。只要备份仓库和离线保存的 `recovery.yml` 可用，就能使用兼容的 xAgent Server 列出完整快照并准备恢复。

### 为什么公共目录里的 S3 文件没有出现在备份中？

这些文件属于第三方云存储的数据面，不由 xAgent 复制进自身备份。请在对应 S3 或 WebDAV 服务上设置版本控制、复制或独立备份。

版本变化见[`0.0.8.beta` 发布说明](/blog/xagent-0-0-8-beta)，安装与升级方式见[开始安装](/docs/getting-started/install)。
