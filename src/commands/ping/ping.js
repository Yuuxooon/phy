const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("This command replies with pong");

async function execute(interaction) {
  await interaction.reply({ content: "Pong!", ephemeral: true });
}

module.exports = {
  data,
  execute,
};
