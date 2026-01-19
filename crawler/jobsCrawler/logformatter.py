# jobsCrawler/logformatter.py
import logging
from typing import Optional, cast
from scrapy.logformatter import LogFormatter, LogFormatterResult


class NoItemDropFormatter(LogFormatter):
    # def dropped(self, item, exception, response, spider) -> LogFormatterResult:
    #     # Kein Item im Log – nur die Message
    #     return {
    #         "level": logging.INFO,
    #         "msg": str(exception),
    #         "args": (),
    #     }

    def dropped(self, item, exception, response, spider) -> LogFormatterResult:
      return cast(LogFormatterResult, None)

    def logCustomizer(self):
      httpErrorlogger = logging.getLogger("scrapy.spidermiddlewares.httperror")
      middlewarelogger = logging.getLogger("scrapy.middleware")
      crawllogger = logging.getLogger("scrapy.crawler")
      addonslogger = logging.getLogger("scrapy.addons")
      extensionlogger = logging.getLogger("scrapy.extensions")
      utillogger = logging.getLogger("scrapy.utils.log")
      corelogger = logging.getLogger("scrapy.core.engine")
      corelogger.setLevel(logging.WARNING)
      utillogger.setLevel(logging.WARNING)
      extensionlogger.setLevel(logging.WARNING)
      addonslogger.setLevel(logging.WARNING)
      crawllogger.setLevel(logging.WARNING)
      httpErrorlogger.setLevel(logging.WARNING)
      middlewarelogger.setLevel(logging.WARNING)