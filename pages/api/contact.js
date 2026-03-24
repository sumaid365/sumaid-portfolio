import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sanitize HTML to prevent injection
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

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_DOMAIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate inputs - check for empty/null values
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Trim inputs to prevent abuse
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedMessage = String(message).trim();

  // Validate length to prevent abuse
  if (trimmedName.length > 100 || trimmedMessage.length > 5000) {
    return res.status(400).json({ message: 'Input too long' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Sanitize all user inputs to prevent HTML/email injection
    const sanitizedName = sanitizeHTML(trimmedName);
    const sanitizedEmail = sanitizeHTML(trimmedEmail);
    const sanitizedMessage = sanitizeHTML(trimmedMessage);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['sumaidlinkedin@gmail.com'],
      subject: `New Portfolio Message from ${sanitizedName}`,
      replyTo: trimmedEmail,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Courier New', monospace;
                background-color: #000000;
                color: #ff0000;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: #0a0a0a;
                border: 2px solid #ff0000;
                border-radius: 10px;
                padding: 20px;
              }
              .header {
                text-align: center;
                border-bottom: 1px solid #ff0000;
                margin-bottom: 20px;
                padding-bottom: 10px;
              }
              .header h1 {
                color: #ff0000;
                font-size: 24px;
                margin: 0;
              }
              .field {
                margin: 15px 0;
                padding: 10px;
                background: #000000;
                border-left: 3px solid #ff0000;
              }
              .label {
                font-weight: bold;
                color: #ff6666;
                margin-bottom: 5px;
              }
              .value {
                color: #ff0000;
                word-wrap: break-word;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #ff0000;
                padding-top: 10px;
              }
              .timestamp {
                color: #ff6666;
                font-size: 12px;
                text-align: center;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔴 SUMAID'S PORTFOLIO 🔴</h1>
              </div>
              
              <div class="field">
                <div class="label">📝 Name:</div>
                <div class="value">${sanitizedName}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${sanitizedEmail}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${sanitizedMessage}</div>
              </div>
              
              <div class="timestamp">
                Sent from your portfolio website at ${new Date().toLocaleString()}
              </div>
              
              <div class="footer">
                This message was sent from your portfolio contact form.
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Portfolio Message from ${sanitizedName}
        
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        Message: ${sanitizedMessage}
        
        Sent at: ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ message: 'Failed to send email. Please try again.' });
    }

    // Return success response
    return res.status(200).json({
      message: 'Message sent successfully! I will get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      message: 'Internal server error. Please try again later.' 
    });
  }
}
