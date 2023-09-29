import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(JSON.stringify(req.body));
  NextResponse.json({}, { status: 200 });
}
