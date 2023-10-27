import { MapCode } from "./map.constants";

export const MONSTER_CODES = [
  "anu-n",
  "anu-s",
  "mum-e",
  "mum-w",
  "lic-e",
  "lic-w",
  "dev",
  "gol-e",
  "gol-w",
  "sab-e",
  "sab-w",
  "ram",
  "mim",
  "dh-10",
  "dh-4",
  "db",
  "ale",
  "fd",
  "ak",
  "gem",
];
export type MonsterCode = (typeof MONSTER_CODES)[number];

export type MonsterSpawn = {
  npcId: number;
  name: string;
  secondToSpawn: number;
  map: MapCode;
  spawnImageUrl: string;
};

export type MonsterSpawnData = {
  [key in MonsterCode]: MonsterSpawn;
};

export const MONSTER_SPAWN_DATA: MonsterSpawnData = {
  "anu-n": {
    npcId: 2486,
    name: "Anubis Guardian - North (End)",
    secondToSpawn: 2700,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/0InCtxh.png",
  },
  "anu-s": {
    npcId: 2486,
    name: "Anubis Guardian - South (Mid)",
    secondToSpawn: 3105,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/sYjmqz0.png",
  },
  "mum-e": {
    npcId: 2496,
    name: "Mummy Guardian - East (Top)",
    secondToSpawn: 2700,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/UNLSCes.png",
  },
  "mum-w": {
    npcId: 2496,
    name: "Mummy Guardian - West (Bottom)",
    secondToSpawn: 3105,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/K1Vd0Jb.png",
  },
  "lic-e": {
    npcId: 2491,
    name: "Lich Pharaoh Guardian - East (End)",
    secondToSpawn: 3050,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/zz4Zil4.png",
  },
  "lic-w": {
    npcId: 2491,
    name: "Lich Pharaoh Guardian - West (Mid)",
    secondToSpawn: 2655,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/pXsvzyB.png",
  },
  dev: {
    npcId: 2646,
    name: "Devourer Guardian",
    secondToSpawn: 2805,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/a8B2b8a.png",
  },
  "gol-e": {
    npcId: 2692,
    name: "Lava Golem Guardian - East",
    secondToSpawn: 2995,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/JNcUBaV.png",
  },
  "gol-w": {
    npcId: 2692,
    name: "Lava Golem Guardian - West (Stairs)",
    secondToSpawn: 2605,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/y0OAvn6.png",
  },
  "sab-e": {
    npcId: 2501,
    name: "Saboten Guardian - East (Stairs)",
    secondToSpawn: 2700,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/LDJbuRC.png",
  },
  "sab-w": {
    npcId: 2501,
    name: "Saboten Guardian - West (Mid)",
    secondToSpawn: 3110,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/2bvoMkZ.png",
  },
  ram: {
    npcId: 2634,
    name: "Ramesses Guardian",
    secondToSpawn: 2805,
    map: "ocf",
    spawnImageUrl: "https://i.imgur.com/rT4I7QW.png",
  },
  mim: {
    npcId: 2688,
    name: "Mimic Chest of Menes",
    secondToSpawn: 3600,
    map: "menes",
    spawnImageUrl: "https://i.imgur.com/f4zHflk.png",
  },
  "dh-10": {
    npcId: 1865,
    name: "Dead Head (10 hour)",
    secondToSpawn: 36000,
    map: "geb",
    spawnImageUrl: "https://i.imgur.com/UyqizUV.png",
  },
  "dh-4": {
    npcId: 1865,
    name: "Dead Head (4 hour)",
    secondToSpawn: 14400,
    map: "geb",
    spawnImageUrl: "https://i.imgur.com/UyqizUV.png",
  },
  db: {
    npcId: 1850,
    name: "Dead Body",
    secondToSpawn: 7200,
    map: "geb",
    spawnImageUrl: "https://i.imgur.com/xITgwZV.png",
  },
  ale: {
    npcId: 1847,
    name: "Aleksandros",
    secondToSpawn: 3600,
    map: "geb",
    spawnImageUrl: "https://i.imgur.com/UxRriBT.png",
  },
  fd: {
    npcId: 670,
    name: "Frost Dragon",
    secondToSpawn: 7200,
    map: "gi",
    spawnImageUrl: "https://i.imgur.com/haTVtrY.png",
  },
  ak: {
    npcId: 396,
    name: "Astarot King",
    secondToSpawn: 1140,
    map: "lcf",
    spawnImageUrl: "https://i.imgur.com/S90Fy6v.png",
  },
  gem: {
    npcId: 2703,
    name: "Growth Gemstone",
    secondToSpawn: 1800,
    map: "cotd",
    spawnImageUrl: "https://i.imgur.com/bogZMPz.png",
  },
};
