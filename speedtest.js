require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const FastSpeedtest = require('fast-speedtest-api');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SPEEDTEST_API_KEY = process.env.SPEEDTEST_API_KEY;
const SERVER_NAME = process.env.SERVER_NAME;
const SERVER_IMAGE = process.env.SERVER_IMAGE;
const SERVER_COLOR = parseInt(process.env.SERVER_COLOR);

let speedtest = new FastSpeedtest({
    token: SPEEDTEST_API_KEY,
    verbose: false,
    timeout: 10000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: FastSpeedtest.UNITS.Mbps
});

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
    runSpeedTest();
    setInterval(runSpeedTest, 3600000);
});

async function runSpeedTest() {
    try {
        const downloadSpeed = await speedtest.getSpeed();

        const embed = new EmbedBuilder()
            .setColor(SERVER_COLOR)
            .setTitle("Speedtest result")
            .addFields(
                { name: 'Download speed:', value: `${downloadSpeed.toFixed(2)} Mbps`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: SERVER_NAME, iconURL: SERVER_IMAGE });

        const channel = await client.channels.fetch(CHANNEL_ID);
        channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Error during speed test:', error);
    }
}

client.login(TOKEN);
