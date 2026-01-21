# JobCrawler (Next.js, TypeScript, Python, FastAPI, Scrapy)

JobCrawler is a full-stack application that combines a modern **Next.js frontend** with a **Python-based crawling backend**. It crawls real job listings, stores them in **Firebase Firestore**, and allows users to browse and save jobs individually.

The system is designed to run **locally, in production, and via CI/CD**, with a clear separation between frontend, API, and crawler logic.

---

## Features

- 🔍 Crawl real job listings using **Scrapy**
- ⚡ FastAPI backend to control and monitor crawls
- 📦 Firebase Firestore for persistent storage
- 🔐 Firebase Authentication (per-user saved jobs)
- 📄 Live crawler logs (streamed to frontend)
- 🎨 Modern UI with HeroUI + Tailwind
- 🚀 Production-ready deployment (systemd / GitHub Actions)

---

## Technologies Used

### Frontend

- [Next.js 14](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend / Crawler

- [Python 3.13+](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- [Scrapy](https://scrapy.org/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin)

---

## Project Structure

```text
job-tracker/
├── app/                    # Next.js frontend
├── crawler/                # Python backend + Scrapy project
│   ├── jobsCrawler/        # Scrapy spiders, pipelines, settings
│   ├── main.py             # FastAPI entrypoint
│   ├── runner.py           # Scrapy subprocess runner
│   ├── logs/               # Runtime logs (gitignored)
│   └── .venv/              # Python virtual environment (local)
├── lib/
│   └── serviceAccountKey.json (local only, not committed)
├── .env.local              # Local environment variables
└── README.md
```

## Environment Variables

The application uses environment variables to configure both the frontend (Next.js) and the backend/crawler (FastAPI + Scrapy).

Sensitive files (Firebase keys, secrets) are **never committed to Git**.

---

### Frontend (`.env.local`)

Used by the Next.js application.

```env
NEXT_PUBLIC_JOB_API=http://localhost:8000
NEXT_PUBLIC_COMPANY_API=http://localhost:8000
NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT=5
```

- NEXT_PUBLIC_JOB_API: Base URL of the FastAPI backend.
- NEXT_PUBLIC_COMPANY_API: API endpoint for company-related requests.
- NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT: Maximum number of items the crawler is allowed to scrape per run.

### Backend / Crawler

The backend is a Python-based service built with **FastAPI** and **Scrapy**. It is responsible for starting and monitoring crawler runs and persisting job data into **Firebase Firestore**.

The crawler is executed as a subprocess and its logs are streamed live to the frontend.

---

#### Required Environment Variables

The crawler requires a Firebase **service account key**. The path to this file is provided via an environment variable.

```env
FIREBASE_SERVICE_ACCOUNT=/absolute/path/to/serviceAccountKey.json
```

##### Local example

For local development, the Firebase service account key is usually stored inside the project directory but **outside of the crawler folder**.

Example path:

```env
FIREBASE_SERVICE_ACCOUNT=/Users/yourname/Projects/job-tracker/lib/serviceAccountKey.json
```

Make sure that:

- The file exists at the given path
- The path is absolute
- The file is readable by your local user
- The file is listed in .gitignore and never committed

### Setup (Local Development)

Create and activate a Python virtual environment for the crawler:

```env
cd crawler
python3 -m venv .venv
source .venv/bin/activate
```

##### Install Python dependencies:

```env
pip install -r requirements.txt
```

#### Running the Backend Locally

Start the FastAPI backend with auto-reload enabled:

```env
uvicorn main:app --reload
```

#### Running the Crawler Locally

The crawler is triggered via the backend API.

During a crawl run:

- Scrapy executes spiders as subprocesses
- Jobs are scraped and validated
- Duplicate jobs are skipped
- Data is written to Firebase Firestore
- Logs are written to crawler/logs/
- Logs are streamed live to the frontend
