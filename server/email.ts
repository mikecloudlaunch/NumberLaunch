import { MailService } from '@sendgrid/mail';
import { z } from 'zod';

// Email validation schema
export const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type EmailData = z.infer<typeof emailSchema>;

// Initialize mail service
let mailService: MailService | null = null;

export const initMailService = (apiKey: string | undefined) => {
  if (!apiKey) {
    console.warn("SendGrid API key not provided, email service will not work");
    return false;
  }

  try {
    mailService = new MailService();
    mailService.setApiKey(apiKey);
    return true;
  } catch (error) {
    console.error("Failed to initialize mail service:", error);
    return false;
  }
};

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  if (!mailService) {
    return {
      success: false,
      message: "Email service not initialized"
    };
  }

  try {
    // Validate the data
    emailSchema.parse(data);
    
    const msg = {
      to: 'mike@cloudlaunch.au', // Your receiving email
      from: 'mike@cloudlaunch.au', // Your verified sender
      subject: `NumberLaunch Contact Form: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #5436D6;">NumberLaunch Contact Form</h2>
  <hr style="border: 1px solid #e0e0e0;">
  <p><strong>From:</strong> ${data.name} (${data.email})</p>
  <p><strong>Subject:</strong> ${data.subject}</p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  </div>
</div>
      `
    };

    await mailService.send(msg);
    
    return {
      success: true,
      message: "Email sent successfully"
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send email"
    };
  }
};