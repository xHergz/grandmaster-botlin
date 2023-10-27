//// https://discord.com/api/oauth2/authorize?client_id=1157361126347128852&permissions=0&scope=bot%20applications.commands

import { NextRequest, NextResponse } from "next/server";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import {
  addAlert,
  allSpawnInfo,
  listMonsterCodes,
  monsterSpawnInfo,
  removeAlert,
  resetSpawn,
} from "@/utils/command.utils";
import {
  respondToInteraction,
  respondWithEmbed,
  verifyGuildMembership,
} from "@/utils/api.utils";
import { DiscordGuild, DiscordUser } from "@/types/discord.types";
import { getAvatarUrl } from "@/utils/discord.utils";
import analytics from "@/lib/analytics";

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
      avatarId: body.member.user.avatar,
    };
    const channelId = body.channel_id;
    // Check if the membership exists
    const membership = await verifyGuildMembership(guild, user);
    if (!membership) {
      return GENERIC_ERROR_RESPONSE;
    }
    analytics.identify(user.id, user.name, guild.id);
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
      case "monster-codes":
        analytics.listedMonsterCodes(guild.id, user.id);
        return respondToInteraction(listMonsterCodes());
      case "remove-alert":
        return respondToInteraction(
          await removeAlert(
            monsterCode,
            membership.Discord_Guild_Id,
            membership.Discord_User_Id
          )
        );
      case "reset":
        return respondToInteraction(
          await resetSpawn(
            monsterCode,
            membership.Discord_Guild_Id,
            membership.Discord_User_Id,
            channelId
          )
        );
      case "spawn-info":
        const embed = monsterCode
          ? monsterSpawnInfo(
              monsterCode,
              membership.Discord_Guild_Id,
              membership.Discord_User_Id,
              user.name,
              getAvatarUrl(user)
            )
          : allSpawnInfo(
              membership.Discord_Guild_Id,
              membership.Discord_User_Id,
              user.name,
              getAvatarUrl(user)
            );
        return embed
          ? respondWithEmbed(embed)
          : respondToInteraction("Invalid monster code.");
      default:
        analytics.commandNotFound(
          membership.Discord_Guild_Id,
          membership.Discord_User_Id,
          command
        );
        return respondToInteraction("Unknown command");
    }
  }

  return NextResponse.json({}, { status: 200 });
}
