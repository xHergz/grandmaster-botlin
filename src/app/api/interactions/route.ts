import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(JSON.stringify(req.body));
  return NextResponse.json({}, { status: 200 });
}
