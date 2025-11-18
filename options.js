// Options page script

// DOM elements
const apiKeyInput = document.getElementById('api-key');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const statusMessage = document.getElementById('status-message');
const togglePasswordBtn = document.getElementById('toggle-password');

/**
 * Load saved settings
 */
async function loadSettings() {
  try {
    const { apiKey } = await chrome.storage.sync.get('apiKey');
    if (apiKey) {
      apiKeyInput.value = apiKey;
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
    await chrome.storage.sync.set({ apiKey });
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
  if (!confirm('Are you sure you want to clear your API key?')) {
    return;
  }

  try {
    await chrome.storage.sync.remove('apiKey');
    apiKeyInput.value = '';
    showStatus('Settings cleared successfully', 'success');
  } catch (error) {
    console.error('Error clearing settings:', error);
    showStatus('Error clearing settings. Please try again.', 'error');
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
togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

// Allow Enter key to save
apiKeyInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveSettings();
  }
});

// Load settings when page opens
loadSettings();
