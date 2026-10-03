const {client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {

    data : new SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet d'avoir les commandes du bot et des détails dessus")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addStringOption(opt => opt
        .setName("commande")
        .setDescription("Permet d'avoir de l'aide sur une commande en particulier")
        .setRequired(false)
    ),
    category : "Informations",
    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks],

    async run(interaction, client) {

        let command;
        if(interaction.options.getString("commande")) {
            command = client.commands.get(interaction.options.getString("commande"));
            if(!command) return interaction.reply("Cette commande n'existe pas, veuillez réessayer")
        }

        if(!command) {

            let categories = [];
            client.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle("Aide")
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commandes actuellement disponible : \`${client.commands.size}\`\nCatégories de Commandes : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "Commande Help - Aide"})

            await categories.sort().forEach(async cat => {

                let commands = client.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.data.name}\` : ${cmd.data.description}`).join("\n")}`})
            })

            await interaction.reply({embeds: [Embed] });
        } else {

            let Embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Aide ${command.data.name}`)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom: \`${command.data.name}\`\nDesciption: \`${command.data.description}\`\nPermission requise: \`${typeof command.data.name !== "bigint" ? command.data.permission : new setDefaultMemberPermissions(command.data.permission).toArray(false)}\`\nCommande en Dm: \`${command.dm ? "Oui" : "Non"}\`\nCatégorie: \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: "Commande Help - Aide"})

            await interaction.reply({embeds: [Embed] });
        }

        //interaction.reply("Commande en développement")
    }
};