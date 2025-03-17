import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose";
import User from "@/lib/models/user";

export async function POST(req: Request) {
  const { userId, history } = await req.json();

  await connectToDB();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { hasConsented: true, medicalHistory: history },
    { new: true }
  );

  return NextResponse.json({ success: true, updatedUser });
}
