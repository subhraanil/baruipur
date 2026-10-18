import os
import re
import sys
import time

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

out_dir = r'C:\Users\test\.gemini\antigravity\scratch\baruipur-news\out'
html_files = []
for root, dirs, files in os.walk(out_dir):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

t0 = time.time()
print(f"Total HTML files found: {len(html_files)}", flush=True)

missing_h1 = []
multiple_h1 = []
missing_h2 = []
missing_img_dims = []
alt_over_100 = []
missing_canonical = []
missing_og_image = []
long_titles = []
long_descriptions = []

def approx_pixel_width(text):
    w = 0.0
    for ch in text:
        if ch in 'ijlI.,:;!|\' ':
            w += 4.5
        elif ch in 'wmWM@#%':
            w += 12.0
        elif ch.isupper():
            w += 9.5
        elif ord(ch) > 127: # Bengali / non-ascii chars
            w += 11.0
        else:
            w += 7.8
    return w

for idx, fpath in enumerate(html_files):
    if idx % 50 == 0:
        print(f"Auditing file {idx}/{len(html_files)}...", flush=True)
    rel = os.path.relpath(fpath, out_dir).replace('\\', '/')

    # Ignore pure redirect stubs or internal admin
    if any(x in rel for x in ['article/art-', 'admin', '_not-found', '404.html']):
        continue

    with open(fpath, 'r', encoding='utf-8') as fp:
        html = fp.read()

    # Isolate head for all metadata checks
    head_idx = html.find('</head>')
    head = html[:head_idx] if head_idx != -1 else html[:50000]

    # 1. H1 check
    h1_tags = re.findall(r'<h1[^>]*>(.*?)</h1>', html, flags=re.I)
    if not h1_tags:
        missing_h1.append(rel)
    elif len(h1_tags) > 1:
        multiple_h1.append((rel, len(h1_tags)))

    # 2. H2 check
    h2_tags = re.findall(r'<h2[^>]*>(.*?)</h2>', html, flags=re.I)
    if not h2_tags:
        missing_h2.append(rel)

    # 3. Canonical check in head
    if 'rel="canonical"' not in head.lower() and "rel='canonical'" not in head.lower():
        missing_canonical.append(rel)

    # 4. Image dimensions and alt length
    for m in re.finditer(r'<img\s+([^>]+)>', html, flags=re.I):
        tag = m.group(1)
        tag_l = tag.lower()
        if 'width=' not in tag_l or 'height=' not in tag_l:
            missing_img_dims.append((rel, tag[:50]))

        alt_match = re.search(r'alt=["\']([^"\']*)["\']', tag, flags=re.I)
        if alt_match and len(alt_match.group(1)) > 100:
            alt_over_100.append((rel, len(alt_match.group(1))))

    # 5. Meta Title & Description in head
    title_m = re.search(r'<title>([^<]*)</title>', head, flags=re.I)
    if title_m:
        t = title_m.group(1).replace('&amp;', '&').replace('&#038;', '&')
        pw = approx_pixel_width(t)
        if pw > 600 or len(t) > 70:
            long_titles.append((rel, int(pw), len(t)))

    desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)["\']', head, flags=re.I)
    if desc_m:
        d = desc_m.group(1).replace('&amp;', '&').replace('&#038;', '&')
        pw = approx_pixel_width(d)
        if pw > 1050 or len(d) > 170:
            long_descriptions.append((rel, int(pw), len(d)))

    # 6. OpenGraph Image in head
    if 'property="og:image"' not in head.lower() and "property='og:image'" not in head.lower():
        missing_og_image.append(rel)

elapsed = round(time.time() - t0, 2)
print(f"\n=== BARUIPUR.ONLINE SEO AUDIT RESULTS (Scan Time: {elapsed}s) ===", flush=True)
print(f"1. Multiple H1 tags: {len(multiple_h1)}", flush=True)
if multiple_h1:
    for rel, c in multiple_h1[:5]:
        print(f"   - {rel.encode('ascii', 'replace').decode('ascii')}: {c} H1s", flush=True)

print(f"2. Missing H2 pages: {len(missing_h2)}", flush=True)
if missing_h2:
    for rel in missing_h2[:5]:
        print(f"   - {rel.encode('ascii', 'replace').decode('ascii')}", flush=True)

print(f"3. Missing image width/height (CLS): {len(missing_img_dims)}", flush=True)
if missing_img_dims:
    for rel, tag in missing_img_dims[:5]:
        print(f"   - {rel.encode('ascii', 'replace').decode('ascii')}", flush=True)

print(f"4. Alt text > 100 characters: {len(alt_over_100)}", flush=True)
print(f"5. Missing OpenGraph images: {len(missing_og_image)}", flush=True)
if missing_og_image:
    for rel in missing_og_image[:5]:
        print(f"   - {rel.encode('ascii', 'replace').decode('ascii')}", flush=True)

print(f"6. Missing canonical links: {len(missing_canonical)}", flush=True)
print(f"7. Long Titles (>600px / >70ch): {len(long_titles)}", flush=True)
print(f"8. Long Descriptions (>1050px / >170ch): {len(long_descriptions)}", flush=True)
print("=== AUDIT VERIFICATION FINISHED ===", flush=True)
