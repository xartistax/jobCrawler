# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
#from itemadapter import ItemAdapter

from typing import cast
from google.cloud.firestore_v1.base_document import DocumentSnapshot
import firebase_admin
from firebase_admin import credentials, firestore
from scrapy.exceptions import DropItem
from scrapy.exceptions import CloseSpider

from jobsCrawler.constants import ENV_VARS



MAX_ITEMS = int(ENV_VARS["max_items"])


class FirestorePipeline:

    def __init__(self, service_account_path: str, collection_name: str):
        self.service_account_path = service_account_path
        self.collection_name = collection_name

    @classmethod
    def from_crawler(cls, crawler):
        service_account_path = crawler.settings.get("FIREBASE_SERVICE_ACCOUNT")
        collection_name = crawler.settings.get("FIRESTORE_COLLECTION", "jobs")

        if not service_account_path:
            raise ValueError("FIREBASE_SERVICE_ACCOUNT is not set in settings.py")

        return cls(service_account_path, collection_name)


    def open_spider(self, spider):
        # Admin SDK init einmal pro Prozess
        if not firebase_admin._apps:
            cred = credentials.Certificate(self.service_account_path)
            firebase_admin.initialize_app(cred)

        self.db = firestore.client()

    async def process_item(self, item, spider):

        if spider.crawler.stats.get_value("item_scraped_count", 0) >= MAX_ITEMS:
            return item

        # Deterministische Doc-ID => kein Duplicate-Spam
        job_id = item.get("job_id") or item.get("jobId")
        if not job_id:
            spider.logger.warning("Item has no job_id, skipping Firestore write.")
            raise DropItem("Missing job_id")

        doc_ref = self.db.collection(self.collection_name).document(str(job_id))

        snap = cast(DocumentSnapshot, doc_ref.get())
        if snap.exists:
            spider.logger.info(f"{item.get('title')} existiert bereits → dropped")
            raise DropItem(f"{job_id} already exists → dropped")

        # Upsert
        doc_ref.set(dict(item), merge=True)
        spider.logger.info(f"{item.get('title')} gespeichert ")

        return item