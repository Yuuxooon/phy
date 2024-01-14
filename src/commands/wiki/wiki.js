const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { fetchWikiExtract } = require("../../requests/fetchWikiExtract");

const data = new SlashCommandBuilder()
  .setName("wiki")
  .setDescription(
    "Looks up a keyword in the wikipedia.org database and replies with an extract for the article."
  )
  .addStringOption((option) => {
    return option
      .setName("keyword")
      .setDescription("Something you'd like to search in the wiki database.")
      .setRequired(true);
  });

async function execute(interaction) {
  try {
    await interaction.deferReply("asking goo... I mean Wikipedia...");
    const keyword = interaction.options.getString("keyword");
    const wikiData = await fetchWikiExtract(keyword);

    if ("error" in wikiData) {
      throw new Error(wikiData.error);
    }

    const pageId = Object.keys(wikiData.query.pages)[0];

    const title = wikiData.query.pages[pageId].title;
    const extract = wikiData.query.pages[pageId].extract;

    if (!extract) {
      throw new Error("There is no extract.");
    }

    const embed = new EmbedBuilder()
      .setColor("60afd1")
      .setTitle(title || "Nope")
      .setTimestamp()
      .setDescription(extract || "Sorry, nothing's here.");

    await interaction.editReply({
      embeds: [embed],
    });
  } catch (err) {
    console.log("Error: ", err);
    await interaction.editReply({
      content: `Something went awry... ${err}`,
      ephemeral: true,
    });
  }
}

module.exports = {
  data,
  execute,
};
