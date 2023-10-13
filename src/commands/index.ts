import { DiscordBotCommand } from "../types/discord.types";
import { SlashCommandBuilder } from "discord.js";

const ADD_ALERT_COMMAND: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("add-alert")
    .setDescription("Adds a user to the spawn alert for a monster.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to get alerted for.")
        .setRequired(true)
    ),
};

const MONSTER_CODES_COMMAND: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("monster-codes")
    .setDescription("Lists all the currently supported monster codes."),
};

const REMOVE_ALERT_COMMAND: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("remove-alert")
    .setDescription("Removes a user from the spawn alert for a monster.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to get removed from.")
        .setRequired(true)
    ),
};

const RESET_COMMAND: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Resets the spawn timer for the specified monster.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to reset the spawn timer for.")
        .setRequired(true)
    ),
};

const SPAWN_INFO_COMMAND: DiscordBotCommand = {
  data: new SlashCommandBuilder()
    .setName("spawn-info")
    .setDescription("Lists information about all or a given spawn.")
    .addStringOption((option) =>
      option
        .setName("monster")
        .setDescription("The monster to info for.")
        .setRequired(false)
    ),
};

const ALL_COMMANDS: DiscordBotCommand[] = [
  ADD_ALERT_COMMAND,
  MONSTER_CODES_COMMAND,
  REMOVE_ALERT_COMMAND,
  RESET_COMMAND,
  SPAWN_INFO_COMMAND,
];

export { ALL_COMMANDS };
