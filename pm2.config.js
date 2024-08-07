module.exports = {
  apps: [
    {
      name: "discord-speedtest-bot",
      script: "speedtest.js",
      env: {
        DISCORD_TOKEN: process.env.DISCORD_TOKEN,
        CHANNEL_ID: process.env.CHANNEL_ID,
        SPEEDTEST_API_KEY: process.env.SPEEDTEST_API_KEY,
        SERVER_NAME: process.env.SERVER_NAME,
        SERVER_IMAGE: process.env.SERVER_IMAGE,
        SERVER_COLOR: process.env.SERVER_COLOR,
        INTERVAL_HOURS: process.env.INTERVAL_HOURS
      },
    },
  ],
};
