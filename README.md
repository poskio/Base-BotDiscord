# Base de Bot Discord

Base de bot Discord en **Node.js** avec **discord.js v14**, chargement automatique des commandes / événements / composants, et MySQL optionnel.

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Structure](#structure)
- [Commandes incluses](#commandes-incluses)
- [Ajouter du contenu](#ajouter-du-contenu)
- [Base de données](#base-de-données)
- [Anti-crash](#anti-crash)

---

## Fonctionnalités

- Slash commands chargées depuis `commands/<catégorie>/`
- Événements chargés depuis `events/<catégorie>/`
- Boutons / menus / autocomplete chargés depuis `interactions/<type>/`
- Vérification des permissions du bot avant exécution
- Réponse aléatoire quand le bot est mentionné
- Signalement de bugs et suggestions vers des salons dédiés
- Anti-crash avec logs envoyés sur un webhook
- Connexion MySQL (pool `mysql2`) si `DATABASE` est renseigné

---

## Prérequis

| Outil | Version |
|---|---|
| Node.js | **22 LTS** ou plus (minimum 18) |
| npm | fourni avec Node |
| MySQL / MariaDB | optionnel |

Sur le [Discord Developer Portal](https://discord.com/developers/applications) :

1. Créer une application → onglet **Bot** → copier le **token**.
2. Activer les **Privileged Gateway Intents** :
   - `Presence Intent`
   - `Server Members Intent`
   - `Message Content Intent`

   > Le client utilise tous les intents (`53608447`). Sans ces trois options, la connexion échoue avec `Used disallowed intents`.
3. Inviter le bot avec les scopes `bot` et `applications.commands`.

---

## Installation

```bash
git clone https://github.com/<user>/Base-De-Bot-Discord.git
cd Base-De-Bot-Discord
npm install
cp .env.example .env
```

---

## Configuration

Fichier `.env` :

| Variable | Requis | Description |
|---|---|---|
| `TOKEN` | ✅ | Token du bot |
| `ANTI_CRASH_WEBHOOK_URL` | ✅ | URL du webhook qui reçoit les erreurs |
| `BOT_COLOR` | ✅ | Couleur des embeds (ex. `"#5865F2"`) |
| `NODE_ENV` | | `production` / `development` (affiché au démarrage) |
| `DATABASE` | | URI MySQL : `mysql://user:pass@host:3306/db` |
| `REPORT_BUG_CHANNEL_ID` | | Salon recevant les `/report-bug` |
| `SUGGEST_FEATURE_CHANNEL_ID` | | Salon recevant les `/suggest-feature` |
| `ownerID` | | ID Discord du propriétaire (commande `/guilds`) |
| `DASHBOARD_URL` | ⚠️ | URL du bouton « Invite moi / Dashboard » |
| `SUPPORT_SERVER` | ⚠️ | URL du bouton « Rejoint le support » |

> ⚠️ `DASHBOARD_URL` et `SUPPORT_SERVER` doivent être des URL complètes (`https://...`), sinon les boutons lien lèvent une erreur (mention du bot, arrivée sur un serveur).

---

## Lancement

```bash
node main.js
```

---

## Structure

```
.
├── main.js               # Point d'entrée : client Discord
├── anticrash.js          # Capture des erreurs → webhook
├── commands/             # Slash commands, 1 dossier = 1 catégorie
│   ├── administration/   # dm, poll
│   ├── bot/              # report-bug, suggest-feature
│   ├── owner/            # guilds
│   └── utils/            # botinfo, guildinfo, help, ping
├── events/               # Événements du client
│   ├── bot/              # ready
│   ├── guild/            # guildCreate, guildDelete, guildMemberAdd/Remove
│   ├── interactions/     # interactionCreate (routeur)
│   └── message/          # messageCreate (réponse aux mentions)
├── interactions/
│   └── buttons/          # ping, poubelle, report-bug, suggest-feature
├── functions/            # Utilitaires exposés via client.function
│   ├── createId.js
│   ├── durationConvertHMS.js
│   └── getms.js
└── loaders/              # Chargement commandes / events / interactions / DB
```

---

## Commandes incluses

| Commande | Catégorie | Permission | Description |
|---|---|---|---|
| `/help [commande]` | Informations | — | Liste des commandes ou détail d'une commande |
| `/ping` | utilitaire | — | Latence API / bot (bouton rafraîchir) |
| `/botinfo` | utilitaire | — | Infos et statistiques du bot |
| `/guildinfo` | utilitaire | — | Infos du serveur |
| `/report-bug` | bot | — | Modal → envoi dans `REPORT_BUG_CHANNEL_ID` |
| `/suggest-feature` | bot | — | Modal → envoi dans `SUGGEST_FEATURE_CHANNEL_ID` |
| `/poll` | administration | Administrateur | Crée un sondage Discord natif |
| `/dm <membre>` | administration | Administrateur | Envoie un MP via un modal |
| `/guilds list` / `/guilds leave <id>` | owner | Administrateur + `ownerID` | Liste / quitte des serveurs |

---

## Ajouter du contenu

### Slash command

`commands/<catégorie>/macommande.js`

```js
const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("macommande")
        .setDescription("Description")
        .setContexts(InteractionContextType.Guild)
        .setDefaultMemberPermissions(null),

    permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks], // permissions requises pour le bot
    category: "utilitaire",                                                          // affichée dans /help

    async run(interaction, client) {
        await interaction.reply("Hello !");
    }
};
```

### Événement

`events/<catégorie>/monEvent.js`

```js
const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildCreate,
    once: false,

    async run(client, ...args) {
        // ...
    }
};
```

### Composant (bouton, menu…)

`interactions/<type>/monbouton.js`

```js
const { ComponentType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "monbouton",                  // préfixe du customId
    type: ComponentType.Button,
    permission: null,                   // permission requise pour l'utilisateur (optionnel)
    botpermissions: [PermissionFlagsBits.SendMessages],

    async run(interaction, ...args) {
        await interaction.update({ content: "Cliqué !" });
    }
};
```

Le `customId` est découpé sur `_` : `monbouton_123_abc` → `name = "monbouton"`, `args = ["123", "abc", client]`.

### Autocomplete

Même format qu'un composant, avec `name` = nom de la commande et `type: InteractionType.ApplicationCommandAutocomplete`.

---

## Base de données

Si `DATABASE` est défini (`mysql://user:mdp@localhost:3306/database`), la connexion est ouverte au démarrage :

- `client.db` → pool `mysql2` (callbacks)
- `client.db_promise` → pool en mode Promise (**à utiliser**)

> Toujours passer les valeurs via `?` (requêtes préparées), jamais par concaténation : protection contre les injections SQL.

### 1. Créer la table

```sql
CREATE TABLE guilds (
    guildID   VARCHAR(20) PRIMARY KEY,
    welcomeChannelID VARCHAR(20) DEFAULT NULL,
    joinedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Ajouter / supprimer un serveur (events)

`events/guild/guildCreate.js`

```js
async run(client, guild) {
    if (!client.db_promise) return;
    await client.db_promise.query(
        "INSERT IGNORE INTO guilds (guildID) VALUES (?)",
        [guild.id]
    );
}
```

`events/guild/guildDelete.js`

```js
async run(client, guild) {
    if (!client.db_promise) return;
    await client.db_promise.query("DELETE FROM guilds WHERE guildID = ?", [guild.id]);
}
```

### 3. Lire / modifier dans une commande

`commands/administration/welcome.js`

```js
const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, ChannelType, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Définir le salon de bienvenue")
        .setContexts(InteractionContextType.Guild)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addChannelOption(opt => opt
            .setName("salon")
            .setDescription("Salon de bienvenue")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)),

    permissions: [PermissionFlagsBits.SendMessages],
    category: "administration",

    async run(interaction, client) {
        if (!client.db_promise) {
            return interaction.reply({ content: "Base de données indisponible.", flags: [MessageFlags.Ephemeral] });
        }

        const channel = interaction.options.getChannel("salon");

        try {
            // Écriture (crée la ligne si elle n'existe pas)
            await client.db_promise.query(
                `INSERT INTO guilds (guildID, welcomeChannelID) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE welcomeChannelID = VALUES(welcomeChannelID)`,
                [interaction.guildId, channel.id]
            );

            // Lecture
            const [rows] = await client.db_promise.query(
                "SELECT welcomeChannelID FROM guilds WHERE guildID = ?",
                [interaction.guildId]
            );

            await interaction.reply(`Salon de bienvenue : <#${rows[0].welcomeChannelID}>`);
        } catch (err) {
            console.error("[DATABASE ERROR]", err);
            await interaction.reply({ content: "Erreur base de données.", flags: [MessageFlags.Ephemeral] });
        }
    }
};
```

### 4. Utiliser la valeur dans un event

`events/guild/guildMemberAdd.js`

```js
async run(client, member) {
    if (!client.db_promise) return;

    const [rows] = await client.db_promise.query(
        "SELECT welcomeChannelID FROM guilds WHERE guildID = ?",
        [member.guild.id]
    );
    if (!rows.length || !rows[0].welcomeChannelID) return;

    const channel = member.guild.channels.cache.get(rows[0].welcomeChannelID);
    if (channel) channel.send(`Bienvenue ${member} !`);
}
```

| Méthode | Retour |
|---|---|
| `SELECT` | `[rows, fields]` → `rows` = tableau d'objets |
| `INSERT` / `UPDATE` / `DELETE` | `[result]` → `result.affectedRows`, `result.insertId` |

---

## Anti-crash

`anticrash.js` envoie sur `ANTI_CRASH_WEBHOOK_URL` :

- le démarrage du bot
- `unhandledRejection` (avec mention `@everyone`)
- `uncaughtException`, `uncaughtExceptionMonitor`
- `beforeExit`, `exit`

---

## Auteur

**TheFiery_**
