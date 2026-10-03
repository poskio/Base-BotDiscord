const { Discord, Events } = require("discord.js")

module.exports = {

    name: Events.GuildDelete,
    once: false,

    async run(client, guild) {

        // delete the tables in the tables
    }
}