const fetchWikiExtract = async (query) => {
  const entry = query.replaceAll(" ", "%20");
  console.log(entry);

  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${entry}`
    );
    return await res.json();
  } catch (err) {
    return { error: "There has been an error requesting the extract." };
  }
};

module.exports = {
  fetchWikiExtract,
};
