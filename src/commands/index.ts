import { DiscordBotCommand } from "../types/command";
import AddAlertCommand from "./add-alert";
import MonsterCodesCommand from "./monster-codes";
import RemoveAlertCommand from "./remove-alert";
import ResetCommand from "./reset";
import SpawnInfoCommand from "./spawn-info";

const ALL_COMMANDS: DiscordBotCommand[] = [
  AddAlertCommand,
  MonsterCodesCommand,
  RemoveAlertCommand,
  ResetCommand,
  SpawnInfoCommand,
];

export { ALL_COMMANDS };
