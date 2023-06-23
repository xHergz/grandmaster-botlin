export type PlanetCode = "junon" | "luna" | "eldeon" | "oro";

export type Planet = {
  name: string;
  colour: string;
};

export type PlanetData = {
  [key in PlanetCode]: Planet;
};

export const PLANET_DATA: PlanetData = {
  junon: {
    name: "Junon",
    colour: "#449E48",
  },
  luna: {
    name: "Luna",
    colour: "#5BC0DE",
  },
  eldeon: {
    name: "Eldeon",
    colour: "#173518",
  },
  oro: {
    name: "Oro",
    colour: "#C6A785",
  },
};
