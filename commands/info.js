const Discord = require("discord.js");

const description = `
### About Folio
Create a mini-profile where you can showcase your projects, skills, and experience with ease on Discord. Get started by using the **/register** command!

- **Register** **\`/register\`**
Create a new folio; you cannot register twice.

- **Edit Folio** **\`/edit folio\`**
Use this command to edit your name, occupation, and description.

- **Edit Items** **\`/edit <item> <add/remove>\`**
Use this command to edit your links, projects, and images.

*Bought to you exclusively by **[Netcord](https://netcord.in)***
`

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("info")
        .setDescription("Learn more about Folio!"),
    async execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setDescription(description)
            .setColor(0x2B2D31);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};