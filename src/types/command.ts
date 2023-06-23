import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export type DiscordBotCommand = {
  data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
  execute: (interaction: CommandInteraction) => Promise<void>;
};
