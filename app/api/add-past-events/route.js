// app/api/add-past-events/route.js
import dbConnect from "@/lib/mongodb";
import PastEvent from "@/models/PastEvent";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET function remains public
export async function GET() {
  try {
    await dbConnect();
    const events = await PastEvent.find({});
    return Response.json(events, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST function is now protected
export async function POST(req) {
  // v-- SECURITY CHECK --v
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }
  // ^-- END OF SECURITY CHECK --^

  try {
    await dbConnect();
    const { year, name, link } = await req.json();

    if (!year || !name || !link) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const newEvent = new PastEvent({ year, name, link });
    await newEvent.save();
    return Response.json({ message: "Past event added successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Failed to save event" }, { status: 500 });
  }
}
