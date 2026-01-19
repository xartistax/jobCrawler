



def parse_company(response, spider, job_item):

    try:
        data = response.json()
    except Exception:
        spider.logger.warning(f"Company not JSON: {response.url}")
        return

    job_item["url"] = data.get("url")


    return job_item


