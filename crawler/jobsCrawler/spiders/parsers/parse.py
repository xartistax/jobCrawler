import scrapy
from jobsCrawler.constants import ENV_VARS
from jobsCrawler.spiders.parsers.parse_job import parse_job



def parse(self, response):

    if response.status != 200:
        self.logger.warning(f"API status {response.status}: {response.url}")

    hrefs = response.css('[data-cy="serp-item"] [data-cy="job-link"]::attr(href)').getall()
    job_ids = [href.strip("/").split("/")[-1] for href in hrefs]

    for job_id in job_ids:

      job_url = f"{ENV_VARS['job_api']}/{job_id}"
      yield scrapy.Request(job_url, callback=parse_job, cb_kwargs={"spider": self, "job_id": job_id})

    next_page = response.css('a[rel="next"]::attr(href)').get()
    if next_page:
        yield response.follow(next_page, callback=self.parse)
