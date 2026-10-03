const { Discord, SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js')

module.exports = {

  data: new SlashCommandBuilder()
    .setName("report-bug")
    .setDescription("Signaler un bug aux développeurs du bot")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

  async run(interaction, client) {

    const Modal = new ModalBuilder()
      .setCustomId('report-bug')
      .setTitle('Signaler un bug')

    const messageModal = new TextInputBuilder()
      .setCustomId('namecommand')
      .setLabel("Nom de la commande problématique")
      .setRequired(true)
      .setMaxLength(100)
      .setPlaceholder('Par exemple: /discord')
      .setStyle(TextInputStyle.Short);

    const messageModal2 = new TextInputBuilder()
      .setCustomId('description')
      .setLabel("Description du signalement")
      .setRequired(true)
      .setMaxLength(500)
      .setPlaceholder('Indiquez la manière de reproduire le bug')
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
        .setDescription(`Merci ${interaction.user} ! Nous avons reçu ton signalement avec succès.`)

      const Embed1 = new EmbedBuilder()
        .setTitle(`📫 Nouveau signalement d'un bug!`)
        .setColor(client.color)
        .setDescription(` 
      **Auteur du signalement**
      \`${interaction.user.tag} - (${interaction.user.id})\`\n
      **Nom de la commande problématique:**
      > ${messageNamecommand}\n
      **Description du signalement:** 
      > ${messageDescription}\n
      `)
        .setTimestamp()
        .setFooter({ text: `Signalement bug`, iconURL: (interaction.client.user.displayAvatarURL({ dynamic: true })) })

      const btn = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
          .setCustomId("report-bug")
          .setLabel("Marquer comme résolue")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🛠️"))

      const channeltest = client.channels.cache.get(process.env.REPORT_BUG_CHANNEL_ID);
      await channeltest.send({ embeds: [Embed1], components: [btn] });

      reponse.reply({ embeds: [Embed], flags: [MessageFlags.Ephemeral] });

    } catch (err) { return; }

  }
};