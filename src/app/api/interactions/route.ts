//// https://discord.com/api/oauth2/authorize?client_id=1157361126347128852&permissions=0&scope=bot%20applications.commands

import { NextRequest, NextResponse } from "next/server";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { addAlert, listMonsterCodes, removeAlert } from "@/utils/command.utils";
import { respondToInteraction, verifyGuildMembership } from "@/utils/api.utils";
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
    const monsterCode = Array.isArray(body.data.options)
      ? body.data.options[0].value
      : null;
    switch (command) {
      case "add-alert":
        return respondToInteraction(
          await addAlert(
            monsterCode,
            membership.Discord_Guild_Id,
            membership.Discord_User_Id
          )
        );
      case "test":
        return respondToInteraction("Hello world");
      case "monster-codes":
        return respondToInteraction(listMonsterCodes());
      case "remove-alert":
        return respondToInteraction(
          await removeAlert(
            monsterCode,
            membership.Discord_Guild_Id,
            membership.Discord_User_Id
          )
        );
      default:
        return respondToInteraction("Unknown command");
    }
  }

  return NextResponse.json({}, { status: 200 });
}
