// SendGrid test script
import { MailService } from '@sendgrid/mail';

// Initialize mail service with the API key from environment variables
const sgMail = new MailService();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Create message object
const msg = {
  to: 'mike@cloudlaunch.au', // Your recipient
  from: 'mike@cloudlaunch.au', // Your verified sender
  subject: 'NumberLaunch - SendGrid Test',
  text: 'This is a test email from NumberLaunch application to verify SendGrid integration.',
  html: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
        '<h2 style="color: #5436D6;">NumberLaunch SendGrid Test</h2>' +
        '<p>This is a test email from the NumberLaunch application to verify that SendGrid integration is working correctly.</p>' +
        '<p>If you received this email, it means the integration is successful!</p>' +
        '</div>',
}

// Send the email
sgMail
  .send(msg)
  .then(() => {
    console.log('Test email sent successfully!')
  })
  .catch((error) => {
    console.error('Error sending test email:');
    console.error(error);
    
    if (error.response) {
      console.error('Response body:');
      console.error(error.response.body);
    }
  });