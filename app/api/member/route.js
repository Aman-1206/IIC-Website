import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });
  }

  await dbConnect();
  const user = await User.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(
    JSON.stringify({
      permissions: user.permissions || {},
      isAdmin: user.isAdmin,
    }),
    { status: 200 }
  );
}
