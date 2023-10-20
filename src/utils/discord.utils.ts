import { DiscordUser } from "@/types/discord.types";

export const getAvatarUrl = (user: DiscordUser) => {
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatarId}.png`;
};

export const sendMessage = async (
  channelId: string,
  content: string
): Promise<boolean> => {
  const response = await fetch(
    `https://discord.com/api/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${process.env.DISCORD_APPLICATION_TOKEN}`,
      },
      body: JSON.stringify({
        content: content,
        tts: false,
      }),
    }
  );
  console.log(JSON.stringify(response));
  return response.status === 200 ? true : false;
};
