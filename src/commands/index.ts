import { DiscordBotCommand } from "../types/command";
import TestCommand from "./test";
import { SlashCommandBuilder } from "discord.js";

const monsterCodesCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("monster-codes")
    .setDescription("Lists all the currently supported monster codes."),
  execute: async (interaction) => {
    await interaction.reply({
      content: "Hello!",
    });
  },
  /*execute: async (interaction) => {
      const codes = Object.keys(MONSTER_SPAWN_DATA);
      const listString = codes.map((code) => {
        const monsterName = MONSTER_SPAWN_DATA[code].name;
        return `${code} - ${monsterName}`;
      });
      //analytics.listedMonsterCodes(interaction.guildId!, interaction.user.id);
      await interaction.reply({
        content: codeBlock(listString.join("\n")),
      });
    },*/
};

const ALL_COMMANDS: DiscordBotCommand[] = [monsterCodesCommand, TestCommand];

export { ALL_COMMANDS };
