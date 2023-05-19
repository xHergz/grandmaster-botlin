import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
} from "discord.js";
import * as dotenv from "dotenv";
import { ALL_COMMANDS } from "./commands";
import { DiscordBotCommand } from "./types/command";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, DiscordBotCommand>;
  }
}

// https://discord.com/api/oauth2/authorize?client_id=1106610084550819940&permissions=0&scope=bot%20applications.commands

dotenv.config();

console.log("Bot is starting...");

const BOT_TOKEN = process.env.DISCORD_APPLICATION_TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
ALL_COMMANDS.forEach((command) => {
  client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.GuildCreate, async (guild) => {
  console.log(`Joined guild: ${guild.name}`);
  await guild.commands.set(ALL_COMMANDS.map((c) => c.data));
  console.log(`Commands set in ${guild.name}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(BOT_TOKEN);
