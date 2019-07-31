<h1 align="center">
<br>
  <a href="https://github.com/yongtany"><img src="https://icon-library.net/images/bread-icon/bread-icon-0.jpg" alt="Loaf" width="128"></a>
<br>
<br>
Loaf
</h1>

<p align="center">Sharing projects with Univ students.</p>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
</p>

<hr />

## Introduction

Team member and project recommendation platform through user data analysis and project evaluation algorithm.

## Features

You can recommend a team member who is similar to your area of interest.
You can recommend projects that are similar to your interests.

- Authentication local + jwt
- User can create a project
- User recommended for the project.
- User can take part in a project
- User can evaluate the project.
- User can like a project.
- User can follow another user.
- User recommanded team member.

## Getting started

1. Clone this repo using `https://github.com/yongtany/loaf`
2. Move to the appropriate directory: `cd loaf`.
3. Move to virtual environment 'pipenv --three && pipenv shell'
4. Run `pipenv install` to install dependencies.
5. `CREATE DATABASE loaf`.
6. Run`python manage.py makemigrations && python manage.py migrate` to migrate database.
7. Run `pipenv manage.py runserver` to see the example app at `http://localhost:8000/`.

## Commands

- `python manage.py runserver` - start at `http://localhost:8000/`

## License

MIT license, Copyright (c) 2018 Yongtany.
