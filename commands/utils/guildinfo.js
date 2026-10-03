const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("guildinfo")
        .setDescription("Informations relative du serveur")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],
    category: "utilitaire",

    async run(interaction) {


        try {
            const preferredLocale = interaction.guild.preferredLocale === 'fr' ? 'Français' : 'English'
            const name = interaction.guild.name
            const id = interaction.guild.id
            const owner = ((await interaction.guild.fetchOwner()))
            const ownerid = interaction.guild.ownerId
            //const createdatnow = interaction.guild.createdTimestamp; // <t:${Math.floor(createdatnow / 1000)}:F>
            const verificationLevel = interaction.guild.verificationLevel === 0 ? "Aucun - Ouvert à tous" : interaction.guild.verificationLevel === 1 ? "Faible - Email vérifié" : interaction.guild.verificationLevel === 2 ? "Moyen - Utilisateur Discord depuis plus de 5 minutes" : interaction.guild.verificationLevel === 3 ? "Haut - Membre du serveur depuis plus de 10 minutes" : interaction.guild.verificationLevel === 4 ? "Très haut - Téléphone vérifié" : ""
            const memberCount = interaction.guild.memberCount
            const botCount = (await interaction.guild.members.fetch()).filter(member => member.user.bot).size
            //const botjoinnow = moment(message.guild.joinedAt).fromNow()
            const totalChannels = interaction.guild.channels.cache.size
            const categories = interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size
            const textchannel = interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size
            const voicechannel = interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice || c.type === ChannelType.GuildStageVoice).size
            const threadChannels = interaction.guild.channels.cache.filter((c) => c.type === ChannelType.PrivateThread || c.type === ChannelType.PublicThread).size
            const boostLevel = interaction.guild.premiumTier === 0 ? "Aucun palier" : interaction.guild.premiumTier === 1 ? "Palier 1" : interaction.guild.premiumTier === 2 ? "Palier 2" : interaction.guild.premiumTier === 3 ? "Palier 3" : ""
            const nbboosts = interaction.guild.premiumSubscriptionCount
            const emoji = interaction.guild.emojis.cache.size
            const rolesCount = interaction.guild.roles.cache.size
            const explisive = interaction.guild.explicitContentFilter === 0 ? "Aucune analyse des messages envoyés" : interaction.guild.explicitContentFilter === 1 ? "Analyse des messages des membres sans rôle" : interaction.guild.explicitContentFilter === 2 ? "Analyse tous les messages envoyés" : ''
            const nsfwlevel = interaction.guild.nsfwLevel === 0 ? "Normale" : interaction.guild.nsfwLevel === 1 ? "Explicite" : interaction.guild.nsfwLevel === 2 ? "Sûr" : interaction.guild.nsfwLevel === 3 ? "Limité par l'âge" : ''

            const rolesString = interaction.guild.roles.cache.toJSON().join(", ")
            const server = interaction.guild;
            const emojis = server.emojis.cache.map(emoji => emoji.toString()).join(" ") || "Rien";

            for (const i of Array(Math.ceil(rolesString.length / 1024 || emojis.length / 1024)).keys()) {

                const Embed = new EmbedBuilder()
                    .setColor(interaction.client.color)
                    .setTitle(`${name} (${id})`)
                    .setThumbnail(interaction.guild.iconURL())
                    .setDescription(`Informations et statistiques relatives au serveur. ${name}\n`)
                    .addFields(
                        { name: `Propriétaire`, value: `${owner} (${ownerid})`, inline: true },
                        { name: `[${memberCount}] Membres`, value: `${botCount} bots`, inline: true },
                        { name: `[${nbboosts}] Boosts`, value: `${boostLevel}`, inline: true },
                        { name: `[${rolesCount}] Rôles`, value: (rolesString.substring((i * 1024), (i * 1024) + 1024)) },
                        { name: `Niveau de vérification`, value: `${verificationLevel}`, },
                        { name: `Analyse de contenu`, value: `${explisive}`, inline: true },
                        { name: `Restriction d'âge`, value: `${nsfwlevel}`, inline: true },
                        { name: `Language`, value: `${preferredLocale}` },
                        { name: `[${totalChannels}] Salons`, value: `${categories} categories | ${threadChannels} fils | ${textchannel} textuels | ${voicechannel} vocaux`, inline: true },
                        { name: `[${emoji}] emoji`, value: (emojis.substring((i * 1024), (i * 1024) + 1024)) },
                        { name: `Création du serveur`, value: `<t:${Math.floor((interaction.guild.createdAt) / 1000)}:F>`, inline: true },
                        { name: `Date d'arrivée du bot`, value: `<t:${Math.floor((interaction.guild.joinedAt) / 1000)}:F>`, inline: true },
                    )

                if (i === 0) await interaction.reply({ embeds: [Embed] })
            }

        } catch (err) {
            console.error(err)

            let error = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle("Une erreur est survenue lors de la récupération des données du serveur.")

            return interaction.reply({ embeds: [error] })
        }
    }
}