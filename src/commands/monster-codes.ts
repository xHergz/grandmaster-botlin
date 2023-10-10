import { MONSTER_SPAWN_DATA } from "../constants/monster.constants";
//import analytics from "../lib/analytics";

export const listMonsterCodes = () => {
  const codes = Object.keys(MONSTER_SPAWN_DATA);
  const listString = codes.map((code) => {
    const monsterName = MONSTER_SPAWN_DATA[code].name;
    return `${code} - ${monsterName}`;
  });
  return `\`\`\`\n${listString.join("\n")}\`\`\``;
};
