// app/api/webinar/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Webinar from "@/models/Webinar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET function remains public
export async function GET() {
  await dbConnect();
  const webinars = await Webinar.find().sort({ date: -1 }).lean();
  return NextResponse.json(webinars.map(w => ({
    ...w,
    _id: w._id.toString()
  })));
}

// POST function is now protected
export async function POST(req) {
  // v-- SECURITY CHECK --v
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  // ^-- END OF SECURITY CHECK --^

  try {
    await dbConnect();
    const body = await req.json();
    const newWebinar = await Webinar.create(body);
    return NextResponse.json(newWebinar, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to add webinar" }, { status: 400 });
  }
}
