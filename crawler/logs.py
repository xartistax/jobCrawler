import os
import sys
import time
from pathlib import Path
from dotenv import load_dotenv
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from jobsCrawler.constants import ENV_VARS








router = APIRouter()


MAX_ITEMS = ENV_VARS["max_items"]

def tail_f(uid: str, startedAt: str):
    LOG_FILE =  Path(f"logs/{uid}_{startedAt}.log")
    LOG_FILE.parent.mkdir(exist_ok=True)
    LOG_FILE.touch(exist_ok=True)

    with LOG_FILE.open("r") as f:
        f.seek(0, 2)
        while True:
            line = f.readline()
            if line:
                yield f"data: {line.rstrip()}\n\n"  # SSE format
                if f"reached its limit after {MAX_ITEMS} items" in line:
                    yield "event: done\ndata: end\n\n"
                    break
            else:
                time.sleep(0.5)


@router.get("/logs/stream")
def stream_logs(uid: str, startedAt: str):
    return StreamingResponse(
        tail_f(uid, startedAt),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache"},
    )
