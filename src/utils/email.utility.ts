import * as sgMail from '@sendgrid/mail';

export async function sendEmail(payload) {
  sgMail.setApiKey(process.env.MAIL_KEY);

  const msg = {
    to: process.env.TO,
    from:process.env.FROM,
    subject: payload.subject,
    // text: 'This is a test email from NestJS using SendGrid.',
    html:payload.body, // Optionally, include HTML content
  };

  try {
    const result = await sgMail.send(msg);
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
