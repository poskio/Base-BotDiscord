const { Discord, Events, ActivityType } = require("discord.js");
const loadDatabase = require("./../../loaders/loadDatabase");
const loadAppCommands = require("../../loaders/loadAppCommands.js");
const type = process.env.NODE_ENV;
const Text = "TheFiery_";
const packageJSON = require("./../../package.json");
const version = packageJSON.version;
const status = "BETA";
const startTime = Date.now();

module.exports = {

    name: Events.ClientReady,
    async run(client) {

        (async () => {
            client.user.setActivity(`${status} ${version}`, { type: ActivityType.Competing });

            console.log("[CommandesSlash] =>  chargées !");
            console.log(`[Total] => ${client.guilds.cache.size} Serveurs, ${client.users.cache.size} Utilisateurs`);
            const uptimeInSeconds = ((Date.now() - startTime) / 1000).toFixed(2);

            console.log('\x1b[1m\x1b[36m╔════════════════════════════════════════════╗');
            console.log('\x1b[1m\x1b[36m║                                            ║');
            console.log(`\x1b[1m\x1b[36m            💎 ${client.user.tag}     `);
            console.log(`\x1b[1m\x1b[36m            👑 Type : ${type}    `);
            console.log(`\x1b[1m\x1b[36m            💡 Version: ${status}-${version}`);
            console.log(`\x1b[1m\x1b[36m            📅 Uptime: ${uptimeInSeconds}s`);
            console.log(`\x1b[1m\x1b[36m            🚀 Powered by ${Text}`);
            console.log('\x1b[1m\x1b[36m║                                            ║');
            console.log('\x1b[1m\x1b[36m╚════════════════════════════════════════════╝\x1b[0m');

            await loadAppCommands(client)

            if (process.env.DATABASE) {
                try {
                    client.db = await loadDatabase();
                    client.db_promise = client.db.promise();
                    console.log("MySQL: Connexion DB initialisée.");
                } catch (error) {
                    console.warn("MySQL: Impossible de se connecter à MySQL, utilisation du stockage de secours :", error.message);
                }
            }

        })();

        /*setInterval(function () {
            client.db.ping(function (err) {
                if (err) throw err;
                console.log('Server responded to ping');
            })
        }, 21600 * 1000);*/
    }
}