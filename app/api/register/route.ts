import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user";
import connectToDB from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    const { username, email, password, consentGiven } = await req.json();

    // Connect to MongoDB
    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      consentGiven, // Store consent
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
