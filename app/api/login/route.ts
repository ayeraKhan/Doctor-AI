import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDB from "@/lib/mongoose";
import User from '@/lib/models/user'; 

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check for required fields
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // ✅ Connect to MongoDB
    await connectToDB();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // ✅ If valid, return success (add JWT/session later if needed)
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, username: user.username },
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
