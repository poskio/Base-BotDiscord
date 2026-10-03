const { Discord, Events, EmbedBuilder, AuditLogEvent, AttachmentBuilder } = require("discord.js")

module.exports = {

    name: Events.GuildMemberRemove,
    once: false,

    async run(client, member) {

        // same as guildDelete but with user or never delete a user unless the server is deleted.
    }
}