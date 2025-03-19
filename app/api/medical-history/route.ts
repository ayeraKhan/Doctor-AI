import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma"; // If using Prisma

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Store in database
    const history = await prisma.medicalHistory.create({
      data: data,
    });

    return NextResponse.json({ success: true, history });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error saving medical history" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const history = await prisma.medicalHistory.findMany();
    return NextResponse.json({ success: true, history });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error fetching history" }, { status: 500 });
  }
}
