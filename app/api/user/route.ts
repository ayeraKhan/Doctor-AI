import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/lib/models/user";
import connectToDB from "@/lib/mongoose";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectToDB();

  const user = await User.findOne({ email: session.user?.email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json({
    consentGiven: user.consentGiven,
    medicalHistory: user.medicalHistory,
    email: user.email,
  });
}
