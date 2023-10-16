import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";

export type Guild = Database["public"]["Tables"]["Discord_Guild"]["Row"];
export type GuildId = Guild["Discord_Guild_Id"];

export type Membership =
  Database["public"]["Tables"]["Discord_Guild_Membership"]["Row"];

export type MonsterSpawn = Database["public"]["Tables"]["Monster_Spawn"]["Row"];
export type MonsterSpawnId = MonsterSpawn["Monster_Spawn_Id"];

export type User = Database["public"]["Tables"]["Discord_User"]["Row"];
export type UserId = User["Discord_User_Id"];

class SupabaseDataAccessLayer {
  private supabase: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.supabase = client;
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

  private surpressSingleError<T>(
    error: PostgrestError | null,
    data: T | null
  ): { error: PostgrestError | null; data: T | null } {
    return error?.code === "PGRST116" ? { error: null, data } : { error, data };
  }
}

export default SupabaseDataAccessLayer;
