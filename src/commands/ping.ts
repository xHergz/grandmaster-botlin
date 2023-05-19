import { SlashCommandBuilder, TextChannel } from "discord.js";
import { DiscordBotCommand } from "../types/command";

const pingCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction) => {
    await interaction.reply("Pong!");
    setTimeout(async () => {
      const channelId = interaction.channelId;
      const channel = interaction.client.channels.cache.get(
        channelId
      ) as TextChannel;
      await channel.send("Pong 2!");
    }, 5000);
  },
};

export default pingCommand;
