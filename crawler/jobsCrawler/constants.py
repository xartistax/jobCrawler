import os
from pathlib import Path
from dotenv import load_dotenv


ENV_PATH = Path(__file__).resolve().parent.parent.parent / ".env.local"
load_dotenv(ENV_PATH)


ENV_VARS = {
  "max_items": int(os.getenv("NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT", "0")),
  "log_file": Path("logs/jobsCH.log"),
  "job_api": os.getenv("NEXT_PUBLIC_JOB_API"),
  "company_api": os.getenv("NEXT_PUBLIC_COMPANY_API")
}