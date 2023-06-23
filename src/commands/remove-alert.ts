import { SlashCommandBuilder } from "discord.js";

import { DiscordBotCommand } from "../types/command";
import {
  MONSTER_CODES,
  MONSTER_SPAWN_DATA,
} from "../constants/monster.constants";
import guildTracker from "../lib/guild-tracker";
import analytics from "../lib/analytics";

const removeAlertCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("remove-alert")
    .setDescription("Removes a user from the spawn alert for a monster.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to get removed from.")
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

    analytics.removedAlert(
      interaction.guildId!,
      interaction.user.id,
      monsterCode
    );
    guildTracker.removeSpawnAlert(
      interaction.guildId as string,
      monsterCode,
      interaction.user.id
    );
    await interaction.reply({
      content: `You've been removed from alerts for ${MONSTER_SPAWN_DATA[monsterCode].name}.`,
      ephemeral: true,
    });
  },
};

export default removeAlertCommand;
