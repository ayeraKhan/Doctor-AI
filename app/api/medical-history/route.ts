import { NextResponse } from "next/server";
import  connectToDB  from "@/lib/mongoose";
import MedicalHistory from "@/lib/models/MedicalHistory";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    
    const history = await MedicalHistory.create(data);
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error saving medical history:", error);
    return NextResponse.json({ success: false, error: "Error saving medical history" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const history = await MedicalHistory.find();
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ success: false, error: "Error fetching history" }, { status: 500 });
  }
}
