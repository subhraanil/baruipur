from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public/images', exist_ok=True)

# Helper to create nice gradient banners
def create_food_banner(output_path, title_en, title_bn, category_tag, subtitle_bn, bg_colors, accent_color):
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), bg_colors[0])
    draw = ImageDraw.Draw(img)

    # Gradient background
    for y in range(height):
        ratio = y / height
        r = int(bg_colors[0][0] * (1 - ratio) + bg_colors[1][0] * ratio)
        g = int(bg_colors[0][1] * (1 - ratio) + bg_colors[1][1] * ratio)
        b = int(bg_colors[0][2] * (1 - ratio) + bg_colors[1][2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Decorative geometric circles/shapes for modern editorial look
    draw.ellipse([850, -100, 1350, 400], fill=None, outline=(255, 255, 255, 40), width=3)
    draw.ellipse([920, -30, 1420, 470], fill=None, outline=(accent_color[0], accent_color[1], accent_color[2]), width=2)
    draw.ellipse([800, 250, 1200, 650], fill=None, outline=(255, 255, 255, 25), width=2)

    # Accent decorative block on left
    draw.rectangle([60, 60, 68, 570], fill=accent_color)

    # Load fonts
    try:
        font_tag = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 24)
        font_bn_title = ImageFont.truetype("C:/Windows/Fonts/vrindab.ttf", 52)
        font_en_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 36)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/vrinda.ttf", 28)
        font_brand = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 22)
    except:
        font_tag = ImageFont.load_default()
        font_bn_title = ImageFont.load_default()
        font_en_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_brand = ImageFont.load_default()

    # Category Pill Badge
    pill_text = f"  {category_tag.upper()}  "
    draw.rounded_rectangle([100, 75, 420, 125], radius=12, fill=accent_color)
    draw.text((120, 88), pill_text, fill=(255, 255, 255), font=font_tag)

    # Brand tag on top right
    draw.text((950, 85), "BARUIPUR.ONLINE", fill=(220, 220, 230), font=font_brand)

    # Title in Bengali
    draw.text((100, 165), title_bn, fill=(255, 255, 255), font=font_bn_title)

    # Title in English
    draw.text((100, 260), title_en, fill=(240, 200, 120), font=font_en_title)

    # Subtitle / Features in Bengali
    draw.text((100, 345), subtitle_bn, fill=(210, 215, 230), font=font_sub)

    # Verification / Directory Badge
    draw.rounded_rectangle([100, 480, 560, 545], radius=10, fill=(255, 255, 255, 30), outline=(255, 255, 255, 80), width=1)
    draw.text((125, 498), "✓ সম্পূর্ণ যাচাইকৃত স্থানীয় ফুড ও ডাইনিং গাইড ২০২৬", fill=(255, 255, 255), font=font_sub)

    img.save(output_path, quality=92)
    print(f"Generated: {output_path}")

# 1. Master Hub Food Guide
create_food_banner(
    'public/images/baruipur-food-guide-hub.jpg',
    'Best Food, Restaurants, Cafes & Sweets Guide',
    'বারুইপুরের সেরা খাবার, রেস্তোরাঁ ও মিষ্টি গাইড',
    'Ultimate Food Guide',
    'ফ্যামিলি ডাইনিং • বিরিয়ানি • আধুনিক ক্যাফে • ঐতিহ্যবাহী মিষ্টি',
    [(20, 25, 45), (10, 12, 22)],
    (220, 38, 38) # Red accent
)

# 2. Restaurants & Biryani Guide
create_food_banner(
    'public/images/baruipur-best-restaurants-guide.jpg',
    'Best Restaurants & Biryani in Baruipur',
    'বারুইপুরের সেরা রেস্তোরাঁ ও ফ্যামিলি ডাইনিং গাইড',
    'Restaurants & Biryani',
    'কলকাতা বিরিয়ানি • মোগলাই • নর্থ ইন্ডিয়ান • তন্দুরি ও চাইনিজ',
    [(35, 18, 12), (18, 8, 6)],
    (234, 88, 12) # Orange accent
)

# 3. Cafes & Hangouts Guide
create_food_banner(
    'public/images/baruipur-best-cafes-guide.jpg',
    'Best Cafes, Coffee & Hangout Spots',
    'বারুইপুরের সেরা ক্যাফে ও আড্ডার ঠেক গাইড',
    'Cafes & Hangouts',
    'কোল্ড কফি • পিৎজা ও মোমো • রুফটপ লাউঞ্জ • ইয়ুথ আড্ডা',
    [(18, 30, 40), (8, 15, 22)],
    (14, 165, 233) # Sky Blue accent
)

# 4. Traditional Sweets & Mishti Guide
create_food_banner(
    'public/images/baruipur-famous-sweets-guide.jpg',
    'Famous Heritage Sweet Shops & Mishti',
    'বারুইপুরের সেরা ঐতিহ্যবাহী মিষ্টি ও প্রাতঃরাশ',
    'Heritage Sweets',
    'খাঁটি ছানার সন্দেশ • রসগোল্লা ও কমলাভোগ • সকালের হিংয়ের কচুরি',
    [(40, 25, 10), (22, 14, 5)],
    (217, 119, 6) # Amber/Gold accent
)
