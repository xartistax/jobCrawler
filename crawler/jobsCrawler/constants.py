import os
from pathlib import Path
from dotenv import load_dotenv


# 1) Server env file (stabil, nicht im Repo)
SERVER_ENV = Path("/etc/jobcrawler.env")
if SERVER_ENV.exists():
    load_dotenv(SERVER_ENV)

# 2) Lokal dev fallback (liegt im Repo, aber nicht committed)
LOCAL_ENV = Path(__file__).resolve().parents[2] / ".env.local"  # /opt/jobCrawler/.env.local
if LOCAL_ENV.exists():
    load_dotenv(LOCAL_ENV)


ENV_VARS = {
  "max_items": int(os.getenv("NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT", "0")),
  "log_file": Path("logs/jobsCH.log"),
  "job_api": os.getenv("NEXT_PUBLIC_JOB_API"),
  "company_api": os.getenv("NEXT_PUBLIC_COMPANY_API")
}