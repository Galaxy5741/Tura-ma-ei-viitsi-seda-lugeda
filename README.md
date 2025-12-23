# Quick Summarizer - Chrome Extension

**For ADHD people who can't fucking read long documents!**

A Chrome extension that instantly summarizes long documents, articles, and Terms of Service pages using AI.

## Features
**Shortly** It summerizes long ass documents

- **One-Click Summarization** - Summarize any webpage with a single click
- **Smart Text Extraction** - Automatically identifies and extracts main content
- **Customizable Output** - Choose bullet points and highlighting options
- **Fast & Affordable** - Uses MoonShot AI (~$0.01 per summary)
- **Privacy-Focused** - API key stored locally, no data collection
- **Beautiful UI** - Clean, modern interface with smooth animationsclaude --teleport session_013g36Bu3vYJTWuAYd2sPg37

## Cost Information

MoonShot AI offers excellent pricing:
- **Input**: ~$0.60 per 1 million tokens
- **Output**: ~$2.50 per 1 million tokens
- **Average cost per summary**: $0.01 or less
- **Comparison**: 100x cheaper than Claude Opus, 3-4x cheaper than GPT-4

This means you can summarize hundreds of documents for just a few dollars!

## Installation

### Step 1: Get Your MoonShot AI API Key

1. Visit [MoonShot AI Platform](https://platform.moonshot.cn/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy and save the key (starts with `sk-`)

### Step 2: Load the Extension in Chrome

1. Download this Github repo
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the extension directory (this folder)
6. The extension should now appear in your extensions list

### Step 3: Configure Your API Key

1. Click the extension icon in your Chrome toolbar
2. Click **Open Settings** or **Settings** link
3. Paste your MoonShot AI API key
4. Click **Save Settings**

## Usage

### Basic Usage

1. Navigate to any webpage with text content (article, blog post, Terms of Service, etc.)
2. Click the **Quick Summarizer** extension icon
3. Click **Summarize This Page**
4. Wait a few seconds for the AI to process
5. Read your summary!

### Options

- **Use bullet points**: Format summary as easy-to-scan bullet points
- **Highlight key terms**: Emphasizes important concepts and terms

### Tips for Best Results

- Works best on pages with substantial text (minimum 50 words)
- Ideal for: Articles, blog posts, Terms of Service, privacy policies, documentation
- May not work well on: Image-heavy pages, videos, highly interactive content
- If a page has multiple articles, it will try to find the main content

## Features in Detail

### Smart Content Extraction

The extension intelligently identifies the main content on a page by:
- Looking for semantic HTML elements (`<article>`, `<main>`)
- Excluding navigation, ads, and sidebars
- Cleaning up extra whitespace

### Secure Storage

- Your API key is stored in Chrome's secure sync storage
- The key is only sent to MoonShot AI for API requests
- No tracking, no analytics, no data collection

### Copy Summary

Click the **Copy** button to copy the plain text summary to your clipboard for use elsewhere.

## File Structure

```
quick-summarizer/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup logic and API calls
├── content.js            # Content extraction script
├── options.html          # Settings page
├── options.js            # Settings page logic
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Troubleshooting

### "Please set your API key" message

- Make sure you've entered your API key in the settings
- Verify the key starts with `sk-`
- Try saving the key again

### "Failed to extract text from page" error

- The page may not have enough text content
- Try a different page with more text
- Some websites may have unusual HTML structures

### "Network error" message

- Check your internet connection
- Verify the MoonShot AI API is accessible
- Try again in a few moments

### API Error Messages

- **401 Unauthorized**: Your API key may be invalid or expired
- **429 Too Many Requests**: You've hit rate limits, wait a moment
- **500 Server Error**: MoonShot AI may be experiencing issues

## Privacy & Security

- **No data collection**: This extension does not collect any user data
- **Local storage**: API keys are stored locally in Chrome's sync storage
- **Direct API calls**: Your text is sent directly to MoonShot AI, not through any intermediary
- **No tracking**: No analytics, no tracking pixels, no external services

## Development

### Technologies Used

- **Manifest V3**: Latest Chrome extension standard
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Chrome Storage API**: Secure, synced settings
- **MoonShot AI API**: Affordable, high-quality summarization

### Customization

You can customize the extension by modifying:
- `popup.css`: Change colors, fonts, layout
- `popup.js`: Adjust prompt, max tokens, temperature
- `content.js`: Modify text extraction logic

## Alternative AI Providers

While this extension is configured for MoonShot AI, you can modify it to use other providers:

- **OpenAI GPT-3.5 Turbo**: Change API endpoint to `https://api.openai.com/v1/chat/completions`
- **Anthropic Claude**: Use Claude API endpoint
- **Others**: Any OpenAI-compatible API should work with minimal changes

To switch providers, modify the fetch URL and headers in `popup.js` (around line 180).

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue in this repository.

## Credits

Made with ❤️ as a Christmas gift to help make reading easier for people with ADHD.

---

**Note**: This extension requires an active internet connection and a valid MoonShot AI API key to function.
