import { DiscordUser } from "@/types/discord.types";

export const getAvatarUrl = (user: DiscordUser) => {
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatarId}.png`;
};
