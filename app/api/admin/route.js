// app/api/admin/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // Import your authOptions
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

// Helper function to check if the logged-in user is an admin
async function isAdminSession(session) {
  if (!session?.user?.email) return false;
  // We can trust the role from the session now because our JWT callback keeps it updated.
  return session.user.role === 'admin';
}

// GET: Fetch all members (for admin)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!await isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const adminUser = await User.findOne({ email: session.user.email });
    return NextResponse.json({ members: adminUser.members || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: Add a new member (for admin)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!await isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { email, permissions } = await req.json();
    if (!email || !permissions) {
      return NextResponse.json({ error: "Missing email or permissions" }, { status: 400 });
    }

    await User.findOneAndUpdate(
      { email },
      { email, isAdmin: false, permissions },
      { upsert: true, new: true }
    );

    await User.findOneAndUpdate(
      { email: session.user.email },
      { $addToSet: { members: email } }
    );

    return NextResponse.json({ message: "Member added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: Remove a member (for admin)
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!await isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { memberEmail } = await req.json();
    if (!memberEmail) {
      return NextResponse.json({ error: "Missing memberEmail" }, { status: 400 });
    }

    await User.findOneAndUpdate(
      { email: session.user.email },
      { $pull: { members: memberEmail } }
    );

    await User.deleteOne({ email: memberEmail });

    return NextResponse.json({ message: "Member deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
