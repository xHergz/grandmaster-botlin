import { MAP_DATA } from "../constants/map.constants";
import {
  MONSTER_SPAWN_DATA,
  MonsterCode,
} from "../constants/monster.constants";
import { PLANET_DATA } from "../constants/planet.constants";

export const getColour = (monster: MonsterCode): string => {
  const monsterInfo = MONSTER_SPAWN_DATA[monster];
  const map = MAP_DATA[monsterInfo.map];
  const planet = PLANET_DATA[map.planet];

  return map.colour ? map.colour : planet.colour;
};

export const getMonsterImageUrl = (monster: MonsterCode): string => {
  const monsterInfo = MONSTER_SPAWN_DATA[monster];
  return `https://www.aruarose.com/public/images/armory/npcs/${monsterInfo.npcId}.jpg`;
};
