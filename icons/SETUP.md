# 🎨 Icon Setup Guide

## Quick Option: Use Your ADHD Images

You have awesome ADHD-themed images! Here's how to convert them to extension icons:

### Method 1: Using the Python Script (Easiest)

1. **Save one of your ADHD images** to the `icons/` folder
   - Name it something like `adhd-logo.png`

2. **Run the generator:**
   ```bash
   cd icons
   python generate-extension-icons.py adhd-logo.png
   ```

3. **Done!** The script will create:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

### Method 2: Using the HTML Tool

1. **Open** `icons/create-icons-from-image.html` in your browser
2. **Drag and drop** your ADHD image
3. **Click** "Generate Extension Icons"
4. **Download** all 3 icons and save them in the `icons/` folder

---

## What You Need

The extension needs these 3 files in the `icons/` folder:
- `icon16.png` - Small icon (16×16 pixels)
- `icon48.png` - Medium icon (48×48 pixels)
- `icon128.png` - Large icon (128×128 pixels)

---

## After Adding Icons

1. Go to `chrome://extensions/`
2. Find "Quick Summarizer"
3. Click the reload/refresh icon ↻
4. Your icons will appear!

---

## Need Help?

If you don't have Python installed, you can:
- Use the HTML tool (`create-icons-from-image.html`)
- Use an online tool like https://www.favicon-generator.org/
- Ask for help!
