import SupabaseDataAccessLayer, {
  Guild,
  GuildId,
  Membership,
  User,
  UserId,
} from "@/lib/supabase";
import { DiscordGuild, DiscordUser } from "@/types/discord.types";
import { createSuperUserClient } from "@/utils/supbase-server.utils";

export const verifyGuildMembership = async (
  guild: DiscordGuild,
  user: DiscordUser
): Promise<Membership | null> => {
  const supabase = createSuperUserClient();
  const db = new SupabaseDataAccessLayer(supabase);
  const response = await db.getGuildMembership(guild.id, user.id);

  if (response.error) {
    console.error(response.error);
    return null;
  }

  if (!response.data) {
    const savedGuild = await verifyGuild(guild);
    const savedUser = await veryifyUser(user);
    if (!savedGuild || !savedUser) {
      return null;
    }
    const { error, data } = await db.createGuildMembership(
      savedGuild.Discord_Guild_Id,
      savedUser.Discord_User_Id
    );
    if (error || !data) {
      console.error(error ?? "Failed to create guild membership.");
      return null;
    }
    return data;
  }

  return response.data;
};

export const verifyGuild = async (
  guild: DiscordGuild
): Promise<Guild | null> => {
  const supabase = createSuperUserClient();
  const db = new SupabaseDataAccessLayer(supabase);
  const response = await db.getGuild(guild.id);
  if (response.error) {
    console.error(response.error);
    return null;
  }
  if (!response.data) {
    const { error, data } = await db.createGuild(guild.id, guild.name);
    if (error || !data) {
      console.error(error ?? "Failed to create guild.");
      return null;
    }
    return data;
  }
  return response.data;
};

export const veryifyUser = async (user: DiscordUser): Promise<User | null> => {
  const supabase = createSuperUserClient();
  const db = new SupabaseDataAccessLayer(supabase);
  const response = await db.getUser(user.id);
  if (response.error) {
    console.error(response.error);
    return null;
  }
  if (!response.data) {
    const { error, data } = await db.createUser(user.id, user.name);
    if (error || !data) {
      console.error(error ?? "Failed to create guild.");
      return null;
    }
    return data;
  }
  return response.data;
};
