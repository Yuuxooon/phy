async function interactionCreateHandler(interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
    const date = new Date();
    console.log(
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -> ${
        interaction.user.username
      } invoked ${interaction.commandName}`
    );
  } catch (err) {
    console.log("Error: ", err);
    if (interaction.replied || interaction.deffered) {
      await interaction.followUp({
        content: "There was an error executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error executing this command!",
        ephemeral: true,
      });
    }
  }
}

module.exports = {
  interactionCreateHandler,
};
