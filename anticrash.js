const { EmbedBuilder, WebhookClient} = require("discord.js");


function AntiCrash(client) {
    
const web = new WebhookClient({ url: process.env.ANTI_CRASH_WEBHOOK_URL});

web.send({
    embeds: [
        new EmbedBuilder()
        .setTitle("Bot démarré")
        .setDescription(`✅**AntiCrash Initialisé**`)
        .setColor("#00ff00")
    ]
})

process.on('unhandledRejection', (error) => {
    web.send({
        content: "@everyone",
        embeds: [
            new EmbedBuilder()
            .setTitle("Nouvelle erreur detecté")
            .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
            .setColor("#ff0000")
        ]
    })
});
process.on("uncaughtException", (error, origin) => {
    web.send({
        embeds: [
            new EmbedBuilder()
            .setTitle("Nouvelle erreur detecté")
            .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
            .setColor("#ff0000")
            .addFields({
                name: "Information supplémentaire", 
                value: `\`\`\`js\n${origin}\`\`\``, 
                inline: true
            })
        ]
    })
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    web.send({
        embeds: [
            new EmbedBuilder()
            .setTitle("Nouvelle erreur detecté")
            .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
            .setColor("#ff0000")
            .addFields({
                name: "Information supplémentaire", 
                value: `\`\`\`js\n${origin}\`\`\``, 
                inline: true
            })
        ]
    })
});
process.on('beforeExit', (err) => {
    web.send({
        embeds: [
            new EmbedBuilder()
            .setTitle("Nouvelle erreur detecté")
            .setDescription(`\`\`\`js\n${err}\`\`\``)
            .setColor("#ff0000")
        ]
    })
});
process.on('exit', (err) => {
    web.send({
        embeds: [
            new EmbedBuilder()
            .setTitle("Nouvelle erreur detecté")
            .setDescription(`\`\`\`js\n${err}\`\`\``)
            .setColor("#ff0000")
        ]
    })
});
}

module.exports = { AntiCrash };