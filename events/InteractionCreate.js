const Discord = require("discord.js");
const chalk = require("chalk");
const database = require("../utils/schemas/userSchema");

module.exports = {
    name: Discord.Events.InteractionCreate,
    async execute(interaction) {

        /* Execute Commands */
        if (interaction.isChatInputCommand()) {
            try {
                await interaction.client.commands.get(interaction.commandName).execute(interaction);
            } catch (error) {
                console.error(chalk.bold.redBright(error));
            };
        };

        /* Button Clicked */
        if (interaction.isButton()) {
            
        };

        /* Modal Submitted */
        if (interaction.isModalSubmit()) {
            if (interaction.customId === "modal-edit-folio") {

                const name = interaction.fields.getTextInputValue("input-name");
                const occupation = interaction.fields.getTextInputValue("input-occupation");
                const description = interaction.fields.getTextInputValue("input-description");

                await database.findOne({ userId: interaction.user.id }).then(async result => {
                    result.name = name;
                    result.occupation = occupation;
                    result.description = description;
                    result.save();

                    await interaction.reply({ content: "### \\✅ Your changes have been saved!", ephemeral: true })
                });

            } // else if () {};
        };

    },
};