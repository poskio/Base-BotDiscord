const { PermissionFlagsBits, ComponentType, EmbedBuilder } = require("discord.js");

module.exports = {
    
    name: "ping",
    type: ComponentType.Button,
    botpermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

    async run(interaction) {
        
        try {

            const start = Date.now();
            const CommandeEmbed = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle(`Pinging.....`)
        
                interaction.update({ embeds: [CommandeEmbed]}).then(msg => {
            const end = Date.now();
        
            const embed = new EmbedBuilder()
        
                .setColor(interaction.client.color)
                .setTitle(`🏓 Pong\n Latence de l'api \`${interaction.client.ws.ping}ms\`.\n Latence du bot : ${end - start}ms`)
        
                return interaction.editReply({ embeds: [embed]}).catch(e => { });
            }).catch(err => { })
        
            } catch (e) {
            console.error(e)}


        //await interaction.message.edit({content: `Mon ping est de \`${interaction.client.ws.ping}ms\`.`});
        //await interaction.deferUpdate();
    }
};