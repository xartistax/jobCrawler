# Scrapy settings for jobsCrawler project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

import os
from pathlib import Path
import time
from dotenv import load_dotenv
import scrapy_colorlog
import warnings
from scrapy.exceptions import ScrapyDeprecationWarning

from jobsCrawler.constants import ENV_VARS

scrapy_colorlog.install()

warnings.filterwarnings("ignore", category=ScrapyDeprecationWarning)


FIREBASE_SERVICE_ACCOUNT = os.getenv(
    "FIREBASE_SERVICE_ACCOUNT",
    "/etc/jobcrawler/serviceAccountKey.json"  # Server-Default
)

FIREBASE_SERVICE_ACCOUNT = Path(FIREBASE_SERVICE_ACCOUNT)


BOT_NAME = "jobsCrawler"
SPIDER_MODULES = ["jobsCrawler.spiders"]
NEWSPIDER_MODULE = "jobsCrawler.spiders"

# Logger
LOG_ENABLED = True
LOG_LEVEL = "INFO"
LOG_FORMATTER = "jobsCrawler.logformatter.NoItemDropFormatter"
STATS_DUMP = False
LOG_STDOUT = False
LOG_VERSIONS = False
LOG_SHORT_NAMES = False
LOG_FORMAT = "%(message)s"
LOG_DATEFORMAT = "%d-%m-%Y %H:%M:%S"
DOWNLOAD_TIMEOUT = 15

# Firebase settings
FIREBASE_SERVICE_ACCOUNT = "../lib/serviceAccountKey.json"
FIRESTORE_COLLECTION = "jobs"

# Configure maximum crawls
CLOSESPIDER_ITEMCOUNT = ENV_VARS["max_items"]
# CLOSESPIDER_PAGECOUNT = 100
# CLOSESPIDER_ERRORCOUNT = 10
# CLOSESPIDER_TIMEOUT_NO_ITEMS = 150 # seconds
# CLOSESPIDER_TIMEOUT = 150 # seconds
TELNETCONSOLE_ENABLED = False
DOWNLOADER_STATS = False




# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = "jobsCrawler (+http://www.yourdomain.com)"

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Concurrency and throttling settings
CONCURRENT_REQUESTS = 4
CONCURRENT_REQUESTS_PER_DOMAIN = 1
DOWNLOAD_DELAY = 1

# Disable cookies (enabled by default)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
#    "Accept-Language": "en",
#}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    "jobsCrawler.middlewares.JobscrawlerSpiderMiddleware": 543,
#}

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    "jobsCrawler.middlewares.JobscrawlerDownloaderMiddleware": 543,
#}

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
# EXTENSIONS = {
#    "scrapy.extensions.telnet.TelnetConsole": None,
#    "scrapy.extensions.corestats.CoreStats": None,
# }

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    "jobsCrawler.pipelines.FirestorePipeline": 300,
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = "httpcache"
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"

# Set settings whose default value is deprecated to a future-proof value
FEED_EXPORT_ENCODING = "utf-8"
