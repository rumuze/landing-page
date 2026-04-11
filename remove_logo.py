from PIL import Image
import os

input_path = os.path.expanduser('~/Downloads/Gemini_Generated_Image_93jvv793jvv793jv.png')
output_path = os.path.expanduser('~/Downloads/Gemini_Generated_Image_Edited.jpg')

try:
    print("Opening image...")
    with Image.open(input_path) as img:
        width, height = img.size
        print(f"Original size: {width}x{height}")
        
        # Crop bottom 200 pixels to remove Gemini watermark
        cropped_img = img.crop((0, 0, width, height - 200))
        
        # Compress to under 1MB
        quality = 95
        while quality > 10:
            cropped_img.convert('RGB').save(output_path, "JPEG", optimize=True, quality=quality)
            size_mb = os.path.getsize(output_path) / (1024 * 1024)
            if size_mb < 1.0:
                break
            quality -= 5
            
        print(f"Success! Image saved to:")
        print(output_path)
        print(f"New size: {size_mb:.2f} MB")
except FileNotFoundError:
    print(f"Error: Could not find the file at {input_path}")
except ImportError:
    print("Error: The 'Pillow' library is required. Install it using: pip3 install Pillow")
except Exception as e:
    print(f"Error: {e}")
