

from datetime import datetime, timezone
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from runner import get_status, run_spider
from logs import router as logs_router

app = FastAPI()
app.include_router(logs_router)



class StartReq(BaseModel):
    startedAt: str
    uid: str


@app.post("/start")
def crawl(req: StartReq, background_tasks: BackgroundTasks):
    logfile = f"logs/{req.uid}_{req.startedAt}.log"
    background_tasks.add_task(run_spider, logfile)

    return {
        "status": "started",
        "userId": req.uid,
        "started_at": req.startedAt,
        "spider": "jobsCH"
        }

@app.get("/status")
def status():
    return get_status()