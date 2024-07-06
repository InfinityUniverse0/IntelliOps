# IntelliOps

IntelliOps: An AIOps Web System.

## Structure

```sh
- welcome
	- 简介
	- 用户登录
	- 用户注册
	- 忘记密码、重置密码等等
	- 登录后界面发生变化（原来的注册与登录 -> 模块按钮）
- Dashboard（仪表盘）
	- 各种仪表盘
	- 时间序列类型的数据
		- 如CPU、内存、磁盘、网络利用率等
    - 也可以包含日志信息的总结
- 事件监控
	- 查看所有日志
	- 日志查询（比如按照事件类型）
	- 日志信息统计（可视化）
- 告警信息
	- 日志告警（AI）
        - 运行DeepLog模型
        - 显示告警信息（异常日志）
        - 页面呈现：展示告警信息（异常日志）的列表
    - Dashboard中其他信息的告警
- About
	- About页面
- 用户Profile（可选）
- 后台管理（Django Admin 可自动化生成）
```

## Quick Start

> Suggested Python Version: `3.9` (Tested on `python 3.9.18`)

### Prerequisites

Make sure you have installed Python and MySQL.

### Python Requirements

You can use conda (recommended) to create a new python virtual env.

```sh
conda create -n web python=3.9.18
conda activate web
```

Then, install the requirements in the project directory:

```sh
pip install -r requriements.txt
```

### Database Setup

> Make sure your MySQL service is running.

First, set up your MySQL database config in `IntelliOps/settings.py`. Then run Django database migrations:

```sh
python manage.py makemigrations
python manage.py migrate
```

Then in your MySQL command line, run:

```mysql
CREATE DATABASE IntelliOps CHARSET = UTF8;
```

Then initilize the database:

```sh
python init_db.py
```

### Start Project

```sh
python manage.py runserver 127.0.0.1:8000
```

> You can change the port as you want.

Visit `127.0.0.1:8000` for the IntelliOps Web Project.

## To Do

- [ ] 用户管理系统
- [ ] admin后台管理
- [x] 生产环境部署（Nginx）
- [x] 用户手册
- [x] requirements.txt
