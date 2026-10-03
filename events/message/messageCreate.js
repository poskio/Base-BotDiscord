const { Events, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {

    name: Events.MessageCreate,
    once: false,

    async run(client, message) {

        try {
            if (message.content === `<@${client.user.id}>`) {

                const embedMention = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez mentionné ?`)
                    .setDescription(`Salut, ${message.author}! Il semble que vous m'ayez mentionné.\n
                    Je vous recommande d'utiliser \`/help\` afin de voir toutes les commandes disponible\n
                    Si vous avez remarquer un bug, merci de nous le faire part avec la commande suivante: \`/report-bug\` et pour les suggestions \`/suggest-feature\``)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention1 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez mentionné ?`)
                    .setDescription(`Salut, ${message.author}! Il semble que vous m'ayez mentionné.
                    Je vous recommande d'utiliser \`/help\` afin de voir toutes les commandes disponible`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention21 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez mentionné ?`)
                    .setDescription(`Salut, ${message.author}! Il semble que vous m'ayez mentionné.
                    Je vous recommande d'utiliser \`/help\` afin de voir toutes les commandes disponible`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention22 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez mentionné ?`)
                    .setDescription(`Salut, ${message.author}! Il semble que vous m'ayez mentionné.
                    Je vous recommande d'utiliser \`/help\` afin de voir toutes les commandes disponible`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention23 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez mentionné ?`)
                    .setDescription(`Salut, ${message.author}! Il semble que vous m'ayez mentionné.
                    Je vous recommande d'utiliser \`/help\` afin de voir toutes les commandes disponible`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention2 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`oui ?`)
                    .setDescription(`Salut, ${message.author}! Désirez-vous un chocolat chaud accompagné d'une musique douce ?`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention3 = new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`Salut, ${message.author}! que souhaitez-vous ?`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention4 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous avez trouver un bug ?`)
                    .setDescription(`Salut, ${message.author}! vous pouvez faire \`/report-bug\` ou \`/suggest-feature\` pour donner votre suggestion au dev`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention5 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Je suis là pour vous aidé!`)
                    .setDescription(`Salut, ${message.author}! \`/help\` vous sera fort utile !`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention6 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez mentionné ?`)
                    .setDescription(`Salut, ${message.author}! Il semble que vous m'ayez mentionné non ? si vous êtes à la recherche d'un ami, je ne suis qu'à un ping de distance ! `)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention7 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Je suis là pour vous aidé!`)
                    .setDescription(`Salut, ${message.author}!`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                const embedMention8 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Hey ! Si vous voulez des infos sur les membres ou les stats, je suis là pour ça ! \`/info guild\` \`/info bot\``)
                const embedMention9 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Alerte ! Alerte ! Bot détecté ! Que se passe-t-il ?`)
                const embedMention10 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Je ne suis pas un magicien, mais je peux faire apparaître des réponses !`)
                const embedMention11 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Je suis comme un serviteur, mais sans les frais ! Que souhaitez-vous ? \`/help\``)
                const embedMention12 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Je ne suis pas un magicien, mais je peux faire apparaître des réponses !`)
                const embedMention13 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Oh, vous m'avez appelé ! Je suis juste un humble bot au service de l'humanité... et des mèmes !`)
                const embedMention14 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Alerte ! Alerte ! Bot détecté ! Que se passe-t-il ? 🚨`)
                const embedMention15 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Qui me pingue invoque le savoir du bot ! Que désirez-vous connaître ? \`/help\``)
                const embedMention16 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`🎵 'Consultez-moi, c'est un chorus !' 🎶 Allez, dite-moi ce qu'il vous faut ! \`/help\``)
                const embedMention17 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Vous m'avez appelé comme un Jedi appelle son sabre laser ! 🌌 Que puis-je faire pour vous, jeune Padawan ? \`/help\``)
                const embedMention18 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Ping reçu ! Mais s'il vous plaît, pas de spam... le bot a besoin de café aussi !`)
                const embedMention19 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`"Oh, me voilà ! Je ne fais rien d'autre que d'attendre d'être pigé. 🙄 Qu'est-ce qui se passe ?\n vous voulez la liste des commandes ? la voilà \`/help\`...`)
                const embedMention20 = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Je suis ici pour sauver votre journée, quelle est la mission, citoyens ? \`/help\``)

                const messages = [embedMention, embedMention1, embedMention21, embedMention22, embedMention23, embedMention2, embedMention3, embedMention4, embedMention5, embedMention6, embedMention7, embedMention8, embedMention9, embedMention10, embedMention11, embedMention12, embedMention13, embedMention14, embedMention15, embedMention16, embedMention17, embedMention18, embedMention19, embedMention20]
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Invite moi")
                            .setURL(process.env.DASHBOARD_URL)
                            .setStyle(ButtonStyle.Link)
                            .setDisabled(true) // a retirer plus tard
                            .setEmoji("<:17:1276887646811193354>"))
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Rejoint le support !")
                            .setURL(process.env.SUPPORT_SERVER)
                            .setStyle(ButtonStyle.Link)
                            .setDisabled(true));
                message.reply({ embeds: [randomMessage], components: [button] });
            }
        } catch (error) { console.error(`[MENTION ERROR] Erreur lors de la réponse à une mention dans la guilde ${message.guild.name} (${message.guild.id}):`, error); }
    }
}