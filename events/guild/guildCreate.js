const { Discord, Events, ButtonStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js")

module.exports = {

    name: Events.GuildCreate,
    once: false,

    async run(client, guild) {

        // here insert the tables from the new server into the database
        

        const embedSetup = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Je vous en remercide d'avoir ajouter Poskio sur ${guild.name}!`)
            .setDescription(`Pour démarrer avec le bot, vous pouvez cliquer sur le lien ci-dessous afin de configurer le bot à votre guise !\n\n
                Veuillez noter que ce bot est en version béta et peut générer des réponses indésirables\n
                **Si vous rentrez ces bugs ou d'autres, veuillez faire un signalement avec la commande suivante \`/report-bug\`**\n
                ou encore pour des suggestions \`/suggest-feature\` !`)

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Dashboard")
                    .setURL(process.env.DASHBOARD_URL)
                    .setStyle(ButtonStyle.Link)
                    .setDisabled(true) 
                    .setEmoji("<:17:1276887646811193354>"));

        if (guild.systemChannel) {
            guild.systemChannel.send({ embeds: [embedSetup], components: [button] });

        } else if (guild.publicUpdatesChannel) {
            guild.publicUpdatesChannel.send({ embeds: [embedSetup], components: [button] });
        }
    }
}