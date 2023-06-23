import Mixpanel from "mixpanel";

import { MixpanelEvent } from "../constants/analytics.constants";
import { MonsterCode } from "../constants/monster.constants";

const SYSTEM_ID = "SYSTEM";

export type IdProperties = {
  userId: string;
  guildId: string;
};

export type MonsterProperties = {
  monsterCode: MonsterCode;
};

class Analytics {
  private static instance: Analytics;
  private mixpanel: Mixpanel.Mixpanel;

  private constructor() {
    this.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN!);
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

  public joinedServer(guildId: string, guildName: string) {
    this.track("JOINED_SERVER", guildId, SYSTEM_ID, {
      guildName,
    });
  }

  public listedMonsterCodes(guildId: string, userId: string) {
    this.track("LISTED_MONSTER_CODES", guildId, userId);
  }

  public loggedIn() {
    this.track("LOGGED_IN", SYSTEM_ID, SYSTEM_ID);
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
    this.mixpanel.track(event, {
      distinct_id: userId,
      guildId,
      ...properties,
    });
  }
}

export default Analytics.getInstance();
