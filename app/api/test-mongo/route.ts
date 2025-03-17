import { NextResponse } from 'next/server';
import connectToDB from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDB();
    return NextResponse.json({ status: 'success', message: 'MongoDB connected!' });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to connect to MongoDB', error });
  }
}
