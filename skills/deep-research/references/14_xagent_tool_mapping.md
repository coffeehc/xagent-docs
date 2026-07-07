# xagent Tool Mapping

将本 Skill 的抽象工具类别映射到 xagent 实际工具。

## 抽象工具

| Abstract tool | Purpose | Required? |
|---|---|---|
| web_search | 发现候选来源 | yes |
| fetch | 读取网页/URL 内容 | yes |
| webpage_download | 保存网页快照 | recommended |
| file_download | 下载 PDF、CSV、XLSX、DOCX、ZIP 等 | recommended |
| file_parse | 解析下载文件 | recommended |
| local_fs | 维护研究目录和账本 | yes |

## 推荐工具行为

### web_search

输入：query、可选时间过滤、可选站点过滤。

输出：标题、URL、摘要、发布日期、来源域名。

### fetch

输入：URL。

输出：正文、标题、元数据、状态码、最终 URL、发布日期/更新时间。

### webpage_download

输入：URL。

输出：本地路径、快照时间、哈希。

### file_download

输入：URL。

输出：本地路径、文件类型、大小、哈希、下载状态。

### file_parse

输入：本地路径。

输出：解析文本、表格、元数据、页码/段落/行号、解析状态。

## 工具失败处理

| Failure | Action |
|---|---|
| search returns low-quality results | 改写 query，增加 official/site/domain/date terms |
| fetch fails | 尝试网页快照、备用 URL、官方站内搜索 |
| download fails | 寻找 HTML 版本、镜像、摘要或其他权威来源 |
| parse fails | 记录 partial/failed，不引用未解析部分 |
| source unavailable | 在 gap matrix 标记，不发明内容 |

## 日志规则

每次工具调用都应至少记录：

- tool name
- input
- timestamp
- status
- output summary
- artifact path, if any
- error, if any
