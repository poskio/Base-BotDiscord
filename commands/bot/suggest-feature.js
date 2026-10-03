const { Discord, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js')

module.exports = {

  data: new SlashCommandBuilder()
    .setName("suggest-feature")
    .setDescription("Envoie d'une suggestion au devellopeur du bot")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

  async run(interaction, client) {

    const Modal = new ModalBuilder()
      .setCustomId('suggest-feature')
      .setTitle('Suggérer une nouvelle fonctionnalité')

    const messageModal = new TextInputBuilder()
      .setCustomId('namecommand')
      .setLabel("Nom de la commande")
      .setRequired(true)
      .setMaxLength(50)
      .setPlaceholder('Par exemple: /discord')
      .setStyle(TextInputStyle.Short);

    const messageModal2 = new TextInputBuilder()
      .setCustomId('description')
      .setLabel("Description de la commande")
      .setRequired(true)
      .setMaxLength(999)
      .setPlaceholder('la commmande consisterait en quoi ?')
      .setStyle(TextInputStyle.Paragraph);

    const ActionRow1 = new ActionRowBuilder().addComponents(messageModal);
    const ActionRow2 = new ActionRowBuilder().addComponents(messageModal2);


    Modal.addComponents(ActionRow1);
    Modal.addComponents(ActionRow2);

    try {

      await interaction.showModal(Modal);

      const reponse = await interaction.awaitModalSubmit({ time: 300000 });
      ;
      const messageNamecommand = reponse.fields.getTextInputValue('namecommand');
      const messageDescription = reponse.fields.getTextInputValue('description');

      const Embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`Merci ${interaction.user} ! Nous avons reçu ta suggestion avec succès.`)

      const Embed1 = new EmbedBuilder()
        .setTitle(`🎫 Nouvelle suggestion !`)
        .setColor(client.color)
        .setDescription(` 
      **Auteur de la suggestion**
      \`${interaction.user.tag} - (${interaction.user.id})\`\n
      **Nom de la commande: **
      > ${messageNamecommand}\n
      **Description de la commmande:** 
      > ${messageDescription}\n
      `)
        .setTimestamp()
        .setFooter({ text: `Suggestion de Fonctionnalités`, iconURL: (interaction.client.user.displayAvatarURL({ dynamic: true })) })

      const btn = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("suggest-feature")
            .setLabel("Fonctionnalité Ajoutée")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("💡"));

      const channeltest = interaction.client.channels.cache.get(process.env.SUGGEST_FEATURE_CHANNEL_ID);
      await channeltest.send({ embeds: [Embed1], components: [btn] });

      reponse.reply({ embeds: [Embed], flags: [MessageFlags.Ephemeral] });

    } catch (err) { return; }

  }
};