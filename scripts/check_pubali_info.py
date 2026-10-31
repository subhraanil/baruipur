import urllib.request
import re
import json

url = 'https://www.google.com/maps/place/PUBALI+CLINIC/@22.3674006,88.4321112,17z/data=!3m1!4b1!4m6!3m5!1s0x3a026c518cd22d45:0x6707ebb85c5cfc1a!8m2!3d22.3674006!4d88.4321112!16s%2Fg%2F11cnm6cm_v'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print(f"Fetched {len(html)} bytes from Google Maps")
        
        # Look for title, address, rating, phone
        title_match = re.search(r'<title>(.*?)</title>', html)
        if title_match:
            print("Title:", title_match.group(1))
            
        # extract address or text
        # usually itemprop or meta description
        meta_desc = re.search(r'<meta content="(.*?)" itemprop="description"', html)
        if meta_desc:
            print("Description:", meta_desc.group(1))
            
        og_desc = re.search(r'<meta content="(.*?)" property="og:description"', html)
        if og_desc:
            print("OG Description:", og_desc.group(1))

        # Check phone numbers
        phones = re.findall(r'(?:0|\+?91[\s-]?)?[6-9]\d{9}', html)
        print("Phones found:", set(phones))

except Exception as e:
    print("Error fetching maps:", e)
