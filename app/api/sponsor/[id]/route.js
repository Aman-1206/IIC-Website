// app/api/sponser/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Sponsor from "@/models/Sponsor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// This is now a protected DELETE function
export async function DELETE(req, { params }) {
  // v-- SECURITY CHECK --v
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  // ^-- END OF SECURITY CHECK --^

  try {
    await dbConnect();
    const deletedItem = await Sponsor.findByIdAndDelete(params.id);
    if (!deletedItem) {
      return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Sponsor deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
