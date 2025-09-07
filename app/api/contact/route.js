import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send to Admin
    await transporter.sendMail({
      from: `"IIC Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry: ${subject}`,
      html: `
       <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <h2 style="color: #FD5B20;">${name}!</h2>
          <p>Email : <strong>${email}</strong>.</p>
          <p>Subject: <strong>${subject}</strong></p>
          <p>Message: <strong>${message}</strong></p>
          </div>
      `,
    });

    // Thank You Mail to User
    await transporter.sendMail({
      from: `"IIC Council" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting IIC",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <h2 style="color: #FD5B20;">Thank You, ${name}!</h2>
          <p>We have received your message regarding <strong>${subject}</strong>.</p>
          <p>Our team will get in touch with you shortly.</p>
          <p style="margin-top: 20px;">Warm regards,<br/><strong>Institution’s Innovation Council</strong></p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
