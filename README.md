🌿 HealthWell – Full-Stack Wellness Tracking Portal

A modern full-stack web application that allows patients to log their daily wellness metrics—steps, sleep hours, water intake, and active minutes—while tracking progress across the week.
Built using React (TypeScript), Django REST Framework, and PostgreSQL.

🚀 Tech Stack
Frontend

React + TypeScript

Vite

TailwindCSS + ShadCN UI

Axios

React Router

Backend

Django 6

Django REST Framework

PostgreSQL

psycopg2-binary

Tools

Git & GitHub

pgAdmin

VS Code

🧩 Features
Patient Side

Log daily wellness goals:

Steps

Sleep hours

Water glasses

Active minutes

Auto-fill today's values if already logged

View last 7 days of history

Clean and responsive UI

Backend API

Save or update wellness goals for a specific day

Fetch 7-day recent wellness log

PostgreSQL database integration

CORS-enabled API for frontend

📁 Project Structure
healthwell-portal/
│
├── backend/
│   ├── config/             # Django settings & URLs
│   ├── goals/              # App with models, serializers, views
│   ├── manage.py
│   └── venv/               # Virtual environment
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/
    │   └── goals.ts        # Axios API helpers
    ├── vite.config.ts
    └── package.json

🛠️ Installation & Setup Guide
🔧 Backend Setup (Django + PostgreSQL)
1️⃣ Create Virtual Environment
cd backend
python -m venv venv
.\venv\Scripts\activate

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Create PostgreSQL Database & User

Use pgAdmin or run SQL:

CREATE DATABASE healthwell_db;
CREATE USER healthuser WITH PASSWORD 'StrongPassword123';
GRANT ALL PRIVILEGES ON DATABASE healthwell_db TO healthuser;

4️⃣ Update settings.py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "healthwell_db",
        "USER": "healthuser",
        "PASSWORD": "StrongPassword123",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

5️⃣ Apply Migrations
python manage.py migrate

6️⃣ Start Backend Server
python manage.py runserver


Backend runs at:
👉 http://127.0.0.1:8000

💻 Frontend Setup (React + Vite)
1️⃣ Install Packages
cd frontend
npm install

2️⃣ Start Dev Server
npm run dev


Frontend runs at:
👉 http://localhost:8080

🔗 API Endpoints
POST /api/goals – Save or update daily goal

Request body:

{
  "date": "2025-12-05",
  "steps": 9000,
  "sleep_hours": 8,
  "water_glasses": 12,
  "active_minutes": 30
}

GET /api/goals/recent – Last 7 days

Response:

[
  {
    "id": 1,
    "date": "2025-12-05",
    "steps": 9000,
    "sleep_hours": 8,
    "water_glasses": 12,
    "active_minutes": 30
  }
]

🧠 Model Structure (DailyGoal)
class DailyGoal(models.Model):
    date = models.DateField(unique=True)
    steps = models.IntegerField(default=0)
    sleep_hours = models.FloatField(default=0)
    water_glasses = models.IntegerField(default=0)
    active_minutes = models.IntegerField(default=0)

🛡️ Future Enhancements

JWT authentication

Provider/admin dashboard

Weekly analytics charts

Email/SMS reminders

Mobile app integration

Gamification (badges, streaks)
