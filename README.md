# IntelliOps

IntelliOps: An AIOps Web System.

> Code is available at [GitHub]([InfinityUniverse0/IntelliOps: IntelliOps: An AIOps Web System. (github.com)](https://github.com/InfinityUniverse0/IntelliOps)).

## Structure

```sh
.
├── IntelliOps
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── LICENSE
├── MainAPP
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── utils
│   │   ├── __init__.py
│   │   └── query_log.py
│   └── views.py
├── README.md
├── data
├── init_db.py
├── manage.py
├── model
│   ├── anomaly_detection.py
│   ├── ckpt
│   │   └── model.pth
│   └── model.py
├── preprocessing
│   ├── __init__.py
│   └── preprocessing.py
├── requirements.txt
├── static
│   ├── css
│   ├── font
│   ├── image
│   └── js
└── templates
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
