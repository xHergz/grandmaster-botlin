export type PlanetCode = "junon" | "luna" | "eldeon" | "oro";

export type Planet = {
  name: string;
  colour: number;
};

export type PlanetData = {
  [key in PlanetCode]: Planet;
};

export const PLANET_DATA: PlanetData = {
  junon: {
    name: "Junon",
    colour: 0x449e48,
  },
  luna: {
    name: "Luna",
    colour: 0x5bc0de,
  },
  eldeon: {
    name: "Eldeon",
    colour: 0x173518,
  },
  oro: {
    name: "Oro",
    colour: 0xc6a785,
  },
};
