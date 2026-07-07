# Download and Parse Protocol

## 什么时候下载文件

必须下载或保存快照：

- PDF 报告、白皮书、论文、监管文件、标准文件。
- 包含关键表格、图表、附录、方法论的来源。
- 网页可能变化且对结论很重要。
- 需要离线解析、复查或审计的来源。

## 下载登记

写入 `download_registry.jsonl`：

```json
{
  "download_id": "D0001",
  "source_id": "S0001",
  "url": "...",
  "local_path": "downloads/...",
  "file_type": "pdf|html|csv|xlsx|docx|zip|other",
  "downloaded_at": "ISO-8601",
  "sha256": "optional",
  "status": "success|failed",
  "error": null
}
```

## 解析登记

写入 `parse_registry.jsonl`：

```json
{
  "parse_id": "P0001",
  "download_id": "D0001",
  "source_id": "S0001",
  "parser": "...",
  "parsed_path": "parsed/...",
  "status": "success|partial|failed",
  "page_count": 42,
  "tables_found": 5,
  "figures_found": 3,
  "error": null,
  "notes": "..."
}
```

## PDF 处理要求

PDF 报告通常包含表格、图、脚注、附录和方法说明。解析时要注意：

- 不要只读摘要。
- 检查发布日期和版本。
- 查找 methodology 或 assumptions。
- 对关键图表记录页码和标题。
- 对数字记录单位、口径、年份。

## 表格/数据文件处理要求

对 CSV/XLSX：

- 记录字段定义。
- 记录数据日期。
- 记录过滤条件。
- 不要混合不同口径数据。
- 若计算派生指标，登记公式和输入。

## 网页快照

对关键网页保存快照，尤其是：

- 定价页面。
- 产品功能页面。
- 文档版本页面。
- 政策/guidance 页面。
- 新闻稿。

## 解析失败处理

若解析失败：

1. 记录失败。
2. 尝试备用方式，例如 fetch 网页版、下载 HTML、读取摘要、寻找 mirror 或原始数据。
3. 如果仍失败，在 gap matrix 中标记。
4. 不要引用未解析内容。
