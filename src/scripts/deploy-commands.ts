import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { ALL_COMMANDS } from "../commands";

const config = {
  token: process.env.DISCORD_APPLICATION_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
  guildId: process.env.DISCORD_TEST_GUILD_ID,
};

console.log(process.env, ALL_COMMANDS);

if (!config.token || !config.clientId || !config.guildId) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const commands = ALL_COMMANDS.map((command) => command.data.toJSON());
const rest = new REST().setToken(config.token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(config.clientId!, config.guildId!),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(JSON.stringify(error, null, 2));
  }
})();
