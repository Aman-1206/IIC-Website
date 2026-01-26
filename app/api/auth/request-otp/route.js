import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { sendOTP } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const normalizedEmail = (email || "").toString().trim();

    if (!normalizedEmail) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    await dbConnect();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email: normalizedEmail },
      { email: normalizedEmail, otp: generatedOtp, expiresAt: tenMinutesFromNow },
      { upsert: true, new: true }
    );

    await sendOTP(normalizedEmail, generatedOtp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP." },
      { status: 500 }
    );
  }
}
