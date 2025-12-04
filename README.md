*HealthWell – Preventive Healthcare & Wellness Portal

A Full-Stack Web Application using Django, MySQL, React, and JWT Authentication

🚀 Overview

HealthWell is a production-ready preventive healthcare portal designed for two types of users:

Patients – Track daily wellness metrics (steps, sleep, hydration, activity), manage reminders, and view personalized dashboards.

Healthcare Providers – Monitor patient compliance, view wellness logs, and access patient profiles.

This project includes:

Backend: Django + DRF + MySQL

Frontend: React (JavaScript) + React Router

Auth: JWT (access + refresh)

Role-based access: PATIENT / PROVIDER

Clean UI + responsive layout

Backed by complete CRUD APIs, dashboards, profile management, and secure authentication.

📂 Repository Structure
root/
  backend/
    manage.py
    backend/
    api/
    requirements.txt
    .env.example

  frontend/
    package.json
    webpack.config.js
    public/
    src/
    .env.example

  README.md

🛠 Tech Stack
Backend

Python 3

Django 5

Django REST Framework

SimpleJWT Authentication

MySQL Database

python-dotenv

CORS Headers

Frontend

React 18

React Router 6

Webpack + Babel

Fetch-based API layer

🔐 Authentication

JWT-based login (access + refresh)

Role-based permissions:

Patients can only access their own data.

Providers can view all patients.

JWT stored in localStorage.

📦 Backend Setup (Django + MySQL)
1. Install dependencies
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

2. Configure environment variables

Copy .env.example → .env:

cp .env.example .env


Update fields:

SECRET_KEY=...
DEBUG=True
DB_NAME=health_portal
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=127.0.0.1
DB_PORT=3306
CORS_ALLOWED_ORIGINS=http://localhost:3000

3. Create MySQL database

Open MySQL shell:

CREATE DATABASE health_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

4. Run migrations
python manage.py migrate


(Optional)

python manage.py createsuperuser

5. Run backend
python manage.py runserver 0.0.0.0:8000


Backend now runs at:

👉 http://localhost:8000/api/

🌐 Frontend Setup (React + Webpack)
1. Install dependencies
cd frontend
npm install

2. Setup environment variables
cp .env.example .env


Default:

REACT_APP_API_URL=http://localhost:8000/api

3. Start development server
npm start


Frontend runs at:

👉 http://localhost:3000

🔗 Key API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register/	Register patient/provider
POST	/api/auth/login/	Login & get JWT tokens
GET	/api/auth/me/	Get logged-in user info
Public
Method	Endpoint	Description
GET	/api/public/health-info/	Static health tips
GET	/api/public/privacy-policy/	Privacy policy
Patient APIs
Method	Endpoint	Description
GET	/api/patient/dashboard/	Wellness summary, reminders, tip
GET	/api/patient/goals/	List own goals
POST	/api/patient/goals/	Create daily wellness log
GET	/api/patient/goals/history/	History by date range
GET	/api/patient/profile/	View profile
PUT	/api/patient/profile/	Update profile
Provider APIs
Method	Endpoint	Description
GET	/api/provider/patients/	List all patients with compliance
GET	/api/provider/patients/<id>/	Detailed view of patient
🧪 Running Tests
cd backend
python manage.py test api


Covers:

Registration + duplicate emails

Login + JWT issued

Patient access restrictions

Provider access restrictions

🎯 Feature Highlights
✔ Custom User Model (email login)
✔ Wellness logs (steps, sleep, hydration, activity)
✔ Reminders system
✔ Dashboards for both patient & provider
✔ Role-based UI in React
✔ Reusable API service layer
✔ JWT secured routes + auto redirect on 401
✔ Clean CSS, responsive layout
🧭 Development Workflow

Configure backend .env

Run Django migrations

Start backend server

Configure frontend .env

Run React dev server

Register new user → login → dashboard*
