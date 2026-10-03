const { PermissionFlagsBits, ComponentType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    
    name: "suggest-feature",
    type: ComponentType.Button,
    botpermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

    async run(interaction) {
        
        const btn2 = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
            .setCustomId('suggest-feature')
            .setLabel('Fonctionnalité Disponible!')
            .setStyle(ButtonStyle.Success)
            .setDisabled(true))
        .addComponents(new ButtonBuilder()
            .setCustomId("poubelle")
            .setLabel("Supprimmer")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("🗑️"))

        interaction.update({components: [btn2]})

    }
};