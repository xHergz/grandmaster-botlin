import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export type DiscordBotCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};
