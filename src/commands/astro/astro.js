const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { fetchForecast } = require("../../requests/fetchForecast");

const data = new SlashCommandBuilder()
  .setName("astro")
  .setDescription(
    "Returns sunrise/sunset as well as moonrise/moonset times for the next 3 days."
  )
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "Can be a city, zip/ postal code or langitude and longitude."
      )
      .setRequired(true);
  });

async function execute(interaction) {
  try {
    await interaction.deferReply("Calculating the cosmic constellations...");

    const { weatherData, locationName } = await fetchForecast(
      interaction.options.getString("location")
    );

    const embed = new EmbedBuilder()
      .setColor("52317a")
      .setTitle(`Astronomical forecast for ${locationName}...`)
      .setDescription(`🔭🧙🏻🪄`)
      .setTimestamp()
      .setFooter({
        text: "using the weatherapi.com API",
      });

    for (const day of weatherData) {
      const date = day.date;
      const sR = day.sunriseTime;
      const sS = day.sunsetTime;
      const mR = day.moonriseTime;
      const mS = day.moonsetTime;

      embed.addFields({
        name: date,
        value: `🌅 sunrise ${sR} -> 🌇 sunset ${sS} 
         🌝 moonrise ${mR} -> 🌚 moonset ${mS} \n`,
      });
    }

    await interaction.editReply({
      embeds: [embed],
    });
  } catch (err) {
    console.log("Error: ", err);
    interaction.editReply(
      "A big glowy gas giant has slipped on a banana... oh no"
    );
  }
}

module.exports = {
  data,
  execute,
};
