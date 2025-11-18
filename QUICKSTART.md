# Quick Start Guide

Get your extension running in 5 minutes!

## What You Need

1. Google Chrome browser
2. MoonShot AI API key (free to get)
3. 3 icon images (we'll help you with this)

## Step-by-Step Setup

### 1. Get Your API Key (2 minutes)

1. Go to https://platform.moonshot.cn/
2. Sign up (use phone number or email)
3. Click on "API Keys" in the dashboard
4. Click "Create New Key"
5. Copy the key (starts with `sk-`)
6. **Save it somewhere safe!**

### 2. Create Icons (2 minutes)

**Option A - Quick & Easy:**
Use this free online tool:
1. Go to https://www.favicon-generator.org/
2. Upload ANY image (logo, photo, anything)
3. Click "Create Favicon"
4. Download the package
5. Extract and find the 16x16, 48x48, and 128x128 PNG files
6. Rename them to `icon16.png`, `icon48.png`, `icon128.png`
7. Place them in the `icons/` folder

**Option B - Even Quicker:**
Create simple colored squares:
1. Go to https://dummyimage.com/16x16/667eea/fff
2. Right-click → Save as `icon16.png` in the `icons/` folder
3. Repeat for:
   - https://dummyimage.com/48x48/667eea/fff → `icon48.png`
   - https://dummyimage.com/128x128/667eea/fff → `icon128.png`

### 3. Install Extension (1 minute)

1. Open Chrome
2. Type `chrome://extensions/` in the address bar
3. Toggle **Developer mode** ON (top-right)
4. Click **Load unpacked**
5. Select this folder
6. Done! You'll see the extension icon

### 4. Configure API Key (30 seconds)

1. Click the extension icon in Chrome toolbar
2. Click "Open Settings"
3. Paste your API key
4. Click "Save Settings"

### 5. Test It! (30 seconds)

1. Go to any article (try https://en.wikipedia.org/wiki/Artificial_intelligence)
2. Click the extension icon
3. Click "Summarize This Page"
4. Wait a few seconds
5. Enjoy your summary!

## Troubleshooting

**Can't find the extension icon?**
- Look for the puzzle piece icon in Chrome toolbar
- Click it and pin "Quick Summarizer"

**"Please set your API key" message?**
- Make sure you saved the key in settings
- Check that it starts with `sk-`

**No icons showing?**
- Make sure you have all 3 icon files in the `icons/` folder
- File names must be exactly: `icon16.png`, `icon48.png`, `icon128.png`

**Extension won't load?**
- Check that you're in the right folder (should contain `manifest.json`)
- Try reloading the extension in `chrome://extensions/`

## Tips

- Works best on text-heavy pages (articles, blogs, Terms of Service)
- Enable "Use bullet points" for easier scanning
- Use the Copy button to save summaries
- Each summary costs about $0.01 - very affordable!

## Next Steps

- Check out the full README.md for advanced features
- Customize the extension colors and behavior
- Share with friends who have ADHD or need quick summaries!

---

Need more help? Check the main README.md file!
