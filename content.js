// Content script to extract text from the current page

/**
 * Extracts the main text content from the page
 * Tries to identify the main content area and exclude navigation, ads, etc.
 */
function extractPageText() {
  // Try to find the main content area
  const mainSelectors = [
    'article',
    'main',
    '[role="main"]',
    '.main-content',
    '#main-content',
    '.content',
    '#content',
    '.post-content',
    '.article-content'
  ];

  let mainElement = null;

  // Try to find main content using selectors
  for (const selector of mainSelectors) {
    mainElement = document.querySelector(selector);
    if (mainElement) break;
  }

  // If no main content found, use body but exclude certain elements
  if (!mainElement) {
    mainElement = document.body;
  }

  // Clone the element to avoid modifying the page
  const clone = mainElement.cloneNode(true);

  // Remove unwanted elements
  const unwantedSelectors = [
    'script',
    'style',
    'nav',
    'header',
    'footer',
    '.navigation',
    '.menu',
    '.sidebar',
    '.advertisement',
    '.ad',
    '.comments',
    'iframe',
    'noscript'
  ];

  unwantedSelectors.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Extract text content
  let text = clone.innerText || clone.textContent;

  // Clean up the text
  text = text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Remove multiple blank lines
    .trim();

  return text;
}

/**
 * Gets metadata about the page
 */
function getPageMetadata() {
  return {
    title: document.title,
    url: window.location.href,
    description: document.querySelector('meta[name="description"]')?.content || '',
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractText') {
    try {
      const text = extractPageText();
      const metadata = getPageMetadata();

      sendResponse({
        success: true,
        text: text,
        metadata: metadata,
        wordCount: text.split(/\s+/).length
      });
    } catch (error) {
      sendResponse({
        success: false,
        error: error.message
      });
    }
  }
  return true; // Keep the message channel open for async response
});
