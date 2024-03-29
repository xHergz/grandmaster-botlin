import Mixpanel from "mixpanel";

import { MonsterCode } from "../constants/monster.constants";

const MIXPANEL_EVENTS = [
  "ADDED_ALERT",
  "COMMAND_FAILED",
  "COMMAND_NOT_FOUND",
  "DEPLOYED_COMMANDS",
  "LISTED_MONSTER_CODES",
  "LOGGED_IN",
  "INVALID_MONSTER_CODE",
  "JOINED_SERVER",
  "REMOVED_ALERT",
  "RESET_SPAWN",
  "SENT_ALERT",
  "VIEWED_SPAWN_INFO",
] as const;
type MixpanelEvent = (typeof MIXPANEL_EVENTS)[number];

const SYSTEM_ID = "SYSTEM";

// const SKIPPED_GUILDS = ["598157729499971584"];
const SKIPPED_GUILDS: string[] = [];

export type IdProperties = {
  userId: string;
  guildId: string;
};

export type MonsterProperties = {
  monsterCode: MonsterCode;
};

class Analytics {
  private static instance: Analytics;
  private mixpanel: Mixpanel.Mixpanel | null = null;

  private constructor() {
    if (process.env.NODE_ENV === "production" && process.env.MIXPANEL_TOKEN) {
      this.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN!);
    }
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }

    return Analytics.instance;
  }

  public addedAlert(guildId: string, userId: string, monsterCode: MonsterCode) {
    this.track("ADDED_ALERT", guildId, userId, {
      monsterCode,
    });
  }

  public commandFailed(
    guildId: string,
    userId: string,
    command: string,
    reason: string
  ) {
    this.track("COMMAND_FAILED", guildId, SYSTEM_ID, {
      command,
      reason,
      userId,
    });
  }

  public commandNotFound(guildId: string, userId: string, command: string) {
    this.track("COMMAND_NOT_FOUND", guildId, SYSTEM_ID, {
      command,
      userId,
    });
  }

  public deployedCommands(guildId?: string) {
    this.track("DEPLOYED_COMMANDS", guildId ?? "GLOBAL", SYSTEM_ID);
  }

  public identify(userId: string, username: string, guildId: string) {
    if (!this.mixpanel || SKIPPED_GUILDS.includes(guildId)) {
      console.info(
        `[MIXPANEL] Identify - userId: ${userId}, username: ${username}, guildId: ${guildId}`
      );
      return;
    }
    this.mixpanel.people.set_once(userId, {
      $created: new Date().toISOString(),
    });
    this.mixpanel.people.set(userId, {
      $name: username,
    });
    this.mixpanel.people.union(userId, { guilds: guildId });
    this.mixpanel.people.increment(userId, "commands");
  }

  public invalidMonsterCode(guildId: string, userId: string, code: string) {
    this.track("INVALID_MONSTER_CODE", guildId, userId, { unknownCode: code });
  }

  public joinedServer(guildId: string) {
    this.track("JOINED_SERVER", guildId, SYSTEM_ID);
  }

  public listedMonsterCodes(guildId: string, userId: string) {
    this.track("LISTED_MONSTER_CODES", guildId, userId);
  }

  public removedAlert(
    guildId: string,
    userId: string,
    monsterCode: MonsterCode
  ) {
    this.track("REMOVED_ALERT", guildId, userId, {
      monsterCode,
    });
  }

  public resetSpawn(guildId: string, userId: string, monsterCode: MonsterCode) {
    this.track("RESET_SPAWN", guildId, userId, {
      monsterCode,
    });
  }

  public sentAlert(
    guildId: string,
    monsterCode: MonsterCode,
    recipients: string[]
  ) {
    this.track("SENT_ALERT", guildId, SYSTEM_ID, {
      monsterCode,
      recipients: recipients,
    });
  }

  public viewedSpawnInfo(
    guildId: string,
    userId: string,
    monsterCode?: MonsterCode
  ) {
    this.track("VIEWED_SPAWN_INFO", guildId, userId, {
      monsterCode,
    });
  }

  private track(
    event: MixpanelEvent,
    guildId: string,
    userId: string,
    properties: object = {}
  ) {
    if (!this.mixpanel || SKIPPED_GUILDS.includes(guildId)) {
      console.info(
        `[MIXPANEL] Track - event: ${event}, userId: ${userId}, guildId: ${guildId}, properties: ${JSON.stringify(
          properties
        )}`
      );
      return;
    }
    this.mixpanel.track(event, {
      distinct_id: userId,
      guildId,
      ...properties,
    });
  }
}

export default Analytics.getInstance();
