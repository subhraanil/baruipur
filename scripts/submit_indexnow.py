import os
import json
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

INDEXNOW_KEY = "e95e641d564e427bb3fa1235cf5a0313"
BASE_URL = "https://baruipur.online"

# 1. Base Static Pages
static_urls = [
    f"{BASE_URL}/",
    f"{BASE_URL}/about/",
    f"{BASE_URL}/editorial-team/",
    f"{BASE_URL}/editorial-policy/",
    f"{BASE_URL}/disclaimer/",
    f"{BASE_URL}/terms-of-service/",
    f"{BASE_URL}/privacy-policy/",
    f"{BASE_URL}/contact/",
    f"{BASE_URL}/corrections-policy/",
    f"{BASE_URL}/places/",
    f"{BASE_URL}/organizations/",
    f"{BASE_URL}/health-directory/",
    f"{BASE_URL}/sitemap.xml",
    f"{BASE_URL}/sitemap-news.xml",
    f"{BASE_URL}/feed.xml"
]

# 2. Categories
categories = [
    "local-news", "railway-transport", "hospital-health", "administration-civic",
    "police-crime", "education-jobs", "business-market", "culture-events",
    "weather-environment", "sports-youth"
]
category_urls = [f"{BASE_URL}/category/{c}/" for c in categories]

# 3. Places
places_urls = []
try:
    with open("src/data/places_data.json", "r", encoding="utf-8") as f:
        places = json.load(f)
        places_urls = [f"{BASE_URL}/places/{p['slug']}/" for p in places if 'slug' in p]
except Exception as e:
    print(f"Warning loading places: {e}")

# 4. Organizations
orgs_urls = []
try:
    with open("src/data/organizations_data.json", "r", encoding="utf-8") as f:
        orgs = json.load(f)
        orgs_urls = [f"{BASE_URL}/organizations/{o['slug']}/" for o in orgs if 'slug' in o]
except Exception as e:
    print(f"Warning loading organizations: {e}")

# 5. Healthcare
health_urls = []
try:
    with open("src/data/healthcare_data.json", "r", encoding="utf-8") as f:
        facilities = json.load(f)
        health_urls = [f"{BASE_URL}/health-directory/{h['slug']}/" for h in facilities if 'slug' in h]
except Exception as e:
    print(f"Warning loading healthcare: {e}")

# 6. News Articles
article_urls = []
try:
    with open("src/data/news_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
        articles = data.get("articles", [])
        for a in articles:
            if a.get("status") == "published":
                slug = a.get("slug") or a.get("id")
                article_urls.append(f"{BASE_URL}/{slug}/")
except Exception as e:
    print(f"Warning loading news articles: {e}")

all_urls = list(dict.fromkeys(static_urls + category_urls + places_urls + orgs_urls + health_urls + article_urls))
print(f"Total unique URLs ready for IndexNow submission: {len(all_urls)}")

# IndexNow accepts up to 10,000 URLs per batch
batch_size = 5000
batches = [all_urls[i:i + batch_size] for i in range(0, len(all_urls), batch_size)]

key_url = f"{BASE_URL}/{INDEXNOW_KEY}.txt"

endpoints = [
    ("IndexNow Official Hub", "https://api.indexnow.org/indexnow"),
    ("Bing IndexNow Endpoint", "https://www.bing.com/indexnow")
]

for batch_idx, batch in enumerate(batches, 1):
    payload = {
        "host": "baruipur.online",
        "key": INDEXNOW_KEY,
        "keyLocation": key_url,
        "urlList": batch
    }
    print(f"\nSubmitting Batch {batch_idx}/{len(batches)} ({len(batch)} URLs)...")
    for name, endpoint in endpoints:
        try:
            res = requests.post(endpoint, json=payload, headers={"Content-Type": "application/json; charset=utf-8"}, timeout=25)
            print(f"[{name}] Batch {batch_idx}: HTTP {res.status_code} - {res.text or 'OK (Accepted)'}")
        except Exception as e:
            print(f"[{name}] Error: {e}")

# Google and Bing Sitemap Pings
for name, ping_url in [
    ("Google Sitemap Ping", f"https://www.google.com/ping?sitemap={BASE_URL}/sitemap.xml"),
    ("Bing Sitemap Ping", f"https://www.bing.com/ping?sitemap={BASE_URL}/sitemap.xml")
]:
    try:
        res = requests.get(ping_url, timeout=10)
        print(f"[{name}] HTTP {res.status_code}")
    except Exception as e:
        print(f"[{name}] Error: {e}")
