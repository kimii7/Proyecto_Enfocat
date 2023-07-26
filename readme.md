# CleanCode

## Description

This project is a collaborative effort by Ivan Ariza, Elisabet Vasco, and Daniel Ferrer. The main goal of this project is to develop an Emotional State Analyzer that assesses the emotional well-being of students in the classroom. By understanding the emotional states of students, we aim to identify areas that need improvement and create a better learning environment.

## Current state

The project has been completed to its current state, and the instructions and project overview have been revised. The documentation also indicates that future upgrades and improvements may be considered. Please verify all the links and commands for accuracy before proceeding.

## Backend Instructions

To use the backend, you need to install the following dependencies:

- [Python](https://www.python.org/downloads/)
- `pip install Django`
- `pip install djangorestframework`
- `pip install django-cors-headers`
- `pip install mysqlclient`

Install MySQL:

- Depending on your user, password, and host, you may need to modify the file `backend/backend/settings.py` under the DATABASES section.

Create a database with the name "cleanCode". If you choose a different name, modify the DATABASES NAME section in the aforementioned file.

Execute the following commands inside the `./backend` folder:

- `python manage.py makemigrations`
- `python manage.py migrate`

This will create the necessary database tables.

Now, you can start the server with the following command:

- `python manage.py runserver 8000`

## Frontend Instructions

To use the frontend, you need to install the following dependencies:

- Install [Node.js](https://nodejs.org/)
- `npm install vite`
- Install the `react-calendar` package.
- Install `html-canvas 2`.
- Install `react-count up`.
- Install `react-intersection-observer`.
- Install `react-router-dom`.
- Install `react-chartjs-2`.
- Install `fontawesome`.

Once done, you can start the frontend with the following command:

- `npm run dev`

It will most likely start on port 5173 or 5174 by default.