
import logging
from scrapy import signals
import scrapy
from jobsCrawler.constants import ENV_VARS
from jobsCrawler.spiders.parsers.parse import parse as parse_list
from jobsCrawler.logformatter import NoItemDropFormatter



MAX_ITEMS = ENV_VARS["max_items"]


class JobschSpider(scrapy.Spider):
    name = "jobsCH"
    allowed_domains = ["jobs.ch"]
    start_urls = ["https://www.jobs.ch/de/stellenangebote/?page=1&term="]

    def __init__(self, *args, **kwargs):
        NoItemDropFormatter().logCustomizer()
        super().__init__(*args, **kwargs)


    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(JobschSpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_closed, signal=signals.spider_closed)
        return spider

    def spider_closed(self, spider):
        spider.logger.info(f"Scrapy {scrapy.__version__} reached its limit after {MAX_ITEMS} items → stopped crawling.")


    def parse(self, response):
      yield from parse_list(self, response)


















