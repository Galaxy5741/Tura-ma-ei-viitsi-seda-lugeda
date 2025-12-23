#!/usr/bin/env python3
"""
Generate extension icons from a source image.
This script will create icon16.png, icon48.png, and icon128.png from a source image.
"""

import sys
import os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow library is required.")
    print("Install it with: pip install Pillow")
    sys.exit(1)


def create_icon(source_image_path, output_folder, sizes=[16, 48, 128]):
    """
    Create extension icons from a source image.

    Args:
        source_image_path: Path to the source image
        output_folder: Folder where icons will be saved
        sizes: List of icon sizes to generate
    """
    try:
        # Open source image
        img = Image.open(source_image_path)
        print(f"✓ Loaded source image: {source_image_path}")
        print(f"  Original size: {img.size}")

        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Create output folder if it doesn't exist
        os.makedirs(output_folder, exist_ok=True)

        # Generate icons for each size
        for size in sizes:
            # Create a square icon by cropping to center
            icon = create_square_icon(img, size)

            # Save icon
            output_path = os.path.join(output_folder, f'icon{size}.png')
            icon.save(output_path, 'PNG')
            print(f"✓ Created {output_path}")

        print("\n🎉 All icons created successfully!")
        print("\nNext steps:")
        print("1. Go to chrome://extensions/")
        print("2. Find 'Quick Summarizer'")
        print("3. Click the reload icon ↻")
        print("4. Your custom icons will appear!")

    except FileNotFoundError:
        print(f"Error: Image file not found: {source_image_path}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


def create_square_icon(img, size):
    """
    Create a square icon by resizing and cropping to center.
    """
    # Calculate dimensions to crop to square
    width, height = img.size

    if width == height:
        # Already square, just resize
        return img.resize((size, size), Image.Resampling.LANCZOS)

    # Crop to square from center
    min_dimension = min(width, height)
    left = (width - min_dimension) // 2
    top = (height - min_dimension) // 2
    right = left + min_dimension
    bottom = top + min_dimension

    img_cropped = img.crop((left, top, right, bottom))

    # Resize to target size
    return img_cropped.resize((size, size), Image.Resampling.LANCZOS)


def find_source_image(icons_folder):
    """
    Find a suitable source image in the icons folder.
    """
    image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp']

    for file in os.listdir(icons_folder):
        ext = os.path.splitext(file)[1].lower()
        if ext in image_extensions and not file.startswith('icon'):
            return os.path.join(icons_folder, file)

    return None


if __name__ == '__main__':
    # Get the icons folder path (same directory as this script)
    script_dir = Path(__file__).parent
    icons_folder = script_dir

    print("🎨 Extension Icon Generator")
    print("=" * 50)

    # Check if source image is provided as argument
    if len(sys.argv) > 1:
        source_image = sys.argv[1]
    else:
        # Try to find an image in the icons folder
        source_image = find_source_image(icons_folder)

        if not source_image:
            print("\nNo source image found in the icons folder.")
            print("\nUsage:")
            print("  python generate-extension-icons.py <path-to-image>")
            print("\nOr place your image in the icons/ folder and run:")
            print("  python generate-extension-icons.py")
            print("\nSupported formats: PNG, JPG, GIF, WebP")
            sys.exit(1)

    print(f"\nSource image: {source_image}")
    print(f"Output folder: {icons_folder}\n")

    # Generate icons
    create_icon(source_image, icons_folder)
