import { addSeconds } from "date-fns";

import {
  MONSTER_SPAWN_DATA,
  MonsterCode,
} from "../constants/monster.constants";

export type TrackedSpawn = {
  monsterCode: MonsterCode;
  spawnTime: number;
  recipients: string[];
};

export const dateToTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

export class SpawnTracker {
  private trackedSpawns: Map<MonsterCode, TrackedSpawn>;

  constructor() {
    this.trackedSpawns = new Map<MonsterCode, TrackedSpawn>();
  }

  public addRecipient(monsterCode: MonsterCode, recipient: string) {
    const trackedSpawn = this.trackedSpawns.get(monsterCode);
    if (!trackedSpawn) {
      this.initializeSpawn(monsterCode);
    }
    this.trackedSpawns.get(monsterCode)?.recipients.push(recipient);
  }

  public removeRecipient(monsterCode: MonsterCode, recipient: string) {
    const trackedSpawn = this.trackedSpawns.get(monsterCode);
    if (trackedSpawn) {
      const index = trackedSpawn.recipients.indexOf(recipient);
      if (index > -1) {
        trackedSpawn.recipients.splice(index, 1);
      }
    }
  }

  public resetSpawn(monsterCode: MonsterCode) {
    if (!this.trackedSpawns.has(monsterCode)) {
      this.initializeSpawn(monsterCode);
    }
    const spawnData = MONSTER_SPAWN_DATA[monsterCode];
    this.trackedSpawns.get(monsterCode)!.spawnTime = dateToTimestamp(
      addSeconds(new Date(), spawnData.secondToSpawn)
    );
  }

  public getSpawn(monsterCode: MonsterCode): TrackedSpawn | undefined {
    return this.trackedSpawns.get(monsterCode);
  }

  public getSpawns(): TrackedSpawn[] {
    return Array.from(this.trackedSpawns.values());
  }

  private initializeSpawn(monsterCode: MonsterCode) {
    const spawnData = MONSTER_SPAWN_DATA[monsterCode];
    this.trackedSpawns.set(monsterCode, {
      monsterCode: monsterCode,
      spawnTime: dateToTimestamp(
        addSeconds(new Date(), spawnData.secondToSpawn)
      ),
      recipients: [],
    });
  }
}
