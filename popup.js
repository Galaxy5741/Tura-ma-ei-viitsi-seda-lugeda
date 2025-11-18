// Popup script for the Chrome extension

// DOM elements
const setupNotice = document.getElementById('setup-notice');
const controls = document.getElementById('controls');
const summarizeBtn = document.getElementById('summarize-btn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const error = document.getElementById('error');
const summaryContent = document.getElementById('summary-content');
const errorMessage = document.getElementById('error-message');
const copyBtn = document.getElementById('copy-btn');
const retryBtn = document.getElementById('retry-btn');
const newSummaryBtn = document.getElementById('new-summary-btn');
const openSettingsBtn = document.getElementById('open-settings');
const settingsLink = document.getElementById('settings-link');
const bulletPointsCheckbox = document.getElementById('bullet-points');
const highlightKeyCheckbox = document.getElementById('highlight-key');

// State
let currentPageText = '';
let currentMetadata = {};

/**
 * Initialize the popup
 */
async function init() {
  // Check if API key is set
  const { apiKey } = await chrome.storage.sync.get('apiKey');

  if (!apiKey) {
    showSetupNotice();
  } else {
    showControls();
  }

  // Set up event listeners
  summarizeBtn.addEventListener('click', handleSummarize);
  copyBtn.addEventListener('click', handleCopy);
  retryBtn.addEventListener('click', handleRetry);
  newSummaryBtn.addEventListener('click', resetToControls);
  openSettingsBtn.addEventListener('click', openSettings);
  settingsLink.addEventListener('click', openSettings);
}

/**
 * Show setup notice
 */
function showSetupNotice() {
  hideAll();
  setupNotice.classList.remove('hidden');
}

/**
 * Show controls
 */
function showControls() {
  hideAll();
  controls.classList.remove('hidden');
}

/**
 * Show loading state
 */
function showLoading() {
  hideAll();
  loading.classList.remove('hidden');
}

/**
 * Show result
 */
function showResult(summary) {
  hideAll();
  result.classList.remove('hidden');
  summaryContent.innerHTML = summary;
}

/**
 * Show error
 */
function showError(message) {
  hideAll();
  error.classList.remove('hidden');
  errorMessage.textContent = message;
}

/**
 * Hide all views
 */
function hideAll() {
  setupNotice.classList.add('hidden');
  controls.classList.add('hidden');
  loading.classList.add('hidden');
  result.classList.add('hidden');
  error.classList.add('hidden');
}

/**
 * Handle summarize button click
 */
async function handleSummarize() {
  try {
    showLoading();

    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Extract text from the page
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractText' });

    if (!response.success) {
      throw new Error(response.error || 'Failed to extract text from page');
    }

    currentPageText = response.text;
    currentMetadata = response.metadata;

    // Check if text is too short
    if (response.wordCount < 50) {
      throw new Error('Not enough text content on this page to summarize (minimum 50 words)');
    }

    // Check if text is too long (MoonShot supports long context, but let's be reasonable)
    const maxWords = 50000;
    if (response.wordCount > maxWords) {
      currentPageText = currentPageText.split(/\s+/).slice(0, maxWords).join(' ');
    }

    // Get API key
    const { apiKey } = await chrome.storage.sync.get('apiKey');

    if (!apiKey) {
      showSetupNotice();
      return;
    }

    // Call MoonShot API
    const summary = await summarizeText(currentPageText, apiKey);

    // Show result
    showResult(summary);

  } catch (err) {
    console.error('Summarization error:', err);
    showError(err.message || 'An error occurred while summarizing. Please try again.');
  }
}

/**
 * Summarize text using MoonShot AI API
 */
async function summarizeText(text, apiKey) {
  const useBulletPoints = bulletPointsCheckbox.checked;
  const highlightKey = highlightKeyCheckbox.checked;

  // Build the prompt
  let prompt = `Please provide a clear and concise summary of the following text. `;

  if (useBulletPoints) {
    prompt += `Format the summary as bullet points. `;
  }

  if (highlightKey) {
    prompt += `Highlight important terms and concepts. `;
  }

  prompt += `Focus on the main ideas, key points, and important details. Make it easy to understand for someone who wants to quickly grasp the content without reading the entire text.

Text to summarize:

${text}`;

  try {
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates clear, concise summaries of text. You focus on extracting the most important information and presenting it in an easy-to-understand format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from API');
    }

    let summary = data.choices[0].message.content;

    // Format the summary for display
    summary = formatSummary(summary, highlightKey);

    return summary;

  } catch (err) {
    if (err.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw err;
  }
}

/**
 * Format summary for display
 */
function formatSummary(summary, highlightKey) {
  // Convert markdown-style bullet points to HTML
  summary = summary.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');

  if (summary.includes('<li>')) {
    summary = '<ul>' + summary + '</ul>';
  }

  // Convert bold markdown to HTML
  summary = summary.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert line breaks to HTML
  summary = summary.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

  // Wrap in paragraphs if not already formatted
  if (!summary.includes('<ul>') && !summary.includes('<p>')) {
    summary = '<p>' + summary + '</p>';
  }

  return summary;
}

/**
 * Handle copy button click
 */
async function handleCopy() {
  try {
    // Get plain text version
    const plainText = summaryContent.innerText;
    await navigator.clipboard.writeText(plainText);

    // Update button text temporarily
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

/**
 * Handle retry button click
 */
function handleRetry() {
  resetToControls();
}

/**
 * Reset to controls view
 */
function resetToControls() {
  showControls();
}

/**
 * Open settings page
 */
function openSettings() {
  chrome.runtime.openOptionsPage();
}

// Initialize when popup opens
init();
