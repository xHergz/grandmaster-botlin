import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";

export type AlertRecipient =
  Database["public"]["Tables"]["Alert_Recipient"]["Row"];

export type Guild = Database["public"]["Tables"]["Discord_Guild"]["Row"];
export type GuildId = Guild["Discord_Guild_Id"];

export type Membership =
  Database["public"]["Tables"]["Discord_Guild_Membership"]["Row"];

export type MonsterSpawn = Database["public"]["Tables"]["Monster_Spawn"]["Row"];
export type MonsterSpawnId = MonsterSpawn["Monster_Spawn_Id"];

export type TrackedSpawn = Database["public"]["Tables"]["Tracked_Spawn"]["Row"];
export type TrackedSpawnId = TrackedSpawn["Tracked_Spawn_Id"];

export type User = Database["public"]["Tables"]["Discord_User"]["Row"];
export type UserId = User["Discord_User_Id"];

class SupabaseDataAccessLayer {
  private supabase: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.supabase = client;
  }

  async getAlertRecipient(
    monsterSpawnId: MonsterSpawnId,
    guildId: GuildId,
    userId: UserId
  ): Promise<{ error: PostgrestError | null; data: User | null }> {
    const { error, data } = await this.supabase
      .from("Alert_Recipient")
      .select("*")
      .eq("Monster_Spawn_Id", monsterSpawnId)
      .eq("Discord_Guild_Id", guildId)
      .eq("Discord_User_Id", userId)
      .single();
    return this.surpressSingleError(error, data);
  }

  async getAllAlertRecipients(
    monsterSpawnId: MonsterSpawnId,
    guildId: GuildId
  ): Promise<{ error: PostgrestError | null; data: User[] }> {
    const { error, data } = await this.supabase
      .from("Alert_Recipient")
      .select("*")
      .eq("Monster_Spawn_Id", monsterSpawnId)
      .eq("Discord_Guild_Id", guildId);
    return { error, data: data ?? [] };
  }

  async getGuild(
    guildId: GuildId
  ): Promise<{ error: PostgrestError | null; data: Guild | null }> {
    const { error, data } = await this.supabase
      .from("Discord_Guild")
      .select("*")
      .eq("Discord_Guild_Id", guildId)
      .single();
    return this.surpressSingleError(error, data);
  }

  async getGuildMembership(
    guildId: GuildId,
    userId: UserId
  ): Promise<{
    error: PostgrestError | null;
    data: Membership | null;
  }> {
    const { error, data } = await this.supabase
      .from("Discord_Guild_Membership")
      .select("*")
      .eq("Discord_Guild_Id", guildId)
      .eq("Discord_User_Id", userId)
      .single();
    return this.surpressSingleError(error, data);
  }

  async getMonsterSpawn(monsterSpawnId: MonsterSpawnId): Promise<{
    error: PostgrestError | null;
    data: MonsterSpawn | null;
  }> {
    const { error, data } = await this.supabase
      .from("Monster_Spawn")
      .select("*")
      .eq("Monster_Spawn_Id", monsterSpawnId)
      .single();
    return this.surpressSingleError(error, data);
  }

  async getTrackedSpawn(
    monsterSpawnId: MonsterSpawnId,
    guildId: GuildId
  ): Promise<{
    error: PostgrestError | null;
    data: TrackedSpawn | null;
  }> {
    const { error, data } = await this.supabase
      .from("Tracked_Spawn")
      .select("*")
      .eq("Monster_Spawn_Id", monsterSpawnId)
      .eq("Discord_Guild_Id", guildId)
      .order("Spawn_Time", { ascending: false })
      .limit(1);
    const hasResults = data && data.length && data.length > 0;
    return { error, data: hasResults ? data[0] : null };
  }

  async getTrackedSpawns(trackedSpawnIds: TrackedSpawnId[]): Promise<{
    error: PostgrestError | null;
    data: TrackedSpawn[];
  }> {
    const { error, data } = await this.supabase
      .from("Tracked_Spawn")
      .select("*")
      .in("Tracked_Spawn_Id", trackedSpawnIds);
    return { error, data: data ?? [] };
  }

  async getUser(
    userId: UserId
  ): Promise<{ error: PostgrestError | null; data: User | null }> {
    const { error, data } = await this.supabase
      .from("Discord_User")
      .select("*")
      .eq("Discord_User_Id", userId)
      .single();
    return this.surpressSingleError(error, data);
  }

  async createAlertRecipient(
    monsterSpawnId: MonsterSpawnId,
    guildId: GuildId,
    userId: UserId
  ): Promise<{
    error: PostgrestError | null;
    data: AlertRecipient | null;
  }> {
    const { error, data } = await this.supabase
      .from("Alert_Recipient")
      .insert([
        {
          Monster_Spawn_Id: monsterSpawnId,
          Discord_Guild_Id: guildId,
          Discord_User_Id: userId,
        },
      ])
      .select("*")
      .single();

    return { error, data: data ?? null };
  }

  async createGuild(
    guildId: GuildId,
    name: Guild["Name"]
  ): Promise<{
    error: PostgrestError | null;
    data: Guild | null;
  }> {
    const { error, data } = await this.supabase
      .from("Discord_Guild")
      .insert([
        {
          Discord_Guild_Id: guildId,
          Name: name,
        },
      ])
      .select("*")
      .single();

    return { error, data: data ?? null };
  }

  async createGuildMembership(
    guildId: GuildId,
    userId: UserId
  ): Promise<{
    error: PostgrestError | null;
    data: Membership | null;
  }> {
    const { error, data } = await this.supabase
      .from("Discord_Guild_Membership")
      .insert([
        {
          Discord_Guild_Id: guildId,
          Discord_User_Id: userId,
        },
      ])
      .select("*")
      .single();

    return { error, data: data ?? null };
  }

  async createTrackedSpawn(
    monsterSpawnId: MonsterSpawnId,
    guildId: GuildId,
    userId: UserId,
    channelId: string,
    spawnTime: Date
  ): Promise<{
    error: PostgrestError | null;
    data: TrackedSpawn | null;
  }> {
    const { error, data } = await this.supabase
      .from("Tracked_Spawn")
      .insert([
        {
          Monster_Spawn_Id: monsterSpawnId,
          Discord_Guild_Id: guildId,
          Discord_User_Id: userId,
          Spawn_Time: spawnTime,
          Discord_Channel_Id: channelId,
        },
      ])
      .select("*")
      .single();

    return { error, data: data ?? null };
  }

  async createUser(
    userId: UserId,
    name: User["Name"]
  ): Promise<{ error: PostgrestError | null; data: User | null }> {
    const { error, data } = await this.supabase
      .from("Discord_User")
      .insert([
        {
          Discord_User_Id: userId,
          Name: name,
        },
      ])
      .select("*")
      .single();

    return { error, data: data ?? null };
  }

  async removeAlertRecipient(
    monsterSpawnId: MonsterSpawnId,
    guildId: GuildId,
    userId: UserId
  ): Promise<{
    error: PostgrestError | null;
  }> {
    const { error } = await this.supabase
      .from("Alert_Recipient")
      .delete()
      .eq("Monster_Spawn_Id", monsterSpawnId)
      .eq("Discord_Guild_Id", guildId)
      .eq("Discord_User_Id", userId);

    return { error };
  }

  async updateTrackedSpawn(
    trackedSpawnId: TrackedSpawnId,
    userId: UserId,
    spawnTime: Date
  ): Promise<{
    error: PostgrestError | null;
    data: TrackedSpawn | null;
  }> {
    const { error, data } = await this.supabase
      .from("Tracked_Spawn")
      .update({
        Discord_User_Id: userId,
        Spawn_Time: spawnTime,
      })
      .eq("Tracked_Spawn_Id", trackedSpawnId)
      .single();

    return { error, data: data ?? null };
  }

  async updateTrackedSpawnAlertedAt(
    trackedSpawnIds: TrackedSpawnId[]
  ): Promise<{
    error: PostgrestError | null;
  }> {
    const { error } = await this.supabase
      .from("Tracked_Spawn")
      .update({
        Alerted_At: new Date(),
      })
      .in("Tracked_Spawn_Id", trackedSpawnIds);

    return { error };
  }

  private surpressSingleError<T>(
    error: PostgrestError | null,
    data: T | null
  ): { error: PostgrestError | null; data: T | null } {
    return error?.code === "PGRST116" ? { error: null, data } : { error, data };
  }
}

export default SupabaseDataAccessLayer;
