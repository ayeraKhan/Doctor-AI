import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDB from "@/lib/mongoose";
import User from "@/lib/models/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectToDB();
  const user = await User.findOne({ email: session.user?.email });

  return NextResponse.json({ medicalHistory: user?.medicalHistory || [] });
}
