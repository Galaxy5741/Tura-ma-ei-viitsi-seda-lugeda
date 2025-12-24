// Options page script

// DOM elements
const apiKeyInput = document.getElementById('api-key');
const systemPromptInput = document.getElementById('system-prompt');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const resetPromptBtn = document.getElementById('reset-prompt-btn');
const statusMessage = document.getElementById('status-message');
const togglePasswordBtn = document.getElementById('toggle-password');

// Default system prompt (ADHD-friendly)
const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant for people with ADHD. Keep summaries extremely concise and use simple language.';

/**
 * Load saved settings
 */
async function loadSettings() {
  try {
    const { apiKey, systemPrompt } = await chrome.storage.sync.get(['apiKey', 'systemPrompt']);
    if (apiKey) {
      apiKeyInput.value = apiKey;
    }
    if (systemPrompt) {
      systemPromptInput.value = systemPrompt;
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

/**
 * Save settings
 */
async function saveSettings() {
  const apiKey = apiKeyInput.value.trim();
  const systemPrompt = systemPromptInput.value.trim();

  if (!apiKey) {
    showStatus('Please enter an API key', 'error');
    return;
  }

  // Basic validation
  if (!apiKey.startsWith('sk-')) {
    showStatus('API key should start with "sk-"', 'error');
    return;
  }

  try {
    const settings = { apiKey };

    // Only save system prompt if it's not empty
    if (systemPrompt) {
      settings.systemPrompt = systemPrompt;
    } else {
      // Remove custom prompt if empty (use default)
      await chrome.storage.sync.remove('systemPrompt');
    }

    await chrome.storage.sync.set(settings);
    showStatus('Settings saved successfully! ✓', 'success');
  } catch (error) {
    console.error('Error saving settings:', error);
    showStatus('Error saving settings. Please try again.', 'error');
  }
}

/**
 * Clear settings
 */
async function clearSettings() {
  if (!confirm('Are you sure you want to clear all settings?')) {
    return;
  }

  try {
    await chrome.storage.sync.remove(['apiKey', 'systemPrompt']);
    apiKeyInput.value = '';
    systemPromptInput.value = '';
    showStatus('Settings cleared successfully', 'success');
  } catch (error) {
    console.error('Error clearing settings:', error);
    showStatus('Error clearing settings. Please try again.', 'error');
  }
}

/**
 * Reset system prompt to default
 */
async function resetSystemPrompt() {
  systemPromptInput.value = '';
  try {
    await chrome.storage.sync.remove('systemPrompt');
    showStatus('System prompt reset to default', 'success');
  } catch (error) {
    console.error('Error resetting prompt:', error);
    showStatus('Error resetting prompt. Please try again.', 'error');
  }
}

/**
 * Show status message
 */
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;

  // Auto-hide after 3 seconds
  setTimeout(() => {
    statusMessage.className = 'status-message';
  }, 3000);
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
  if (apiKeyInput.type === 'password') {
    apiKeyInput.type = 'text';
    togglePasswordBtn.textContent = 'Hide';
  } else {
    apiKeyInput.type = 'password';
    togglePasswordBtn.textContent = 'Show';
  }
}

// Event listeners
saveBtn.addEventListener('click', saveSettings);
clearBtn.addEventListener('click', clearSettings);
resetPromptBtn.addEventListener('click', resetSystemPrompt);
togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

// Allow Enter key to save
apiKeyInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveSettings();
  }
});

// Load settings when page opens
loadSettings();
