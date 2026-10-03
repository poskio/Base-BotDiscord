const { Client, IntentsBitField, Collection } = require("discord.js");
const client = new Client({ intents: new IntentsBitField(53608447) });
const loadCommands = require(`./loaders/loadCommands`);
const loadEvents = require(`./loaders/loadEvents`);
const loadInteractions = require(`./loaders/loadInteractions`);
const { AntiCrash } = require('./anticrash');

require("dotenv").config();

client.color = (process.env.BOT_COLOR);
client.commands = new Collection();
client.interactions = new Collection();
client.function = {
    createId: require("./functions/createId"),
    durationConvertHMS: require("./functions/durationConvertHMS"),
    getms: require("./functions/getms"),
};

(async () => {
    AntiCrash(client);
    loadCommands(client);
    loadEvents(client);
    loadInteractions(client);
    client.login(process.env.TOKEN);
})();
