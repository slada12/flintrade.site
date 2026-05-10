/*
  Frontend-only deposit proof email (EmailJS)
  NOTE: This is client-side; anyone can modify requests.
*/

(function () {
  const EMAILJS_SERVICE_ID = 'service_iy30y8f';
  const EMAILJS_TEMPLATE_ID = 'template_4fhtwdi';

  // Admin recipient (set this to your admin/support email)
  const ADMIN_EMAIL = 'chrisoluabuchi@gmail.com';
  const ADMIN_NAME = 'Admin';



  function getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function getTextContent(selector) {
    const el = document.querySelector(selector);
    return el ? (el.textContent || '').trim() : '';
  }

  function sanitize(str) {
    return String(str ?? '').replace(/\s+/g, ' ').trim();
  }

  function getUserEmailFromPage() {

    // deposit.html has dropdown user-email in DOM
    // Try common locations.
    const email = getTextContent('.dropdown-user-email') || getTextContent('.user-email') || getTextContent('[data-user-email]');
    return sanitize(email);
  }

  function getUserNameFromPage() {
    const name = getTextContent('.dropdown-user-name') || getTextContent('.user-name') || 'User';
    return sanitize(name);
  }

  function ensureEmailJsLoaded() {
    if (window.emailjs) return Promise.resolve(true);

    return new Promise((resolve) => {
      const existing = document.querySelector('script[data-emailjs="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
      script.async = true;
      script.dataset.emailjs = 'true';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  async function sendDepositProofEmail({ userEmail, userName, amount, depositRef, submittedAt }) {


    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || EMAILJS_SERVICE_ID.includes('YOUR_') || EMAILJS_TEMPLATE_ID.includes('YOUR_')) {
      throw new Error('EmailJS is not configured. Set EMAILJS_SERVICE_ID and EMAILJS_TEMPLATE_ID in js/emailjs-deposit.js');
    }

    const loaded = await ensureEmailJsLoaded();
    if (!loaded) throw new Error('Failed to load EmailJS library.');

    // If you use public key (optional depending on EmailJS integration)
    // Usually: emailjs.init('YOUR_PUBLIC_KEY')
    // But for v3 client-side templates, init is required sometimes.
    // We'll try init only if present.
    if (window.emailjs && typeof window.emailjs.init === 'function') {
      // EmailJS public key
      window.emailjs.init('IZOHUTgaW-CBFWRjQ');
    }

    // Send to admin (not depositor)
    const params = {
      to_name: ADMIN_NAME,
      to_email: ADMIN_EMAIL,
      amount: amount,
      deposit_reference: depositRef,
      submitted_at: submittedAt,

      // Extra variables (optional) if your template needs depositor info:
      depositor_name: userName,
      depositor_email: userEmail
    };

    // We send email using EmailJS.
    // Your EmailJS template should route using these params.
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
  }

  function getDepositAmount() {
    const amount = getInputValue('amount');
    return sanitize(amount);
  }

  function getDepositReference() {
    // No visible reference field on this page.
    // We'll generate a local reference and also store it.
    const form = document.querySelector('form.deposit-form');
    const base = `DEP-${Date.now()}`;
    if (form) {
      let refEl = form.querySelector('input[name="deposit_reference"]');
      if (!refEl) {
        refEl = document.createElement('input');
        refEl.type = 'hidden';
        refEl.name = 'deposit_reference';
        refEl.value = base;
        form.appendChild(refEl);
      }
      return refEl.value;
    }
    return base;
  }

  function setStatus(msg, type) {
    const el = document.getElementById('emailjs-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = type === 'error' ? '#ef4444' : '#22c55e';
    el.style.display = 'block';
  }

  function wireDepositEmailOnProofSubmit() {
    const form = document.querySelector('form.deposit-form');
    if (!form) return;

    // Ensure we have a status placeholder
    if (!document.getElementById('emailjs-status')) {
      const status = document.createElement('div');
      status.id = 'emailjs-status';
      status.className = 'emailjs-status';
      status.style.display = 'none';
      form.parentElement ? form.parentElement.appendChild(status) : document.body.appendChild(status);
    }

    form.addEventListener('submit', async (e) => {
      // Only trigger email when user submits proof_of_payment (file selected)
      const fileInput = document.getElementById('proof_of_payment');
      const proofFile = fileInput ? fileInput.files && fileInput.files[0] : null;

      // If no proof selected, do not email.
      if (!proofFile) return;

      e.preventDefault();

      try {
        setStatus('Sending confirmation email…', 'info');

        const amount = getDepositAmount();
        const depositRef = getDepositReference();
        const submittedAt = new Date().toISOString();

        const toEmail = getUserEmailFromPage() || getInputValue('email') || '';
        const toName = getUserNameFromPage();

        if (!toEmail) {
          throw new Error('Could not determine user email on the page. Ensure dropdown-user-email exists or add an email input.');
        }

        await sendDepositProofEmail({
          toEmail,
          toName,
          amount,
          depositRef,
          submittedAt
        });

        setStatus('Email sent successfully. Submitting deposit…', 'ok');

        // Now submit the form normally to your existing route.
        // Using form.submit() bypasses the submit event listener.
        form.submit();
      } catch (err) {
        console.error(err);
        setStatus(err?.message || 'Failed to send email.', 'error');

        // Still submit deposit even if email fails.
        // If you want to block deposit submission, remove the next line.
        form.submit();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', wireDepositEmailOnProofSubmit);
})();

