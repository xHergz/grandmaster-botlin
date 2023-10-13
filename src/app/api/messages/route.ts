//// https://discord.com/api/oauth2/authorize?client_id=1157361126347128852&permissions=0&scope=bot%20applications.commands

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = await fetch(
    `https://discord.com/api/channels/917854694624350218/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${process.env.DISCORD_APPLICATION_TOKEN}`,
      },
      body: JSON.stringify({
        content: "Hello world",
        tts: false,
      }),
    }
  );

  console.log(response.status, await response.json());

  return NextResponse.json({}, { status: 200 });
}
