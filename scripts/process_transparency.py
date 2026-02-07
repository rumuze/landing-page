from PIL import Image, ImageOps
import sys

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Threshold for "midnight black" - usually very low values
    threshold = 40 
    
    for item in datas:
        # If the pixel is close to black, make it transparent
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Processed {input_path} -> {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_transparency.py <input> <output>")
    else:
        make_transparent(sys.argv[1], sys.argv[2])
