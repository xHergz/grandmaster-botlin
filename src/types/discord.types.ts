import { SlashCommandBuilder } from "discord.js";

export type DiscordBotCommand = {
  data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
};

export type DiscordGuild = {
  id: string;
  name: string | null;
};

export type DiscordUser = {
  id: string;
  name: string;
};

export type EmbedAuthor = {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type EmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

export type EmbedFooter = {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type EmbedImage = {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

export type EmbedProvider = {
  name?: string;
  url?: string;
};

export type EmbedThumbnail = {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

export type EmbedVideo = {
  url?: string;
  height?: number;
  width?: number;
};

export type Embed = {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: Date;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
};
