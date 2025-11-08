import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an OTP via Resend.
 * @param {string} email - recipient email
 * @param {string} otp - one-time password
 */
export async function sendOTP(email, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'IIC SLC <admin@iic-slc.live>', // must be verified domain or custom sender
      to: email,
      subject: 'Your IIC Login OTP Code',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2 style="color:#4f46e5;">IIC Shyam Lal College</h2>
          <p>Your OTP for admin login is:</p>
          <h1 style="font-size:32px;letter-spacing:4px;color:#111;">${otp}</h1>
          <p>This code will expire in <b>10 minutes</b>.</p>
          <br/>
          <p style="color:#555;">If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    throw err;
  }
}
