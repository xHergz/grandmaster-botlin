import { DiscordBotCommand } from "../types/command";
import TestCommand from "./test";
import MonsterCodesCommand from "./monster-codes";

const ALL_COMMANDS: DiscordBotCommand[] = [MonsterCodesCommand, TestCommand];

export { ALL_COMMANDS };
