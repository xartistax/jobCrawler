Evviromnt erstellen und installieren
python3 -m venv .venv
source .venv/bin/activate

requirements installieren
pip install -r requirements.txt

Crawler starten
scrapy crawl jobsCH -o output.json