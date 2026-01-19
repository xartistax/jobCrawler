from datetime import datetime, timezone
import scrapy

from jobsCrawler.constants import ENV_VARS
from jobsCrawler.spiders.parsers.parse_company import parse_company

def parse_job(response, spider, job_id):
    try:
        data = response.json()
    except Exception:
        spider.logger.warning(f"Not JSON: {response.url}")
        return

    if not data or not data.get("job_id"):
        spider.logger.warning(f"No job data for {job_id} ({response.url})")
        return

    job_item = {
            "company": data.get("company_name"),
            "company_id": data.get("company_id"),
            "createdAt": datetime.now(timezone.utc),
            "description": data.get("template_text"),
            "job_id": data.get("job_id"),
            "location": data.get("locations"),
            "source": "jobs.ch",
            "title": data.get("title"),
    }

    company_id = data.get("company_id")
    company_url = f"{ENV_VARS['company_api']}/{company_id}"

    yield scrapy.Request(company_url, callback=parse_company, cb_kwargs={"spider": spider, "job_item": job_item})



