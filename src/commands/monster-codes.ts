import { SlashCommandBuilder, codeBlock } from "discord.js";

import { DiscordBotCommand } from "../types/command";
import { MONSTER_SPAWN_DATA } from "../constants/monster.constants";
//import analytics from "../lib/analytics";

const monsterCodesCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("monster-codes")
    .setDescription("Lists all the currently supported monster codes."),
  execute: async (interaction) => {},
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

export const listMonsterCodes = () => {
  const codes = Object.keys(MONSTER_SPAWN_DATA);
  const listString = codes.map((code) => {
    const monsterName = MONSTER_SPAWN_DATA[code].name;
    return `${code} - ${monsterName}`;
  });
  return codeBlock(listString.join("\n"));
};

export default monsterCodesCommand;
