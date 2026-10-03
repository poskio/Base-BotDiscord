const { Discord, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, MessageFlags } = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
        .setName("guilds")
        .setDescription("Afficher les serveurs dans lesquels le bot est présent.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(command => command
            .setName("leave")
            .setDescription("Permet de quitter un serveur.")
            .addStringOption(option => option
                .setName("id")
                .setDescription("ID du serveur")
                .setRequired(true)))
        .addSubcommand(command => command
            .setName("list")
            .setDescription("affiche la liste des serveurs où est le bot")),

    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

    async run(interaction, client) {

        switch (interaction.options.getSubcommand()) {

            case "leave": {

                try {

                    const { user } = interaction;
                    if (user.id !== process.env.ownerID) return interaction.reply({ content: "Vous ne disposez pas des autorisations nécessaires pour effectuer cette commande.", flags: [MessageFlags.Ephemeral] })

                    const serverID = interaction.options.getString("id");
                    if (!serverID) return interaction.reply({ content: "Le serveur spécifié est introuvable.", flags: [MessageFlags.Ephemeral] });

                    const guild = client.guilds.cache.get(serverID);
                    if (!guild) return interaction.reply({ content: "Le serveur spécifié est introuvable.", flags: [MessageFlags.Ephemeral] });

                    if (!guild.available) {
                        return interaction.reply({ content: "Le serveur est indisponible.", flags: [MessageFlags.Ephemeral] })
                    }

                    guild.leave();
                    interaction.reply({ content: `Le bot a été expulsé du serveur : **${guild.name}**`, flags: [MessageFlags.Ephemeral] });

                } catch (error) {
                    console.error(error);
                    return interaction.reply({ content: "Une erreur est survenue lors de la récupération du serveur, veuillez vérifier que l'identifiant est correct.", flags: [MessageFlags.Ephemeral] })
                }

                break;
            }

            case "list": {

                const { user } = interaction;
                if (user.id !== process.env.ownerID) return interaction.reply({ content: "Vous ne disposez pas des permissions requises pour exécuter cette commande.", flags: [MessageFlags.Ephemeral] });

                const servers = interaction.client.guilds.cache;

                let serverList = '';
                servers.forEach(server => {
                    serverList += `${server.name} (${server.id}) - ${server.memberCount} membres\n\n`;
                });

                let Embed = new EmbedBuilder()
                    .setColor(client.color)
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        { name: `Informations relatives aux serveurs ${client.guilds.cache.size}`, value: `${serverList} ` },

                    )

                await interaction.reply({ embeds: [Embed] })
                break;
            }
        }
    }
};