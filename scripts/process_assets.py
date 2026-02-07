from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Paths
LOGO_PATH = "public/rumuze-logo-master.png"
SYMBOL_PATH = "public/rumuze-symbol.png"
TEXT_PATH = "public/rumuze-text.png"
BG_PATH = "public/rumuze-og-background.png"
OUTPUT_DIR = "public"

def generate_pwa_icons(logo_path, output_dir):
    try:
        img = Image.open(logo_path)
        
        # 1. Favicon (Multi-size ico)
        img.save(os.path.join(output_dir, "favicon.ico"), sizes=[(16,16), (32,32), (48,48), (64,64)])
        print("Generated favicon.ico")

        # 2. Apple Touch Icon (180x180)
        apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
        apple_icon.save(os.path.join(output_dir, "apple-touch-icon.png"))
        print("Generated apple-touch-icon.png")

        # 3. PWA 192
        pwa_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        pwa_192.save(os.path.join(output_dir, "rumuze-192.png"))
        print("Generated rumuze-192.png")

        # 4. PWA 512
        pwa_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
        pwa_512.save(os.path.join(output_dir, "rumuze-512.png"))
        print("Generated rumuze-512.png")
        
        # 5. Generic Logo png 
        img.save(os.path.join(output_dir, "rumuze.png"))
        print("Generated rumuze.png")

    except Exception as e:
        print(f"Error generating PWA icons: {e}")

def generate_og_image(bg_path, logo_path, output_dir):
    try:
        # Create base
        bg = Image.open(bg_path).convert("RGBA")
        bg = bg.resize((1200, 630), Image.Resampling.LANCZOS)
        
        # Overlay - Darken bg slightly for readability
        overlay = Image.new('RGBA', bg.size, (0, 11, 24, 150)) # Using brand midnight
        bg = Image.alpha_composite(bg, overlay)

        # Logo
        logo = Image.open(logo_path).convert("RGBA")
        # Resize logo to be reasonable
        logo_height = 300
        aspect_ratio = logo.width / logo.height
        logo_width = int(logo_height * aspect_ratio)
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
        
        # Center Logo
        bg_w, bg_h = bg.size
        logo_x = (bg_w - logo_width) // 2
        logo_y = (bg_h - logo_height) // 2
        
        bg.paste(logo, (logo_x, logo_y), logo)

        # Final Save
        bg = bg.convert("RGB")
        bg.save(os.path.join(output_dir, "og-image.jpg"), quality=100)
        bg.save(os.path.join(output_dir, "og-image.png"))
        print("Generated og-image assets")

    except Exception as e:
        print(f"Error generating OG image: {e}")

if __name__ == "__main__":
    generate_pwa_icons(LOGO_PATH, OUTPUT_DIR)
    generate_og_image(BG_PATH, LOGO_PATH, OUTPUT_DIR)
