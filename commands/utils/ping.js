//const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, ButtonStyle, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, EmbedBuilder} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Obtenir la latence du bot")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),
    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],
    category: "utilitaire",

    async run(interaction) {

        const button = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setCustomId("ping")
        .setLabel("Rafraichir")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("<:wifi:1013171070880202874>"));

        try {

            const start = Date.now();
        
            const CommandeEmbed = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle(`Pinging.....`)
        
            interaction.reply({ embeds: [CommandeEmbed]}).then(msg => {
            const end = Date.now();
        
            const CommandeEmbed1 = new EmbedBuilder()
        
                .setColor(interaction.client.color)
                .setTitle(`🏓 Pong\n Latence de l'api \`${interaction.client.ws.ping}ms\`.\n Latence du bot : ${end - start}ms`)
        
                return interaction.editReply({ embeds: [CommandeEmbed1], components: [button] }).catch(e => { });
            }).catch(err => { })
        
            } catch (e) {
            console.error(e)}
    },
};