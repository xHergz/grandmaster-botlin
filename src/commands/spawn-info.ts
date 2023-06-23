import { SlashCommandBuilder, EmbedBuilder, ColorResolvable } from "discord.js";

import { DiscordBotCommand } from "../types/command";
import { MONSTER_SPAWN_DATA } from "../constants/monster.constants";
import guildTracker from "../lib/guild-tracker";
import { getColour, getMonsterImageUrl } from "../utils/embed.utils";
import analytics from "../lib/analytics";

const SpawnInfoCommand: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("spawn-info")
    .setDescription("Lists information about all or a given spawn.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to info for.")
        .setRequired(false)
    ),
  execute: async (interaction) => {
    const spawns = guildTracker.getSpawnList(interaction.guildId!);
    const monsterCodeArg = interaction.options.get("monster", false);
    if (!monsterCodeArg) {
      const allSpawnsEmbed = new EmbedBuilder()
        .setColor(0xffff00)
        .setTitle("All Spawn Info")
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });
      if (spawns.length === 0) {
        allSpawnsEmbed.addFields({
          name: "No spawns are currently being tracked.",
          value: "\u200B",
        });
      } else {
        const fields = spawns.map((spawn) => {
          const monsterName = MONSTER_SPAWN_DATA[spawn.monsterCode].name;
          return {
            name: monsterName,
            value: `<t:${spawn.spawnTime}:R>`,
            inline: true,
          };
        });
        allSpawnsEmbed.addFields(fields);
      }
      analytics.viewedSpawnInfo(interaction.guildId!, interaction.user.id);
      await interaction.reply({
        embeds: [allSpawnsEmbed],
      });
      return;
    }

    const monsterCode = monsterCodeArg.value as string;
    if (!MONSTER_SPAWN_DATA[monsterCode]) {
      analytics.invalidMonsterCode(
        interaction.guildId!,
        interaction.user.id,
        monsterCode
      );
      await interaction.reply({
        content: `Invalid monster code: ${monsterCode}`,
        ephemeral: true,
      });
      return;
    }
    const spawn = guildTracker.getSpawnInfo(interaction.guildId!, monsterCode);
    const monsterInfo = MONSTER_SPAWN_DATA[monsterCode];
    const monsterSpawnEmbed = new EmbedBuilder()
      .setColor(getColour(monsterCode) as ColorResolvable)
      .setTitle(`${monsterInfo.name} Spawn Info`)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setThumbnail(getMonsterImageUrl(monsterCode))
      .setImage(monsterInfo.spawnImageUrl);
    if (!spawn) {
      monsterSpawnEmbed.addFields({
        name: "Not currently being tracked",
        value: "\u200B",
      });
    } else {
      monsterSpawnEmbed.addFields({
        name: "Spawn Time",
        value: `<t:${spawn.spawnTime}:R>`,
      });
    }
    analytics.viewedSpawnInfo(
      interaction.guildId!,
      interaction.user.id,
      monsterCode
    );
    await interaction.reply({
      embeds: [monsterSpawnEmbed],
    });
  },
};

export default SpawnInfoCommand;
