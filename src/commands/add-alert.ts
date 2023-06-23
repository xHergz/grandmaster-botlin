import { SlashCommandBuilder } from "discord.js";

import { DiscordBotCommand } from "../types/command";
import {
  MONSTER_CODES,
  MONSTER_SPAWN_DATA,
} from "../constants/monster.constants";
import guildTracker from "../lib/guild-tracker";
import analytics from "../lib/analytics";

const addAlertCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("add-alert")
    .setDescription("Adds a user to the spawn alert for a monster.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to get alerted for.")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const monsterCode = interaction.options.get("monster", true)
      .value as string;
    if (!MONSTER_CODES.includes(monsterCode)) {
      analytics.invalidMonsterCode(
        interaction.guildId!,
        interaction.user.id,
        monsterCode
      );
      await interaction.reply({
        content: "Invalid monster code.",
        ephemeral: true,
      });
      return;
    }

    analytics.addedAlert(
      interaction.guildId!,
      interaction.user.id,
      monsterCode
    );
    guildTracker.addSpawnAlert(
      interaction.guildId as string,
      monsterCode,
      interaction.user.id
    );
    await interaction.reply({
      content: `You've been added to alerts for ${MONSTER_SPAWN_DATA[monsterCode].name}.`,
      ephemeral: true,
    });
  },
};

export default addAlertCommand;
