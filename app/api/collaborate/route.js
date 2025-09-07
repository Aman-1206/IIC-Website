// app/api/collabrate/route.js
import dbConnect from "@/lib/mongodb";
import Collaboration from "@/models/Collaboration";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET function remains public
export async function GET() {
  await dbConnect();
  const data = await Collaboration.find();
  return Response.json(data);
}

// POST function is now protected
export async function POST(req) {
  // v-- SECURITY CHECK --v
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }
  // ^-- END OF SECURITY CHECK --^

  try {
    await dbConnect();
    const body = await req.json();
    const item = await Collaboration.create(body);
    return new Response(JSON.stringify(item), { status: 201 });
  } catch (error) {
     return new Response(JSON.stringify({ error: error.message || "Failed to add collaboration" }), { status: 400 });
  }
}
