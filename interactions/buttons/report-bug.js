const { PermissionFlagsBits, ComponentType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    
    name: "report-bug",
    type: ComponentType.Button,
    botpermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

    async run(interaction) {
        
            const btn1 = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
	            .setCustomId('report-bug')
	            .setLabel('Problème résolue !')
	            .setStyle(ButtonStyle.Success)
	            .setDisabled(true))
            .addComponents(new ButtonBuilder()
                .setCustomId("poubelle")
                .setLabel("Supprimmer")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("🗑️"))

            interaction.update({components: [btn1]})

    }
};