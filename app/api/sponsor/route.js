// app/api/sponser/route.js
import dbConnect from "@/lib/mongodb";
import Sponsor from "@/models/Sponsor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET function remains public
export async function GET() {
  await dbConnect();
  const data = await Sponsor.find();
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
    const item = await Sponsor.create(body);
    return new Response(JSON.stringify(item), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Failed to add sponsor" }), { status: 400 });
  }
}
