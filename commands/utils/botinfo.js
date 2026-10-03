const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const packageJSON = require("./../../package.json");
const version = packageJSON.dependencies["discord.js"];
const { category } = require("./help");
module.exports = {

    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Informations relative du bot")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],
    category: "utilitaire",

    async run(interaction, client) {

        try {

            const start = Date.now();
            let time0 = await client.function.durationConvertHMS(interaction.client.uptime)

            const CommandeEmbed = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle(`Pinging.....`)

            await interaction.reply({ embeds: [CommandeEmbed] }).then(msg => {
                const end = Date.now();

                const totalmember = interaction.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)
                let rolesCount = 0
                interaction.client.guilds.cache.forEach(guild => {
                    return rolesCount = rolesCount + guild.roles.cache.size
                })

                let channelsCount = 0
                interaction.client.guilds.cache.forEach(guild => {
                    return channelsCount = channelsCount + guild.channels.cache.size
                })

                let emojisCount = 0
                interaction.client.guilds.cache.forEach(guild => {
                    return emojisCount = emojisCount + guild.emojis.cache.size
                })

                const Embed = new EmbedBuilder()
                    .setColor(interaction.client.color)
                    .setTitle(`Informations relatives au bot \` ${interaction.client.user.tag} \``)
                    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`
            <:14:1276850739003658282>  **__Informations relatives au bot__**
            
            > **<:1_:1276849188638036030> | Développeur** : <@593014634873618442>
            > **<:3_:1276849186029174845> | Owner** : <@593014634873618442>
            > **<:2_:1276849187648180317> | Nom** : <@1187326062309416970>
            > **<:8_:1276848974229405799> | ID** : \`1123383784163786764\`\n
            > **<:5_:1276848979136479333> | Uptime :** \`${time0}\`
            > **💾 | Ram :** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
            > **<:15:1276863866596491304> | Latence de l'api** : \`${Math.round(interaction.client.ws.ping)} ms\`
            > **<:15:1276863866596491304> | Latence du bot** : \`${Math.round(end - start)} ms\`
            > **<:10:1276848971922542665> | Discord Version :** \`v${version}\`
            > **<:13:1276848893744779384> | Node Version :** \`${process.version}\`
            
            <:14:1276850739003658282>  **__Information Statistiques__**
            
            > **<:6_:1276848978083975263> | Serveurs** : \`${interaction.client.guilds.cache.size}\`
            > **<:4_:1276848980021739684> | Commandes Dispo** : \`${interaction.client.commands.size}\`
            > **<:9_:1276848973298008095> | Membres** : \`${totalmember}\`
            > **<:12:1276848929639763979> | Rôles** : \`${rolesCount}\`
            > **<:7_:1276848976251064384> | Salon** : \`${channelsCount}\`
            > **<:11:1276848941547262023> | Émojis** : \`${emojisCount}\`
            
                    `)
                    .setTimestamp()
                    .setFooter({ text: `${interaction.client.user.tag} © 2025`, iconURL: (interaction.client.user.displayAvatarURL({ dynamic: true })) })

                return interaction.editReply({ embeds: [Embed] }).catch(e => { });

            }).catch(err => { })

        } catch (e) {
            console.error(e)
        }
    }
}


