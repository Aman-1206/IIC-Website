// app/api/events/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// This GET function remains public for anyone to see the list of events.
export async function GET() {
  await dbConnect();
  const events = await Event.find().sort({ date: 1 }).lean();
  const now = new Date();
  const upcoming = [];
  const past = [];

  for (const event of events) {
    const eventDate = new Date(event.date);
    (eventDate < now ? past : upcoming).push({
      ...event,
      _id: event._id.toString(),
    });
  }

  const top4Past = past.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  return NextResponse.json({ upcoming, past: top4Past });
}

// This POST function is now protected.
export async function POST(req) {
  // v-- THIS IS THE SECURITY CHECK --v
  const session = await getServerSession(authOptions);
  // For now, we just check if a user is logged in.
  // Later, we can check for specific permissions like `session.user.permissions.event`
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  // ^-- END OF SECURITY CHECK --^

  try {
    await dbConnect();
    const body = await req.json();
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    // Return a more specific error if validation fails
    return NextResponse.json({ error: error.message || "Failed to add event" }, { status: 400 });
  }
}
