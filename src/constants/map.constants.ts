import { PlanetCode } from "./planet.constants";

export type MapCode = "cotd" | "geb" | "gi" | "jcf" | "lcf" | "menes" | "ocf";

export type Map = {
  name: string;
  planet: PlanetCode;
  colour?: string;
};

export type MapData = {
  [key in MapCode]: Map;
};

export const MAP_DATA: MapData = {
  cotd: {
    name: "Cave of the Dead",
    planet: "junon",
    colour: "#FC6404",
  },
  geb: {
    name: "Geb Desert",
    planet: "oro",
  },
  gi: {
    name: "Glacier Island",
    planet: "luna",
  },
  jcf: {
    name: "Junon Clan Field",
    planet: "junon",
  },

  lcf: {
    name: "Luna Clan Field",
    planet: "luna",
  },
  menes: {
    name: "Forsaken Village of Menes",
    planet: "oro",
  },
  ocf: {
    name: "Oro Clan Field",
    planet: "oro",
  },
};
