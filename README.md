# AI Coding Interviewer — Autonomous Technical Interview Platform

AI Coding Interviewer is a fully automated, adaptive technical interview system designed to simulate real-world hiring environments across startups, mid-size tech, and FAANG-level companies. The platform dynamically generates coding challenges, conceptual questions, and system design scenarios based on candidate profiles — and produces structured, data-driven evaluation reports at the end of the session.

The solution integrates **React.js**, **Spring Boot**, **PostgreSQL**, **OpenAI 4.1**, and **Judge0** using a clean, scalable **DDD architecture** to ensure enterprise-grade maintainability and extensibility.

---

## 🚀 Overview

This system conducts coding interviews end-to-end without human intervention. The interviewer adapts in real time to the candidate’s:

- Tech stack  
- Years of experience  
- Preferred difficulty  
- Target company tier  

The engine uses OpenAI 4.1 to generate questions and prompts and Judge0 to execute code in multiple languages with sandboxed, deterministic evaluation.

---

## 🧩 Key Features

### Adaptive Interview Generation
Every session begins with a JSON configuration. The interviewer recalibrates difficulty, question types, example size, and focus areas based on seniority and career objectives.

### Four-Phase Interview Pipeline
The platform enforces a strict, realistic interview sequence:

#### 1. BASELINE
- Stack-specific conceptual questions  
- One easy DSA problem  
- Establishes candidate proficiency  

#### 2. SCENARIO
- Medium coding challenge grounded in the candidate’s technology stack  
- One short conceptual or API-design follow-up  
- Pass threshold with retry mechanism  

#### 3. ARCHITECTURE
- High-level system design prompt  
- Discussion of scalability, trade-offs, data flows, and stack relevance  

#### 4. DEEP DIVE
- Advanced twist on earlier coding tasks **or** deep internal-stack questions  
- Topics include concurrency, garbage collection, ORMs, and performance tuning  

---

## 🧠 Automated Evaluation Engine

### Code Execution
- Code is executed via **Judge0** to support multiple programming languages.
- Hidden test cases ensure robustness and fairness.

### Scoring Logic
Coding problems are graded out of 100 with:
- **70% correctness**
- **20% efficiency**
- **10% style/readability**

Conceptual questions:
- Accuracy  
- Clarity  
- Depth  

System design:
- Requirements coverage  
- Scalability considerations  
- Trade-offs  
- Communication clarity  

---

## 📝 Final Report Generation

At the end of the interview, the system synthesizes a concise summary (≤150 words) highlighting:

- Scores for each phase  
- Strengths  
- Areas for improvement  
- Final recommendation: **Hire**, **On-Hold**, or **No-Hire**

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Axios  
- Component-based UI  

### Backend
- Java + Spring Boot  
- Domain-Driven Design (DDD)  
- PostgreSQL  
- OpenAI 4.1  
- Judge0 API  

---

## ⚙️ Local Development Setup

### Backend
```bash
 mvn spring-boot:run
```

### Frontend
```bash
npm install
npm run dev
```

### Environment Variables
```
OPENAI_API_KEY=your_key_here
JUDGE0_API_URL=your_url_here
DATABASE_URL=postgres_url
SPRING_DATASOURCE_USERNAME=...
SPRING_DATASOURCE_PASSWORD=...
```

---
