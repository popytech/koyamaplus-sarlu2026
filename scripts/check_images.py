import json
from pathlib import Path
base = Path(__file__).resolve().parent.parent
data_file = base / 'src' / 'data' / 'products.json'
images_dir = base / 'public' / 'images'

if not data_file.exists():
    print('products.json not found:', data_file)
    raise SystemExit(1)
if not images_dir.exists():
    print('images dir not found:', images_dir)
    raise SystemExit(1)

data = json.loads(data_file.read_text(encoding='utf-8'))
files = {p.name for p in images_dir.glob('*')}
urls = set()

for c in data.get('categories', []):
    if isinstance(c, dict) and c.get('image_url'):
        urls.add(c['image_url'])

for prod in data.get('products', []):
    if isinstance(prod, dict):
        if prod.get('image_url'):
            urls.add(prod['image_url'])
        for img in prod.get('images', []) or []:
            urls.add(img)

missing = []
from unicodedata import normalize as unormalize

def normalize_name(s: str) -> str:
    s = s.lower()
    # remove accents
    s = unormalize('NFKD', s).encode('ascii', 'ignore').decode('ascii')
    # keep only alnum
    import re
    s = re.sub(r"[^a-z0-9]+", "", s)
    return s

missing = []
matches = {}
file_norm = {fn: normalize_name(fn) for fn in files}

for url in sorted(urls):
    # get only the filename portion
    try:
        fname = url.split('/')[-1]
    except Exception:
        fname = url
    if not fname:
        continue

    if fname in files:
        matches[url] = fname
        continue

    # case-insensitive direct
    lower_map = {fn.lower(): fn for fn in files}
    if fname.lower() in lower_map:
        matches[url] = lower_map[fname.lower()]
        continue

    # normalized match
    nf = normalize_name(fname)
    found = None
    for fn, norm in file_norm.items():
        if norm == nf:
            found = fn
            break
    if found:
        matches[url] = found
    else:
        missing.append(fname)

print('Found', len(urls), 'referenced image paths; missing count:', len(missing))
if matches:
    print('\nPossible matches (reference -> actual file):')
    for ref, real in matches.items():
        print(f"{ref}  ->  {real}")

if missing:
    print('\nUnmatched references (need files or update):')
    for m in missing:
        print(m)
else:
    print('\nAll references resolved or matched to existing files.')
