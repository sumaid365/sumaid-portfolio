import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['huntermob183@gmail.com'],
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
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
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
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
        New Portfolio Message from ${name}
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
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