async function clientReadyHandler(client) {
  console.log(`Successfully logged in as ${client.user.tag}`);
}

module.exports = {
  clientReadyHandler,
};
