/* ==========================================================================
   CliChat — Premium SaaS Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ── 1. INITIALIZE ANIMATE ON SCROLL (AOS) ──
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      disable: 'mobile',
      offset: 100
    });
  }

  // ── 2. EMAILJS CONFIGURATION ──
  const EMAILJS_SERVICE_ID  = 'service_up6rc0p';
  const EMAILJS_TEMPLATE_ID = 'template_tziuu71';
  const EMAILJS_PUBLIC_KEY  = 'nWS37xvspd7TaQMuG';

  // ── 3. STICKY NAVBAR SCROLL EVENT ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── 4. MOBILE NAVIGATION DRAWER ──
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (mobileDrawer.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close drawer when clicking a mobile link
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  }

  // ── 5. INTERACTIVE HERO CHAT SIMULATION ──
  const chatMessages = [
    { role: 'bot', text: 'Hello! 👋 Welcome to Kofi Electronics. How can I help you today?' },
    { role: 'user', text: 'Do you have the Samsung A55 in stock?' },
    { role: 'bot', text: 'Yes! The Samsung Galaxy A55 is available in Black and Light Blue. Current price is GHS 2,800. Would you like to place an order?' },
    { role: 'user', text: 'Can I pay on delivery?' },
    { role: 'bot', text: 'Absolutely ✅ We accept cash on delivery for Accra and Tema. Delivery takes 1–2 business days. Shall I take your order?' }
  ];

  const chatBody = document.getElementById('chatBody');
  const chatTyping = document.getElementById('chatTyping');

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function appendMessage(role, text) {
    const msgElement = document.createElement('div');
    msgElement.className = `chat-msg ${role}`;
    msgElement.textContent = text;
    chatBody.insertBefore(msgElement, chatTyping);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function startChatSimulation() {
    if (!chatBody) return;
    
    // Clear old messages except typing indicator
    const currentMsgs = chatBody.querySelectorAll('.chat-msg');
    currentMsgs.forEach(m => m.remove());

    await delay(1000);

    for (const msg of chatMessages) {
      if (msg.role === 'bot') {
        chatTyping.style.display = 'flex';
        chatBody.scrollTop = chatBody.scrollHeight;
        await delay(1500); // Simulate typing
        chatTyping.style.display = 'none';
      } else {
        await delay(800); // Wait between inputs
      }
      await appendMessage(msg.role, msg.text);
      await delay(1500);
    }

    // Pause before resetting
    await delay(4000);
    startChatSimulation();
  }

  startChatSimulation();

  // ── 6. STATISTIC NUMBERS ANIMATION ──
  const stats = document.querySelectorAll('.stat-num');
  
  function startCounters() {
    stats.forEach(stat => {
      const targetText = stat.getAttribute('data-target');
      if (!targetText) return; // Skip "24/7" static value
      
      const target = parseInt(targetText, 10);
      const suffix = stat.textContent.includes('GHS') ? 'GHS ' : stat.textContent.includes('%') ? '%' : '';
      let count = 0;
      const speed = target / 60; // Adjust increment speed
      
      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerHTML = suffix ? `${suffix}${Math.floor(count).toLocaleString()}` : Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.innerHTML = suffix ? `${suffix}${target.toLocaleString()}` : target;
        }
      };
      updateCount();
    });
  }

  // Trigger counters when the stats section is scrolled into viewport
  let observerTriggered = false;
  const statsSection = document.querySelector('.stats-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !observerTriggered) {
        startCounters();
        observerTriggered = true;
      }
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  } else {
    // Fallback if IntersectionObserver is not supported
    setTimeout(startCounters, 1500);
  }

  // ── 7. FAQ ACCORDION HANDLERS ──
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Collapse other open FAQs
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      // Toggle current FAQ
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ── 8. MULTI-STEP QUOTE WIZARD SYSTEM ──
  let wizardCurrentStep = 1;
  const wizardForm = document.getElementById('quoteWizardForm');
  const btnNext = document.getElementById('btnNext');
  const btnBack = document.getElementById('btnBack');
  const btnSubmit = document.getElementById('btnSubmit');
  const wizardSuccess = document.getElementById('wizardSuccessScreen');
  const progressBarFill = document.getElementById('progressBarFill');
  const currentStepText = document.getElementById('currentStepText');
  const priceFeedbackValue = document.getElementById('priceFeedbackValue');
  const generalFormError = document.getElementById('generalFormError');

  // Input selectors
  const fields = {
    businessName: document.getElementById('businessName'),
    contactName: document.getElementById('contactName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    industry: document.getElementById('industry'),
    volume: document.getElementById('volume'),
    platforms: {
      Website: document.getElementById('platformWebsite'),
      WhatsApp: document.getElementById('platformWhatsApp'),
      Telegram: document.getElementById('platformTelegram')
    }
  };

  // Live price evaluation logic
  function calculateLivePrice() {
    const basePrice = 2999;
    let platformsSelectedCount = 0;
    
    // Count how many checkboxes are active
    if (fields.platforms.Website.checked) platformsSelectedCount++;
    if (fields.platforms.WhatsApp.checked) platformsSelectedCount++;
    if (fields.platforms.Telegram.checked) platformsSelectedCount++;

    const finalPrice = basePrice + (platformsSelectedCount * 1000);
    const priceText = `GHS ${finalPrice.toLocaleString()}`;
    if (priceFeedbackValue) {
      priceFeedbackValue.textContent = priceText;
    }
    const successPriceEl = document.getElementById('successPriceValue');
    if (successPriceEl) {
      successPriceEl.textContent = priceText;
    }
    return finalPrice;
  }

  // Event listeners on checkboxes to trigger live update
  Object.values(fields.platforms).forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      calculateLivePrice();
      // Remove validation error on platforms selection if active
      if (getCheckedPlatforms().length > 0) {
        clearFieldValidationError('platforms');
      }
    });
  });

  // Real-time validation clearers upon keystroke/selection
  ['businessName', 'contactName', 'email', 'phone', 'industry', 'volume'].forEach(key => {
    fields[key].addEventListener('input', () => {
      clearFieldValidationError(key);
    });
    fields[key].addEventListener('change', () => {
      clearFieldValidationError(key);
    });
  });

  function clearFieldValidationError(fieldName) {
    if (fieldName === 'platforms') {
      const errEl = document.getElementById('err-platforms');
      if (errEl) errEl.style.display = 'none';
      return;
    }
    const group = fields[fieldName].closest('.form-group');
    if (group) {
      group.classList.remove('invalid');
    }
  }

  function applyFieldValidationError(fieldName) {
    if (fieldName === 'platforms') {
      const errEl = document.getElementById('err-platforms');
      if (errEl) errEl.style.display = 'block';
      return;
    }
    const group = fields[fieldName].closest('.form-group');
    if (group) {
      group.classList.add('invalid');
    }
  }

  // Get selected platform lists
  function getCheckedPlatforms() {
    const selected = [];
    if (fields.platforms.Website.checked) selected.push('Website');
    if (fields.platforms.WhatsApp.checked) selected.push('WhatsApp');
    if (fields.platforms.Telegram.checked) selected.push('Telegram');
    return selected;
  }

  // Step validation
  function validateWizardStep(step) {
    let isValid = true;

    if (step === 1) {
      // Validate Step 1 Inputs
      if (!fields.businessName.value.trim()) {
        applyFieldValidationError('businessName');
        isValid = false;
      }
      if (!fields.contactName.value.trim()) {
        applyFieldValidationError('contactName');
        isValid = false;
      }
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!fields.email.value.trim() || !emailPattern.test(fields.email.value.trim())) {
        applyFieldValidationError('email');
        isValid = false;
      }
      
      if (!fields.phone.value.trim()) {
        applyFieldValidationError('phone');
        isValid = false;
      }
    }

    if (step === 2) {
      // Validate Step 2 Inputs
      if (!fields.industry.value) {
        applyFieldValidationError('industry');
        isValid = false;
      }
      if (!fields.volume.value) {
        applyFieldValidationError('volume');
        isValid = false;
      }
    }

    if (step === 3) {
      // Validate Step 3 Inputs - must select at least 1 channel
      const selected = getCheckedPlatforms();
      if (selected.length === 0) {
        applyFieldValidationError('platforms');
        isValid = false;
      }
    }

    return isValid;
  }

  // Handle forward navigation clicks
  btnNext.addEventListener('click', () => {
    if (validateWizardStep(wizardCurrentStep)) {
      wizardCurrentStep++;
      updateWizardUI();
    }
  });

  // Handle backward navigation clicks
  btnBack.addEventListener('click', () => {
    if (wizardCurrentStep > 1) {
      wizardCurrentStep--;
      updateWizardUI();
    }
  });

  function updateWizardUI() {
    // Hide all steps
    document.querySelectorAll('.wizard-step').forEach(stepEl => {
      stepEl.classList.remove('active');
    });

    // Display targeted step
    const targetStepEl = document.getElementById(`wizardStep${wizardCurrentStep}`);
    if (targetStepEl) {
      targetStepEl.classList.add('active');
    }

    // Hide general validation error message
    generalFormError.classList.remove('show');

    // Update Floating step counter
    currentStepText.textContent = wizardCurrentStep;

    // Update Progress bar width
    const percentage = (wizardCurrentStep === 1) ? '33.33%' : (wizardCurrentStep === 2) ? '66.66%' : '100%';
    progressBarFill.style.width = percentage;

    // Toggle Back button visibility
    if (wizardCurrentStep === 1) {
      btnBack.style.display = 'none';
    } else {
      btnBack.style.display = 'inline-flex';
    }

    // Toggle Next / Submit actions buttons
    if (wizardCurrentStep === 3) {
      btnNext.style.display = 'none';
      btnSubmit.style.display = 'inline-flex';
    } else {
      btnNext.style.display = 'inline-flex';
      btnSubmit.style.display = 'none';
    }
  }

  // ── 9. SUBMIT QUOTE REQUEST TO EMAILJS ──
  if (wizardForm) {
    wizardForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check final validation of all steps to prevent form spoofing
      let isFormValid = true;
      for (let s = 1; s <= 3; s++) {
        if (!validateWizardStep(s)) {
          isFormValid = false;
        }
      }

      if (!isFormValid) {
        generalFormError.classList.add('show');
        return;
      }

      // Prepare UI states
      btnSubmit.disabled = true;
      const originalSubmitText = btnSubmit.innerHTML;
      btnSubmit.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

      const finalEstimatedPrice = calculateLivePrice();
      const selectedPlatformsString = getCheckedPlatforms().join(', ');

      const templateParams = {
        to_email: 'qibi009@gmail.com',
        business_name: fields.businessName.value.trim(),
        contact_name: fields.contactName.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        industry: fields.industry.value,
        volume: fields.volume.value,
        selected_platforms: selectedPlatformsString,
        estimated_total: `GHS ${finalEstimatedPrice.toLocaleString()}`,
        submitted_at: new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' })
      };

      try {
        const payload = {
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`EmailJS send request failed: ${response.status} - ${errorText}`);
        }
        
        // Hide form structure
        wizardForm.style.display = 'none';
        
        // Hide step indicators and layout actions
        document.querySelector('.wizard-step-badge').style.display = 'none';
        
        // Activate success view
        wizardSuccess.classList.add('active');
        
      } catch (error) {
        console.error('EmailJS transmit error:', error);
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalSubmitText;
        
        // Display general failure alert to user
        generalFormError.querySelector('span').textContent = 'Transmission failed. Please verify your connection or try again later.';
        generalFormError.classList.add('show');
      }
    });
  }

  // Reset calculator to step 1
  const btnResetWizard = document.getElementById('btnResetWizard');
  if (btnResetWizard) {
    btnResetWizard.addEventListener('click', () => {
      wizardForm.reset();
      wizardForm.style.display = 'block';
      document.querySelector('.wizard-step-badge').style.display = 'block';
      wizardSuccess.classList.remove('active');
      
      wizardCurrentStep = 1;
      updateWizardUI();
      calculateLivePrice();
    });
  }

  // Calculate live estimate instantly on load
  calculateLivePrice();
});
