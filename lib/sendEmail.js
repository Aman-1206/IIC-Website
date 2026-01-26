// lib/sendEmail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const buildFromAddress = (label, envKey) => {
  const overrideFrom = process.env.RESEND_FROM_EMAIL?.trim();
  const envFrom = process.env[envKey]?.trim();
  const fromEmail = overrideFrom || envFrom;

  if (!fromEmail) {
    throw new Error(`Missing ${envKey} (or RESEND_FROM_EMAIL) for Resend.`);
  }

  return {
    from: `${label} <${fromEmail}>`,
    replyTo: overrideFrom && envFrom ? envFrom : undefined,
  };
};

/**
 * Send an OTP email (from admin@iic-slc.live)
 */
export async function sendOTP(email, otp) {
  const subject = "Your IIC SLC Login OTP";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h2 style="color:#FD5B20;">Your OTP Code</h2>
      <p>Hello,</p>
      <p>Your one-time password for IIC Admin Login is:</p>
      <p style="font-size:24px;font-weight:bold;letter-spacing:2px;color:#FD5B20;">${otp}</p>
      <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      <p style="margin-top:20px;color:#555;">– IIC SLC Admin Team</p>
    </div>
  `;

  try {
    const fromConfig = buildFromAddress("IIC SLC Admin", "ADMIN_EMAIL_FROM");
    await resend.emails.send({
      from: fromConfig.from,
      ...(fromConfig.replyTo ? { reply_to: fromConfig.replyTo } : {}),
      to: email,
      subject,
      html,
    });
    console.log("✅ OTP email sent to:", email);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}

/**
 * Send a general email (from support@iic-slc.live)
 */
export async function sendEmail(to, subject, html) {
  try {
    const fromConfig = buildFromAddress("IIC SLC Support", "SUPPORT_EMAIL_FROM");
    await resend.emails.send({
      from: fromConfig.from,
      ...(fromConfig.replyTo ? { reply_to: fromConfig.replyTo } : {}),
      to,
      subject,
      html,
    });
    console.log("✅ Email sent via Resend to:", to);
  } catch (error) {
    console.error("❌ Failed to send general email:", error);
    throw new Error("Failed to send general email");
  }
}
