import { UNIFIED_RULES, PREDEFINED_RULE_SETS } from './config.js';

export function generateHtml(xrayUrl, singboxUrl, clashUrl) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${generateHead()}
      ${generateBody(xrayUrl, singboxUrl, clashUrl)}
    </html>
  `;
}

const generateHead = () => `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sublink Worker</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
      ${generateStyles()}
    </style>
  </head>
`;

const generateStyles = () => `
  :root {
    --bg-color: #f0f2f5;
    --text-color: #495057;
    --card-bg: #ffffff;
    --card-header-bg: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    --btn-primary-bg: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    --input-bg: #ffffff;
    --input-border: #ced4da;
    --input-text: #495057;
    --placeholder-color: #6c757d;
    --checkbox-bg: #ffffff;
    --checkbox-border: #ced4da;
    --checkbox-checked-bg: #6a11cb;
    --checkbox-checked-border: #6a11cb;
    --explanation-bg: #e9ecef;
    --explanation-text: #495057;
    --select-bg: #ffffff;
    --select-text: #495057;
    --select-border: #ced4da;
  }

  [data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    --card-bg: #2c2c2c;
    --card-header-bg: linear-gradient(135deg, #4a0e8f 0%, #1a5ab8 100%);
    --btn-primary-bg: linear-gradient(135deg, #4a0e8f 0%, #1a5ab8 100%);
    --input-bg: #3c3c3c;
    --input-border: #555555;
    --input-text: #e0e0e0;
    --placeholder-color: #adb5bd;
    --checkbox-bg: #3c3c3c;
    --checkbox-border: #555555;
    --checkbox-checked-bg: #4a0e8f;
    --checkbox-checked-border: #4a0e8f;
    --explanation-bg: #383838;
    --explanation-text: #b0b0b0;
    --select-bg: #3c3c3c;
    --select-text: #e0e0e0;
    --select-border: #555555;
  }

  .container { max-width: 800px; }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .card {
    background-color: var(--card-bg);
    border: none;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: background-color 0.3s ease;
  }

  .card-header {
    background: var(--card-header-bg);
    color: white;
    border-radius: 15px 15px 0 0;
    padding: 2rem;
  }

  .card-body { padding: 2rem; }

  .btn-primary {
    background: var(--btn-primary-bg);
    border: none;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .input-group-text, .form-control {
    background-color: var(--input-bg);
    border-color: var(--input-border);
    color: var(--input-text);
  }

  .form-control:focus {
    background-color: var(--input-bg);
    color: var(--input-text);
    box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.25);
  }

  .input-group { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04); }

  h2, h4 {
    color: var(--text-color);
    font-weight: 600;
  }

  .form-label {
    font-weight: 500;
    color: var(--text-color);
  }

  .btn-outline-secondary {
    color: var(--text-color);
    border-color: var(--input-border);
  }

  .btn-outline-secondary:hover {
    background-color: var(--input-bg);
    color: var(--text-color);
  }

  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
  }

  .btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }

  #darkModeToggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  .github-link {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-size: 2rem;
    color: var(--text-color);
    transition: color 0.3s ease;
  }

  .github-link:hover { color: #6a11cb; }
  
  .tooltip-icon {
    cursor: pointer;
    margin-left: 5px;
    color: var(--text-color);
    position: relative;
    display: inline-block;
    vertical-align: super;
    font-size: 1em;
  }

  .question-mark {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background-color: var(--text-color);
    color: var(--card-bg);
  }

  .tooltip-content {
    visibility: hidden;
    opacity: 0;
    background-color: var(--card-bg);
    position: fixed; // 改为固定定位
    background-color: var(--card-bg);
    color: var(--text-color);
    border: 1px solid var(--input-border);
    border-radius: 6px;
    padding: 10px;
    z-index: 1000; // 提高z-index值
    width: 300px;
    max-width: 90vw; // 限制最大宽度
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s, visibility 0.3s;
  }

  .tooltip-icon:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: 768px) {
    .tooltip-content {
      width: 250px;
      left: auto;
      right: 0;
      transform: none;
    }
  }

  .form-check-input {
    background-color: var(--checkbox-bg);
    border-color: var(--checkbox-border);
  }

  .form-check-input:checked {
    background-color: var(--checkbox-checked-bg);
    border-color: var(--checkbox-checked-border);
  }

  .form-check-label {
    color: var(--text-color);
  }
  .explanation-text {
    background-color: var(--explanation-bg);
    color: var(--explanation-text);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .form-select {
    background-color: var(--select-bg);
    color: var(--select-text);
    border-color: var(--select-border);
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23495057' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1em;
    padding-right: 2.5em;
  }

  [data-theme="dark"] .form-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  }

  .form-select:focus {
    background-color: var(--select-bg);
    color: var(--select-text);
    border-color: var(--checkbox-checked-border);
    box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.25);
  }

  .form-control::placeholder {
    color: var(--placeholder-color);
    opacity: 1;
  }

  .form-control::-webkit-input-placeholder {
    color: var(--placeholder-color);
    opacity: 1;
  }

  .form-control::-moz-placeholder {
    color: var(--placeholder-color);
    opacity: 1;
  }

  .form-control:-ms-input-placeholder {
    color: var(--placeholder-color);
    opacity: 1;
  }

  .form-control::-ms-input-placeholder {
    color: var(--placeholder-color);
    opacity: 1;
  }

  #advancedOptions {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out, opacity 0.5s ease-out, transform 0.5s ease-out;
    opacity: 0;
    transform: translateY(-10px);
  }

  #advancedOptions.show {
    max-height: none;
    opacity: 1;
    transform: translateY(0);
    transition: max-height 0.5s ease-in, opacity 0.5s ease-in, transform 0.5s ease-in;
  }

  .header-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
  }
  .header-title {
      margin: 0;
      margin-right: 10px;
  }

`;

const generateBody = (xrayUrl, singboxUrl, clashUrl) => `
  <body>
    ${generateDarkModeToggle()}
    ${generateGithubLink()}
    <div class="container mt-5">
      <div class="card mb-5">
        ${generateCardHeader()}
        <div class="card-body">
          ${generateForm()}
          ${generateSubscribeLinks(xrayUrl, singboxUrl, clashUrl)}
        </div>
      </div>
    </div>
    ${generateScripts()}
  </body>
`;

const generateDarkModeToggle = () => `
  <button id="darkModeToggle" class="btn btn-outline-secondary">
    <i class="fas fa-moon"></i>
  </button>
`;

const generateGithubLink = () => `
  <a href="https://github.com/7Sageer/sublink-worker" target="_blank" rel="noopener noreferrer" class="github-link">
    <i class="fab fa-github"></i>
  </a>
`;

const generateCardHeader = () => `
  <div class="card-header text-center">
    <h1 class="display-4 mb-0">Sublink Worker</h1>
  </div>
`;

const generateForm = () => `
  <form method="POST" id="encodeForm">
    <div class="mb-4">
      <label for="inputTextarea" class="form-label">Enter Your Share URLs:</label>
      <textarea class="form-control" id="inputTextarea" name="input" required placeholder="vmess://abcd..." rows="3"></textarea>
    </div>
    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="advancedToggle">
      <label class="form-check-label" for="advancedToggle">Advanced Options</label>
    </div>
    <div id="advancedOptions">
      ${generateRuleSetSelection()}
    </div>
    <div class="d-grid mt-4">
      <button type="submit" class="btn btn-primary btn-lg">
        <i class="fas fa-sync-alt me-2"></i>Convert
      </button>
    </div>
    <div class="d-grid mt-2">
      <button type="button" class="btn btn-secondary btn-lg" id="clearFormBtn">
        <i class="fas fa-trash-alt me-2"></i>Clear Form
      </button>
    </div>
  </form>
`;

const generateSubscribeLinks = (xrayUrl, singboxUrl, clashUrl) => `
  <div class="mt-5">
    <h2 class="mb-4">Your subscribe links:</h2>
    ${generateLinkInput('Xray Link:', 'xrayLink', xrayUrl)}
    ${generateLinkInput('SingBox Link:', 'singboxLink', singboxUrl)}
    ${generateLinkInput('Clash Link:', 'clashLink', clashUrl)}
    <div class="d-grid">
      <button class="btn btn-primary btn-lg" type="button" onclick="shortenAllUrls()">
        <i class="fas fa-compress-alt me-2"></i>Shorten Links
      </button>
    </div>
  </div>
`;

const generateLinkInput = (label, id, value) => `
  <div class="mb-4">
    <label for="${id}" class="form-label">${label}</label>
    <div class="input-group">
      <span class="input-group-text"><i class="fas fa-link"></i></span>
      <input type="text" class="form-control" id="${id}" value="${value}" readonly>
      <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard('${id}')">
        <i class="fas fa-copy"></i>
      </button>
    </div>
  </div>
`;

const generateScripts = () => `
  <script>
    ${copyToClipboardFunction()}
    ${shortenAllUrlsFunction()}
    ${darkModeToggleFunction()}
    ${advancedOptionsToggleFunction()}
    ${applyPredefinedRulesFunction()}
    ${tooltipFunction()}
    ${submitFormFunction()}
    ${customRuleFunctions}
  </script>
`;

const advancedOptionsToggleFunction = () => `
  document.getElementById('advancedToggle').addEventListener('change', function() {
    const advancedOptions = document.getElementById('advancedOptions');
    if (this.checked) {
      advancedOptions.classList.add('show');
    } else {
      advancedOptions.classList.remove('show');
    }
  });
`;

const copyToClipboardFunction = () => `
  function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    const button = element.nextElementSibling;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.remove('btn-outline-secondary');
    button.classList.add('btn-success');
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('btn-success');
      button.classList.add('btn-outline-secondary');
    }, 2000);
  }
`;

const shortenAllUrlsFunction = () => `
  async function shortenUrl(url) {
    const response = await fetch(\`/shorten?url=\${encodeURIComponent(url)}\`);
    if (response.ok) {
      const data = await response.json();
      return data.shortUrl;
    }
    throw new Error('Failed to shorten URL');
  }

  async function shortenAllUrls() {
    const shortenButton = document.querySelector('button[onclick="shortenAllUrls()"]');
    shortenButton.disabled = true;
    shortenButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Shortening...';

    try {
      const xrayLink = document.getElementById('xrayLink');
      const singboxLink = document.getElementById('singboxLink');
      const clashLink = document.getElementById('clashLink');

      const [xrayShortUrl, singboxShortUrl, clashShortUrl] = await Promise.all([
        shortenUrl(xrayLink.value),
        shortenUrl(singboxLink.value),
        shortenUrl(clashLink.value)
      ]);

      xrayLink.value = xrayShortUrl;
      singboxLink.value = singboxShortUrl;
      clashLink.value = clashShortUrl;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      shortenButton.disabled = false;
      shortenButton.innerHTML = '<i class="fas fa-compress-alt me-2"></i>Shorten Links';
    }
  }
`;

const darkModeToggleFunction = () => `
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  darkModeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    darkModeToggle.innerHTML = body.getAttribute('data-theme') === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    darkModeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } else if (systemDarkMode) {
    body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Save theme preference when changed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        localStorage.setItem('theme', body.getAttribute('data-theme'));
      }
    });
  });

  observer.observe(body, { attributes: true });
`;

const generateRuleSetSelection = () => `
  <div class="container">
    <div class="header-container">
      <h4 class="header-title">Rule Selection</h4>
      <span class="tooltip-icon">
        <i class="fas fa-question-circle"></i>
        <span class="tooltip-content">
          These rules determine how traffic is directed through different proxies or directly. If you're unsure, you can use a predefined rule set.
        </span>
      </span>
    </div>

    <div class="content-container mb-3">
      <label for="predefinedRules" class="form-label">Rule Sets:</label>
      <select class="form-select" id="predefinedRules" onchange="applyPredefinedRules()">
        <option value="custom">Custom</option>
        <option value="minimal">Minimal</option>
        <option value="balanced">Balanced</option>
        <option value="comprehensive">Comprehensive</option>
      </select>
    </div>
    <div class="row" id="ruleCheckboxes">
      ${UNIFIED_RULES.map(rule => `
        <div class="col-md-4 mb-2">
          <div class="form-check">
            <input class="form-check-input rule-checkbox" type="checkbox" value="${rule.name}" id="${rule.name}" name="selectedRules">
            <label class="form-check-label" for="${rule.name}">${rule.outbound}</label>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="mt-4">
      <h4>Custom Rules</h4>
      <div id="customRules">
      <!-- Custom rules will be dynamically added here -->
    </div>
    <button type="button" class="btn btn-secondary mt-2" onclick="addCustomRule()">Add Custom Rule</button>
  </div>
  </div>
`;

const applyPredefinedRulesFunction = () => `
  function applyPredefinedRules() {
    const predefinedRules = document.getElementById('predefinedRules').value;
    const checkboxes = document.querySelectorAll('.rule-checkbox');
    
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    if (predefinedRules === 'custom') {
      return;
    }

    const rulesToApply = ${JSON.stringify(PREDEFINED_RULE_SETS)};
    
    rulesToApply[predefinedRules].forEach(rule => {
      const checkbox = document.getElementById(rule);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }
`;

const tooltipFunction = () => `
  function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip-icon');
    tooltips.forEach(tooltip => {
      tooltip.addEventListener('click', (e) => {
        e.stopPropagation();
        const content = tooltip.querySelector('.tooltip-content');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
    });

    document.addEventListener('click', () => {
      const openTooltips = document.querySelectorAll('.tooltip-content[style="display: block;"]');
      openTooltips.forEach(tooltip => {
        tooltip.style.display = 'none';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initTooltips);
`;

const submitFormFunction = () => `
  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const inputString = formData.get('input');
    
    // Save form data to localStorage
    localStorage.setItem('inputTextarea', inputString);
    localStorage.setItem('advancedToggle', document.getElementById('advancedToggle').checked);
    saveSelectedRules();
    
    let selectedRules;
    const predefinedRules = document.getElementById('predefinedRules').value;
    if (predefinedRules !== 'custom') {
      selectedRules = predefinedRules;
    } else {
      selectedRules = Array.from(document.querySelectorAll('input[name="selectedRules"]:checked'))
        .map(checkbox => checkbox.value);
    }

    const customRules = Array.from(document.querySelectorAll('.custom-rule')).map(rule => ({
      site: rule.querySelector('input[name="customRuleSite[]"]').value,
      ip: rule.querySelector('input[name="customRuleIP[]"]').value,
      name: rule.querySelector('input[name="customRuleName[]"]').value,
      domain_suffix: rule.querySelector('input[name="customRuleDomainSuffix[]"]').value,
      ip_cidr: rule.querySelector('input[name="customRuleIPCIDR[]"]').value
    }));

    const xrayUrl = \`\${window.location.origin}/xray?config=\${encodeURIComponent(inputString)}\`;
    const singboxUrl = \`\${window.location.origin}/singbox?config=\${encodeURIComponent(inputString)}&selectedRules=\${encodeURIComponent(JSON.stringify(selectedRules))}&customRules=\${encodeURIComponent(JSON.stringify(customRules))}\`;
    const clashUrl = \`\${window.location.origin}/clash?config=\${encodeURIComponent(inputString)}&selectedRules=\${encodeURIComponent(JSON.stringify(selectedRules))}&customRules=\${encodeURIComponent(JSON.stringify(customRules))}\`;

    document.getElementById('xrayLink').value = xrayUrl;
    document.getElementById('singboxLink').value = singboxUrl;
    document.getElementById('clashLink').value = clashUrl;
  }

  function loadSavedFormData() {
    const savedInput = localStorage.getItem('inputTextarea');
    if (savedInput) {
      document.getElementById('inputTextarea').value = savedInput;
    }

    const advancedToggle = localStorage.getItem('advancedToggle');
    if (advancedToggle) {
      document.getElementById('advancedToggle').checked = advancedToggle === 'true';
      if (advancedToggle === 'true') {
        document.getElementById('advancedOptions').classList.add('show');
      }
    }

    loadSelectedRules();
  }

  function saveSelectedRules() {
    const selectedRules = Array.from(document.querySelectorAll('input[name="selectedRules"]:checked'))
      .map(checkbox => checkbox.value);
    localStorage.setItem('selectedRules', JSON.stringify(selectedRules));
    localStorage.setItem('predefinedRules', document.getElementById('predefinedRules').value);
  }

  function loadSelectedRules() {
    const savedRules = localStorage.getItem('selectedRules');
    if (savedRules) {
      const rules = JSON.parse(savedRules);
      rules.forEach(rule => {
        const checkbox = document.querySelector(\`input[name="selectedRules"][value="\${rule}"]\`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }

    const savedPredefinedRules = localStorage.getItem('predefinedRules');
    if (savedPredefinedRules) {
      document.getElementById('predefinedRules').value = savedPredefinedRules;
    }
  }

  function clearFormData() {
    localStorage.removeItem('inputTextarea');
    localStorage.removeItem('advancedToggle');
    localStorage.removeItem('selectedRules');
    localStorage.removeItem('predefinedRules');
    document.getElementById('inputTextarea').value = '';
    document.getElementById('advancedToggle').checked = false;
    document.getElementById('advancedOptions').classList.remove('show');
    document.querySelectorAll('input[name="selectedRules"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('predefinedRules').value = 'custom';
  }

  document.addEventListener('DOMContentLoaded', function() {
    loadSavedFormData();
    document.getElementById('encodeForm').addEventListener('submit', submitForm);
    document.getElementById('clearFormBtn').addEventListener('click', clearFormData);
  });
`;

const customRuleFunctions = `
  let customRuleCount = 0;

  function addCustomRule() {
    const customRulesDiv = document.getElementById('customRules');
    const newRuleDiv = document.createElement('div');
    newRuleDiv.className = 'custom-rule mb-3 p-3 border rounded';
    newRuleDiv.dataset.ruleId = customRuleCount++;
    newRuleDiv.innerHTML = \`
      <div class="mb-2">
        <label class="form-label">Outbound Name*</label>
        <input type="text" class="form-control mb-2" name="customRuleName[]" placeholder="Rule Name" required>
      </div>
      <div class="mb-2">
        <label class="form-label">Geo-Site Rule Sets</label>
        <span class="tooltip-icon">
          <i class="fas fa-question-circle"></i>
          <span class="tooltip-content">
            Site Rules in SingBox comes from https://github.com/lyc8503/sing-box-rules, that means your custom rules must be in the repos
          </span>
        </span>
        <input type="text" class="form-control" name="customRuleSite[]" placeholder="e.g., google,anthropic">
      </div>
      <div class="mb-2">
        <label class="form-label">Geo-IP Rule Sets</label>
        <span class="tooltip-icon">
          <i class="fas fa-question-circle"></i>
          <span class="tooltip-content">
            IP Rules in SingBox comes from https://github.com/lyc8503/sing-box-rules, that means your custom rules must be in the repos
          </span>
        </span>
        <input type="text" class="form-control" name="customRuleIP[]" placeholder="e.g., private,cn">
      </div>
      <div class="mb-2">
        <label class="form-label">Domain Suffix</label>
        <input type="text" class="form-control mb-2" name="customRuleDomainSuffix[]" placeholder="Domain Suffix (comma separated)">
      </div>
      <div class="mb-2">
        <label class="form-label">IP CIDR</label>
        <input type="text" class="form-control mb-2" name="customRuleIPCIDR[]" placeholder="IP CIDR (comma separated)">
        <button type="button" class="btn btn-danger btn-sm" onclick="removeCustomRule(this)">Remove</button>
      </div>
    \`;
    customRulesDiv.appendChild(newRuleDiv);
  }

  function removeCustomRule(button) {
    button.parentElement.remove();
    customRuleCount--;
  }
`;