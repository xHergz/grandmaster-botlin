import { SlashCommandBuilder, codeBlock } from "discord.js";

import { DiscordBotCommand } from "../types/command";

const monsterCodesCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing the API"),
  execute: async (interaction) => {
    await interaction.reply({
      content: "Hello!",
    });
  },
};

export default monsterCodesCommand;
