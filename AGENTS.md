# AGENTS.md

# BOUSLA – AI Career Advisor

## Project Overview

Bousla is an AI-powered career guidance web application that helps Saudi students choose the most suitable university major and career path.

Unlike a chatbot, Bousla guides students through a structured adaptive interview based on the Holland RIASEC model, then recommends suitable majors and explains the reasoning behind each recommendation.

The application is bilingual (Arabic / English) but Arabic is the primary language.

---

# Main Objectives

The application should help students:

- Discover their interests and strengths.
- Identify suitable university majors.
- Explore future career paths.
- Understand why a major was recommended.
- Build a personal development plan.

---

# Current Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend (Future)

- Python
- FastAPI

## Database (Future)

PostgreSQL

---

# Current Data Source

The application currently uses JSON files.

Location:

src/data/json/

These JSON files are temporary.

Later they will be replaced by a PostgreSQL database without changing the frontend.

Never access JSON directly from components.

Always import data through:

src/utils/data.ts

---

# Knowledge Base Files

majors.json

careers.json

skills.json

universities.json

questions.json

question_options.json

major_career_mapping.json

major_skill_mapping.json

university_major_mapping.json

riasec_major_weights.json

---

# Project Architecture

Frontend

↓

JSON Loader

↓

Business Logic

↓

Recommendation Engine

↓

Python API (Future)

↓

Database (Future)

---

# Current Progress

Completed

✅ Project planning

✅ Folder structure

✅ GitHub setup

✅ Next.js setup

✅ TypeScript setup

✅ Knowledge Base

✅ CSV converted to JSON

✅ TypeScript Interfaces

✅ Centralized Data Loader

Frontend pages are currently under development.

---

# Development Roadmap

Priority Order

1. Improve frontend to match Loveable prototype.

2. Login page

3. Register page

4. Dashboard improvements

5. Interview pages

6. Results page

7. Recommendation engine

8. Python FastAPI backend

9. PostgreSQL database

10. AI explanation generation

---

# Coding Rules

Always use TypeScript.

Keep components reusable.

Prefer small functions.

Avoid duplicated code.

Use descriptive variable names.

Use functional React components.

Use comments for important functions.

Write beginner-friendly code.

Do not over-engineer the project.

Keep the project understandable by a university student.

---

# Design Rules

Use the existing color palette.

Keep RTL support.

Arabic is the default language.

Maintain the current component style.

Do not redesign the application.

The Loveable prototype is the design reference.

---

# Project Philosophy

This project is intended as a university graduation/training project.

Code should be:

Simple

Clean

Readable

Maintainable

Avoid unnecessary complexity.

Do not introduce advanced design patterns unless requested.

---

# Recommendation System

The recommendation engine is NOT chatbot-based.

Recommendations are generated using:

1. RIASEC interview

2. Knowledge Base

3. Matching algorithm

4. AI-generated explanation (later)

The recommendation engine must remain explainable.

Never generate random recommendations.

---

# Interview System

Questions come from:

questions.json

Options come from:

question_options.json

Each question belongs to one RIASEC dimension.

Interview answers will later be processed by the Python backend.

---

# Backend Plan

Future backend will use FastAPI.

Responsibilities:

Authentication

Recommendation calculations

Interview scoring

Database access

AI integration

API endpoints

Frontend must communicate with backend using REST APIs.

---

# Database Plan

Current

JSON

↓

Future

PostgreSQL

Changing the database should require minimal frontend changes.

---

# Authentication

Authentication will be implemented later.

Frontend pages should already support:

Login

Register

Profile

Dashboard

Authentication logic will later be connected to FastAPI.

---

# When Modifying Code

Before making changes:

Understand the existing architecture.

Reuse existing components whenever possible.

Do not rename files unless necessary.

Keep imports organized.

Do not remove comments unless replacing them with better ones.

Explain important code with comments.

---

# Response Style

When generating code:

Explain briefly what changed.

Keep files organized.

Prefer modifying existing files over creating unnecessary new files.

If multiple approaches exist, choose the simplest maintainable solution.
