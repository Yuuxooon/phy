const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
require("dotenv").config();
const { clientReadyHandler } = require("./events/clientReady");
const { interactionCreateHandler } = require("./events/interactionCreate");
const { getSlashCommands } = require("./getSlashCommands");

const client = new Client({
  intents: GatewayIntentBits.Guilds,
});

// gathering and checking available commands
client.commands = new Collection();
getSlashCommands().map((com) => {
  client.commands.set(com.data.name, com);
});
console.log(
  "Successfully grabbed commands: ",
  client.commands.map((com) => {
    return com.data.name;
  })
);

client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login();
