import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Send email to Admin/Support
    const adminMail = await resend.emails.send({
      from: `IIC Website <${process.env.CONTACT_FROM_EMAIL}>`,
      to: [process.env.ADMIN_EMAIL],
      subject: `New Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to user
    const userMail = await resend.emails.send({
      from: `IIC Team <${process.env.CONTACT_FROM_EMAIL}>`,
      to: [email],
      subject: "We received your message",
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for contacting the <b>Institution's Innovation Council</b>.</p>
        <p>We have received your message and our team will reach out to you shortly.</p>
        
        <br />
        <h4>Your Message:</h4>
        <p><i>${message}</i></p>
        
        <br />
        <p>Warm Regards,<br/>
        IIC Team<br/>
        Shyam Lal College</p>
      `,
    });

    return NextResponse.json({
      success: true,
      adminMail,
      userMail,
    });
  } catch (error) {
    console.error("Resend Contact Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message.",
      },
      { status: 500 }
    );
  }
}
