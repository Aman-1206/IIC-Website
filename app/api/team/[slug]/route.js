import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

// GET (Public): Ek specific department ke saare members ko fetch karega
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Department slug is required." }, { status: 400 });
    }

    const normalizedSlug = decodeURIComponent(slug).trim();
    const slugMatch = { $regex: `^${normalizedSlug}$`, $options: "i" };

    const allMembers = await TeamMember.find({ departmentSlug: slugMatch }).sort({ createdAt: 1 });

    if (!allMembers.length) {
      return NextResponse.json({ error: "Department not found." }, { status: 404 });
    }

    const head = allMembers.find((member) => member.isDepartmentHead) || allMembers[0];
    const members = allMembers.filter((member) => member._id.toString() !== head._id.toString());
    return NextResponse.json({ head, members });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch department members." }, { status: 500 });
  }
}
