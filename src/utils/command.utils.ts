import guildTracker from "@/lib/guild-tracker";
import {
  MONSTER_CODES,
  MONSTER_SPAWN_DATA,
  MonsterCode,
} from "../constants/monster.constants";
import analytics from "../lib/analytics";
import { Embed } from "@/types/discord.types";
import { MAP_DATA } from "@/constants/map.constants";
import { PLANET_DATA } from "@/constants/planet.constants";

const getColour = (monster: MonsterCode): number => {
  const monsterInfo = MONSTER_SPAWN_DATA[monster];
  const map = MAP_DATA[monsterInfo.map];
  const planet = PLANET_DATA[map.planet];

  return map.colour ? map.colour : planet.colour;
};

const getMonsterImageUrl = (monster: MonsterCode): string => {
  const monsterInfo = MONSTER_SPAWN_DATA[monster];
  return `https://www.aruarose.com/public/images/armory/npcs/${monsterInfo.npcId}.jpg`;
};

export const addAlert = (
  monsterCode: string,
  guildId: string,
  userId: string
): string => {
  if (!MONSTER_CODES.includes(monsterCode)) {
    analytics.invalidMonsterCode(guildId, userId, monsterCode);
    return "Invalid monster code.";
  }

  analytics.addedAlert(guildId, userId, monsterCode);
  guildTracker.addSpawnAlert(guildId, monsterCode, userId);
  return `You've been added to alerts for ${MONSTER_SPAWN_DATA[monsterCode].name}.`;
};

export const listMonsterCodes = () => {
  const codes = Object.keys(MONSTER_SPAWN_DATA);
  const listString = codes.map((code) => {
    const monsterName = MONSTER_SPAWN_DATA[code].name;
    return `${code} - ${monsterName}`;
  });
  return `\`\`\`\n${listString.join("\n")}\`\`\``;
};

export const removeAlert = (
  monsterCode: string,
  guildId: string,
  userId: string
): string => {
  if (!MONSTER_CODES.includes(monsterCode)) {
    analytics.invalidMonsterCode(guildId, userId, monsterCode);
    return "Invalid monster code.";
  }

  analytics.removedAlert(guildId, userId, monsterCode);
  guildTracker.removeSpawnAlert(guildId, monsterCode, userId);
  return `You've been removed from alerts for ${MONSTER_SPAWN_DATA[monsterCode].name}.`;
};

export const resetSpawn = (
  monsterCode: string,
  guildId: string,
  userId: string
): string => {
  if (!MONSTER_CODES.includes(monsterCode)) {
    analytics.invalidMonsterCode(guildId, userId, monsterCode);
    return "Invalid monster code.";
  }

  analytics.resetSpawn(guildId, userId, monsterCode);
  const spawnInfo = guildTracker.resetSpawn(guildId, monsterCode);
  return `Spawn reset for ${MONSTER_SPAWN_DATA[monsterCode].name}. Next spawn: <t:${spawnInfo.spawnTime}:R>`;
};

export const allSpawnInfo = (
  guildId: string,
  userId: string,
  username: string,
  avatarUrl: string
): Embed => {
  const spawns = guildTracker.getSpawnList(guildId);
  const embed: Embed = {
    color: 0xffff00,
    title: "All Spawn Info",
    author: {
      name: username,
      icon_url: avatarUrl,
    },
  };
  if (spawns.length === 0) {
    embed.fields = [
      {
        name: "No spawns are currently being tracked.",
        value: "\u200B",
      },
    ];
  } else {
    const fields = spawns.map((spawn) => {
      const monsterName = MONSTER_SPAWN_DATA[spawn.monsterCode].name;
      return {
        name: monsterName,
        value: `<t:${spawn.spawnTime}:R>`,
        inline: true,
      };
    });
    embed.fields = fields;
  }
  analytics.viewedSpawnInfo(guildId, userId);
  return embed;
};

export const monsterSpawnInfo = (
  monsterCode: string,
  guildId: string,
  userId: string,
  username: string,
  avatarUrl: string
): Embed | null => {
  if (!MONSTER_CODES.includes(monsterCode)) {
    analytics.invalidMonsterCode(guildId, userId, monsterCode);
    return null;
  }
  const spawn = guildTracker.getSpawnInfo(guildId, monsterCode);
  const monsterInfo = MONSTER_SPAWN_DATA[monsterCode];
  const embed: Embed = {
    color: getColour(monsterCode),
    title: `${monsterInfo.name} Spawn Info`,
    author: {
      name: username,
      icon_url: avatarUrl,
    },
    thumbnail: {
      url: getMonsterImageUrl(monsterCode),
    },
    image: {
      url: monsterInfo.spawnImageUrl,
    },
  };
  if (!spawn) {
    embed.fields = [
      {
        name: "Not currently being tracked",
        value: "\u200B",
      },
    ];
  } else {
    embed.fields = [
      {
        name: "Spawn Time",
        value: `<t:${spawn.spawnTime}:R>`,
      },
    ];
  }
  analytics.viewedSpawnInfo(guildId, userId, monsterCode);
  return embed;
};
