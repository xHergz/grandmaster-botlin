//// https://discord.com/api/oauth2/authorize?client_id=1157361126347128852&permissions=0&scope=bot%20applications.commands

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type } = body;
  if (type === 1) {
    return NextResponse.json({ type: 1 }, { status: 200 });
  }
  return NextResponse.json({}, { status: 200 });
}
