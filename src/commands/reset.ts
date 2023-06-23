import { SlashCommandBuilder } from "discord.js";

import { DiscordBotCommand } from "../types/command";
import {
  MONSTER_CODES,
  MONSTER_SPAWN_DATA,
} from "../constants/monster.constants";
import guildTracker from "../lib/guild-tracker";
import analytics from "../lib/analytics";

const resetCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Resets the spawn timer for the specified monster.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to reset the spawn timer for.")
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

    analytics.resetSpawn(
      interaction.guildId!,
      interaction.user.id,
      monsterCode
    );
    const spawnInfo = guildTracker.resetSpawn(
      interaction.guildId as string,
      monsterCode
    );
    await interaction.reply({
      content: `Spawn reset for ${MONSTER_SPAWN_DATA[monsterCode].name}. Next spawn: <t:${spawnInfo.spawnTime}:R>`,
    });

    setTimeout(() => {
      const recipients =
        guildTracker.getSpawnInfo(interaction.guildId as string, monsterCode)
          ?.recipients ?? [];
      const mentions =
        recipients.map((recipient) => `<@${recipient}>`).join(" ") ?? "";
      analytics.sentAlert(
        interaction.guildId as string,
        monsterCode,
        recipients
      );
      interaction.followUp({
        content: `${MONSTER_SPAWN_DATA[monsterCode].name} Spawned. ${mentions}`,
      });
    }, spawnInfo.spawnTime * 1000 - Date.now());
  },
};

export default resetCommand;
