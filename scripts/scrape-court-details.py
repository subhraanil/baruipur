import urllib.request
import ssl
import re
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'https://south24parganas.dcourts.gov.in/police-station-wise-magistrate/',
    'https://south24parganas.dcourts.gov.in/list-of-judges/',
    'https://south24parganas.dcourts.gov.in/contact-us/',
    'https://south24parganas.dcourts.gov.in/about-department/history/'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='ignore')
        print(f"=== URL: {url} ===")
        # search for Baruipur in text
        text = re.sub(r'<[^>]+>', ' ', html)
        text = re.sub(r'\s+', ' ', text)
        matches = [m.group(0) for m in re.finditer(r'.{0,100}baruipur.{0,100}', text, re.IGNORECASE)]
        print(f"Baruipur mentions: {len(matches)}")
        for m in matches[:10]:
            print("  ->", m.strip())
    except Exception as e:
        print(f"Error {url}:", e)
