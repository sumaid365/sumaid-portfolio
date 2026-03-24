# Security Policy & Guidelines

## Fixed Security Issues

### 1. 🔴 **CRITICAL: Exposed API Key** ✅ FIXED
- **Issue:** Resend API key was hardcoded in `.env.local` file
- **Fix:** Using environment variables (already handled by Next.js)
- **Action:** ⚠️ **IMMEDIATE ACTION REQUIRED:**
  1. Rotate your Resend API key immediately at https://resend.com/settings
  2. Never commit `.env.local` to git (already in .gitignore)
  3. Keep `.env.local` local only - never share or commit

### 2. 🟡 **HIGH: HTML/Email Injection** ✅ FIXED
- **Issue:** User inputs were not sanitized before being injected into HTML emails
- **Fix:** Added `sanitizeHTML()` function to escape special characters
- **Protection:** All user inputs (name, email, message) are now HTML-escaped

### 3. 🟡 **HIGH: Missing Input Validation** ✅ FIXED
- **Issue:** No length validation on input fields
- **Fix:** Added validation rules:
  - Name: max 100 characters
  - Message: max 5000 characters
  - Email: proper regex validation
  - All fields: required, trimmed, checked for empty values
- **Location:** `pages/api/contact.js` and `components/ContactForm.js`

### 4. 🟡 **MEDIUM: Missing CORS Headers** ✅ FIXED
- **Issue:** No CORS headers on API route
- **Fix:** Added proper CORS headers in contact API
- **Headers:** Allow POST, OPTIONS methods with proper origin handling

### 5. 🟢 **LOW: target="_blank" Security** ✅ SECURE
- **Status:** All external links already have `rel="noopener noreferrer"`
- **Example:** Certifications, NavBar, ProjectCard
- **No action needed:** Proper security already in place

---

## Security Best Practices Applied

### Input Validation
```javascript
// Length validation
if (trimmedName.length > 100 || trimmedMessage.length > 5000) {
  return res.status(400).json({ message: 'Input too long' });
}

// Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(trimmedEmail)) {
  return res.status(400).json({ message: 'Invalid email format' });
}
```

### HTML Sanitization
```javascript
function sanitizeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}
```

### Error Handling
- Generic error messages (no sensitive info leaked)
- Proper HTTP status codes
- Server-side logging without exposing details

---

## Remaining Recommendations

### 1. **Rate Limiting** (Not Implemented - Optional)
Consider adding rate limiting to prevent spam:
```bash
npm install express-rate-limit
```

### 2. **CAPTCHA** (Not Implemented - Optional)
Consider adding reCAPTCHA or similar:
- Google reCAPTCHA v3
- hCaptcha

### 3. **Email Verification** (Optional)
Add email verification before processing:
- Send verification code to email
- User confirms before storing

### 4. **API Authentication** (Optional)
For future enhancement:
- Add API key authentication
- Add request signing

### 5. **Content Security Policy** (Optional)
Add CSP headers in `next.config.js`:
```javascript
headers: async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'"
        }
      ]
    }
  ]
}
```

---

## Environment Variables

### Required
```env
RESEND_API_KEY=your_api_key_here
```

### Optional
```env
NEXT_PUBLIC_DOMAIN=yourdomain.com
```

---

## Security Checklist

- ✅ API key not hardcoded in source code
- ✅ All user inputs validated and sanitized
- ✅ HTML injection protection
- ✅ CORS headers configured
- ✅ External links have rel="noopener noreferrer"
- ✅ Error messages don't leak sensitive info
- ✅ .gitignore includes .env.local
- ✅ No eval() or Function() usage
- ✅ No dangerouslySetInnerHTML usage
- ⚠️ Rate limiting not implemented (optional)
- ⚠️ CAPTCHA not implemented (optional)

---

## Deployment Security

### Before Deployment:
1. Set `RESEND_API_KEY` in production environment variables
2. Enable HTTPS only
3. Set secure headers (done in Next.js by default)
4. Review all environment variables
5. Update `.env.local` with production values (never commit)

### In Production:
1. Monitor API logs for suspicious activity
2. Keep dependencies updated: `npm audit fix`
3. Regularly review security updates
4. Monitor your email for form submissions

---

## Reporting Security Issues

If you find a security vulnerability, please report it responsibly without disclosing publicly.

---

**Last Updated:** March 24, 2026
