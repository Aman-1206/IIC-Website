// app/api/admin/login-history/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import LoginHistory from "@/models/LoginHistory";

export async function GET() {
  const session = await getServerSession(authOptions);

  // This is the updated security check.
  // It now checks for the 'admin' role from the secure session.
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await dbConnect();
    const history = await LoginHistory.find({}).sort({ timestamp: -1 }).limit(50);
    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
