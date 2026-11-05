import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://south24parganas.dcourts.gov.in/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='ignore')
    links = set(re.findall(r'href=[\'"](https://south24parganas\.dcourts\.gov\.in/[^\'"]+)[\'"]', html))
    print(f'Total links found: {len(links)}')
    for l in sorted(links):
        if any(w in l.lower() for w in ['baruipur', 'court', 'about', 'contact', 'legal', 'service', 'tlsc', 'complex', 'history']):
            print('-', l)
except Exception as e:
    print('Error:', e)
