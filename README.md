# 🚀 KhichiSphere

> **AI-Powered Recruitment Platform** built with **FastAPI**, **React**, and **PostgreSQL** to streamline hiring with modern recruitment workflows and AI-assisted resume analysis.

---

## 🌟 Overview

KhichiSphere is a full-stack recruitment platform that helps recruiters and job seekers manage the hiring process efficiently. It combines enterprise recruitment features with AI-powered resume analysis to provide faster and smarter hiring decisions.

This project was designed with a scalable architecture, clean REST APIs, secure authentication, and a modern dashboard experience.

---

## ✨ Key Features

### 🔐 Authentication
- JWT Authentication
- Secure Login & Registration
- Protected APIs
- Role-based architecture (Ready for extension)

### 💼 Recruitment Management
- Job Management
- Candidate Management
- Application Management
- Recruiter Dashboard

### 🤖 AI Resume Analyzer (Version 1)
- Resume Upload
- Resume Parsing
- ATS Score Generation
- Skill Extraction
- AI Recommendations

---

## 🚀 Planned Features (Version 2)

- AI Recruitment Assistant
- Job Description Matching
- Missing Skills Detection
- Resume Summary Generation
- Interview Question Generator
- HR Recommendation Engine
- Candidate Ranking
- AI Mock Interview

---

# 🏗 System Architecture

```
React Frontend
        │
 REST API (Axios)
        │
 FastAPI Backend
        │
 SQLAlchemy ORM
        │
 PostgreSQL Database
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT Authentication
- Pydantic

## AI

- Resume Parser
- ATS Engine
- Skill Extraction

---

# 📂 Project Structure

```
KhichiSphere
│
├── backend
│   ├── app
│   ├── migrations
│   ├── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│
├── docs
├── assets
├── database
├── docker
├── scripts
│
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

---

# 🔌 Major API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
```

## Jobs

```
GET /jobs
POST /jobs
PUT /jobs/{id}
DELETE /jobs/{id}
```

## Resume

```
POST /resume/upload
GET /resume/analysis/{resume_id}
```

---

# 🚀 Getting Started

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 📊 Current Development Status

| Module | Status |
|----------|--------|
| Authentication | ✅ Completed |
| Dashboard | ✅ Completed |
| Job Management | ✅ Completed |
| Applications | ✅ Completed |
| Resume Upload | ✅ Completed |
| AI Resume Analyzer | ✅ Completed |
| AI Chatbot | 🔄 Planned |
| JD Matching | 🔄 Planned |
| AI Interview | 🔄 Planned |

---

# 📸 Screenshots

> Screenshots will be added after deployment.

- Login
- Dashboard
- Jobs
- Resume Upload
- ATS Analysis

---

# 🛣 Roadmap

## Version 1

- Authentication
- Jobs
- Applications
- Resume Upload
- AI Resume Analyzer

## Version 2

- AI Chatbot
- JD Matching
- Resume Summary
- HR Recommendation
- Candidate Ranking
- Mock Interview

---

# 🤝 Contributing

Contributions, ideas and feature suggestions are always welcome.

If you find any issue, feel free to open an Issue or submit a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Aspak Ahmed**

Software Developer

GitHub:
https://github.com/aspakahmed

---

⭐ If you like this project, don't forget to give it a Star.