const { Discord, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, EmbedBuilder, TextInputStyle, MessageFlags } = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Envoyer un message direct à un utilisateur.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName("membre")
            .setDescription("Le membre à bannir")
            .setRequired(true)),

    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],
    category: "administration",

    async run(interaction, client) {

        const user = interaction.options.getUser("membre");
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: "Utilisateur introuvable.", flags: [MessageFlags.Ephemeral] });

        const Modal = new ModalBuilder()
            .setCustomId('report')
            .setTitle('Envoyer un message direct à un utilisateur.');

        const messageModal = new TextInputBuilder()
            .setCustomId('dm')
            .setLabel("Que désirez-vous envoyer ?")
            .setRequired(true)
            .setPlaceholder('Veuillez indiquer ici le message que vous souhaitez envoyer.')
            .setStyle(TextInputStyle.Paragraph);

        const ActionRow1 = new ActionRowBuilder().addComponents(messageModal);

        Modal.addComponents(ActionRow1);

        try {

            await interaction.showModal(Modal);

            const reponse = await interaction.awaitModalSubmit({ time: 300000 });

            const messageDm = reponse.fields.getTextInputValue('dm');

            const Embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`${interaction.user} a envoyé \`\`\`${messageDm}\`\`\` avec succès à ${user} `)


            const Embed1 = new EmbedBuilder()
                .setAuthor({ name: `Vous avez reçu un message de la part du Staff de: ${interaction.guild.name}`, iconURL: interaction.client.user.displayAvatarURL() })
                .setColor(client.color)
                .setDescription(`${messageDm}`)
                .setTimestamp()
            //.setFooter({text: `Tu peux répondre à ce message avec \`/contact\``})


            await user.send({ embeds: [Embed1] });

            reponse.reply({ embeds: [Embed] });

        } catch (err) { return; }
    }
};