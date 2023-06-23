import { MonsterCode } from "../constants/monster.constants";

import { SpawnTracker, TrackedSpawn } from "./spawn-tracker";

export type GuildData = {
  spawns: SpawnTracker;
};

class GuildTracker {
  private static instance: GuildTracker;
  private trackedGuilds: Map<string, GuildData>;

  private constructor() {
    this.trackedGuilds = new Map<string, GuildData>();
  }

  public static getInstance(): GuildTracker {
    if (!GuildTracker.instance) {
      GuildTracker.instance = new GuildTracker();
    }

    return GuildTracker.instance;
  }

  public addSpawnAlert(
    guildId: string,
    monsterCode: MonsterCode,
    recipient: string
  ) {
    const guildData = this.trackedGuilds.get(guildId);
    if (!guildData) {
      this.initializeGuild(guildId);
    }
    this.trackedGuilds
      .get(guildId)
      ?.spawns.addRecipient(monsterCode, recipient);
  }

  public removeSpawnAlert(
    guildId: string,
    monsterCode: MonsterCode,
    recipient: string
  ) {
    const guildData = this.trackedGuilds.get(guildId);
    if (guildData) {
      guildData.spawns.removeRecipient(monsterCode, recipient);
    }
  }

  public resetSpawn(guildId: string, monsterCode: MonsterCode): TrackedSpawn {
    if (!this.trackedGuilds.has(guildId)) {
      this.initializeGuild(guildId);
    }
    const guildData = this.trackedGuilds.get(guildId);
    guildData!.spawns.resetSpawn(monsterCode);
    return guildData!.spawns.getSpawn(monsterCode)!;
  }

  public getSpawnInfo(
    guildId: string,
    monsterCode: MonsterCode
  ): TrackedSpawn | null {
    const guildData = this.trackedGuilds.get(guildId);
    if (!guildData) {
      return null;
    }
    return guildData.spawns.getSpawn(monsterCode) ?? null;
  }

  public getSpawnList(guildId: string): TrackedSpawn[] {
    const guildData = this.trackedGuilds.get(guildId);
    if (!guildData) {
      return [];
    }
    return guildData.spawns.getSpawns();
  }

  private initializeGuild(guildId: string) {
    this.trackedGuilds.set(guildId, {
      spawns: new SpawnTracker(),
    });
  }
}

export default GuildTracker.getInstance();
