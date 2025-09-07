// app/api/galary/route.js
import dbConnect from "@/lib/mongodb";
import GalleryEvent from "@/models/GalleryEvent";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET function remains public
export async function GET(req) {
  try {
    await dbConnect();
    const events = await GalleryEvent.find({});
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
    const { title, date, images } = await req.json();

    if (!title || !images || !Array.isArray(images) || !date) {
      return Response.json({ error: "Invalid data" }, { status: 400 });
    }

    const existing = await GalleryEvent.findOne({ title });
    if (existing) {
      existing.images.push(...images);
      await existing.save();
      return Response.json({ message: "Images added to event" }, { status: 200 });
    }

    const newEvent = new GalleryEvent({ title, date, images });
    await newEvent.save();
    return Response.json({ message: "Event created" }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
