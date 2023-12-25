const { SlashCommandBuilder, EmbedBuilder, TeamMember } = require("discord.js");
const { fetchForecast } = require("../../requests/fetchForecast");

const data = new SlashCommandBuilder()
  .setName("forecast")
  .setDescription("Returns a 3 day forecast for a specified region.")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "Can be a city, zip/ postal code or langitude and longitude."
      )
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName("unit")
      .setDescription(
        "You can choose between 'Metric' and 'Imperial', default is 'Metric'."
      )
      .setRequired(false)
      .addChoices(
        { name: "Metric", value: "metric" },
        { name: "Imperial", value: "imperial" }
      );
  });

async function execute(interaction) {
  try {
    await interaction.deferReply("consulting the weather wizards...");
    forecast = await fetchForecast(interaction.options.getString("location"));
    const { locationName, weatherData } = forecast;
    const unit = interaction.options.getString("unit") || "metric";
    const isImperial = unit === "imperial";
    const u = isImperial ? "°F" : "°C";
    const embed = new EmbedBuilder()
      .setColor("2a3e6e")
      .setTitle(`Weather forecast for ${locationName}...`)
      .setDescription(`Using the ${unit} system.`)
      .setTimestamp()
      .setFooter({
        text: "using the weatherapi.com API",
      });

    for (const day of weatherData) {
      const tempMin = isImperial ? day.minTempF : day.minTempC;
      const tempMax = isImperial ? day.maxTempF : day.maxTempC;

      embed.addFields({
        name: day.date,
        value: `⬇️Low: ${tempMin}${u} ⬆️High: ${tempMax}${u}`,
      });
    }
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (err) {
    console.log("Error: ", err);
    await interaction.editReply(
      "The weather wizard slipped on a banana... oh no"
    );
  }
}

module.exports = {
  data,
  execute,
};
