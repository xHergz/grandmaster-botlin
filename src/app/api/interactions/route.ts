//// https://discord.com/api/oauth2/authorize?client_id=1157361126347128852&permissions=0&scope=bot%20applications.commands

import { NextRequest, NextResponse } from "next/server";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { listMonsterCodes } from "@/utils/command.utils";
import { createSuperUserClient } from "@/utils/supbase-server.utils";
import SupabaseDataAccessLayer from "@/lib/supabase";
import { verifyGuildMembership } from "@/utils/api.utils";
import { DiscordGuild, DiscordUser } from "@/types/discord.types";

const GENERIC_ERROR_RESPONSE = NextResponse.json(
  {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content:
        "Oops! There was an error completing your request. Please try again in a few minutes.",
    },
  },
  { status: 200 }
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type } = body;
  if (type === InteractionType.PING) {
    return NextResponse.json(
      { type: InteractionResponseType.PONG },
      { status: 200 }
    );
  } else if (type === InteractionType.APPLICATION_COMMAND) {
    const guild: DiscordGuild = {
      id: body.guild_id,
      name: body.guild.name ?? null,
    };
    const user: DiscordUser = {
      id: body.member.user.id,
      name: body.member.user.username,
    };
    // Check if the membership exists
    const membership = await verifyGuildMembership(guild, user);
    if (!membership) {
      return GENERIC_ERROR_RESPONSE;
    }
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
  }

  return NextResponse.json({}, { status: 200 });
}
