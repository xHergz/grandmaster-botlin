import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

import analytics from "../src/lib/analytics";
import { ALL_COMMANDS } from "../src/commands";

const config = {
  token: process.env.DISCORD_APPLICATION_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
};

console.log(process.env, ALL_COMMANDS);

if (!config.token || !config.clientId) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const commands = ALL_COMMANDS.map((command) => command.data.toJSON());
const rest = new REST().setToken(config.token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started globablly deploying ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationCommands(config.clientId!),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
    analytics.deployedCommands();
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(JSON.stringify(error, null, 2));
  }
})();
