import subprocess
from datetime import datetime, timezone
import sys

import scrapy

# Simple in-memory state (reicht für 1 Prozess / dev)
_current_proc: subprocess.Popen | None = None
_started_at: datetime | None = None
_last_spider: str | None = None



def run_spider(logfile: str):
    global _current_proc, _started_at, _last_spider

    # optional: nicht doppelt starten
    if _current_proc and _current_proc.poll() is None:
        return _current_proc.pid  # läuft schon

    #_current_proc = subprocess.Popen(["scrapy", "crawl", "jobsCH", "-s", f"LOG_FILE={logfile}"], cwd="./")
    _current_proc = subprocess.Popen([sys.executable, "-m", "scrapy", "crawl", "jobsCH", "-s", f"LOG_FILE={logfile}"],cwd=".")
    _started_at = datetime.now(timezone.utc)

    return _current_proc.pid



def get_status() -> dict:
    running = _current_proc is not None and _current_proc.poll() is None
    exit_code = None if running or _current_proc is None else _current_proc.returncode

    return {
        "running": running,
        "spider": "JobsCH",
        "pid": _current_proc.pid if _current_proc else None,
        "started_at": _started_at.isoformat() if _started_at else None,
        "exit_code": exit_code,
        "status": "live"
    }