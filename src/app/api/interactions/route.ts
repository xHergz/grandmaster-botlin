//// https://discord.com/api/oauth2/authorize?client_id=1157361126347128852&permissions=0&scope=bot%20applications.commands

import { NextRequest, NextResponse } from "next/server";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { listMonsterCodes } from "@/commands/monster-codes";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(JSON.stringify(body));
  const { type } = body;
  if (type === InteractionType.PING) {
    return NextResponse.json(
      { type: InteractionResponseType.PONG },
      { status: 200 }
    );
  } else if (type === InteractionType.APPLICATION_COMMAND) {
    const command = body.data.name;
    switch (command) {
      case "test":
        return NextResponse.json(
          {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: "Hello world",
            },
          },
          { status: 200 }
        );
      case "monster-codes":
        return NextResponse.json(
          {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: listMonsterCodes(),
            },
          },
          { status: 200 }
        );
      default:
        return NextResponse.json(
          {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: "Unknown command",
            },
          },
          { status: 200 }
        );
    }
    return NextResponse.json(
      {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Hello world",
        },
      },
      { status: 200 }
    );
  }

  return NextResponse.json({}, { status: 200 });
}
