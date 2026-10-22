import os

file_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'app', '[slug]', 'page.tsx')

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Normalize to \n for replacement
has_crlf = '\r\n' in text
normalized = text.replace('\r\n', '\n')

# 1. Remove pre-content ad slot
old_slot = '          {/* In-Article Mid Content Ad Space */}\n          <AdSenseSlot format="in-article" className="my-6" />\n\n'
if old_slot in normalized:
    normalized = normalized.replace(old_slot, '')
    print('Successfully removed pre-content in-article ad slot')
else:
    print('Warning: old_slot not found in normalized text')

# 2. Add robots check in metadata
old_alt = '    alternates: {\n      canonical: canonicalUrl,\n    },\n    openGraph:'
new_alt = '    alternates: {\n      canonical: canonicalUrl,\n    },\n    robots: (article.content || \'\').split(/\\s+/).length < 200 ? { index: false, follow: true } : { index: true, follow: true },\n    openGraph:'

if old_alt in normalized:
    normalized = normalized.replace(old_alt, new_alt)
    print('Successfully added robots meta check')
else:
    print('Warning: old_alt not found in normalized text')

final_text = normalized.replace('\n', '\r\n') if has_crlf else normalized

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_text)

print('File updated successfully.')
