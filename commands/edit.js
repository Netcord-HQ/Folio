const Discord = require("discord.js");
const database = require("../utils/schemas/userSchema");
const themes = require("../utils/themes");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("edit")
        .setDescription("Edit your Folio!")
        .addSubcommand(subCommand => subCommand
            .setName("folio")
            .setDescription("Edit your Folio!")
        )
        
        .addSubcommand(subCommand => subCommand
            .setName("theme")
            .setDescription("Edit your folio's theme!")    
        ),
    async execute(interaction) {

        const subCommand = interaction.options.getSubcommand();

        const result = await database.findOne({ userId: interaction.user.id });
        if (!result) return interaction.reply({ content: "Uh oh! You don't have a folio registered!", ephemeral: true });

        if (subCommand === "folio") {
            const modal = new Discord.ModalBuilder()
                .setCustomId("modal-edit-folio")
                .setTitle("Edit Folio ✨")
                .addComponents(
                    new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                            .setCustomId("input-name")
                            .setLabel("Name")
                            .setPlaceholder("John Doe")
                            .setMaxLength(32)
                            .setRequired(true)
                            .setStyle(Discord.TextInputStyle.Short)
                            .setValue(result.name)
                    ),
                    new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                            .setCustomId("input-occupation")
                            .setLabel("Occupation")
                            .setPlaceholder("Software Developer")
                            .setMaxLength(64)
                            .setRequired(true)
                            .setStyle(Discord.TextInputStyle.Short)
                            .setValue(result.occupation)
                    ),
                    new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                            .setCustomId("input-description")
                            .setLabel("Description")
                            .setPlaceholder("This is a description! Go ahead and let everyone know all about you, we're all very curious!")
                            .setMaxLength(512)
                            .setRequired(true)
                            .setStyle(Discord.TextInputStyle.Paragraph)
                            .setValue(result.description)
                    )
                );

            await interaction.showModal(modal);

        } else if (subCommand === "theme") {
            const theme = themes.get('amethyst');

            const createButtonRow = (themeKey) => {
                const theme = themes.get(themeKey);

                const previousButton = new Discord.ButtonBuilder()
                    .setCustomId(`theme_${theme.previous}`)
                    .setEmoji('⬅️')
                    .setDisabled(theme.previous === 'nothing');

                const nextButton = new Discord.ButtonBuilder()
                    .setCustomId(`theme_${theme.next}`)
                    .setEmoji('➡️')
                    .setDisabled(theme.next === 'nothing');

                const buttonRow = new Discord.ActionRowBuilder()
                    .addComponents(previousButton, nextButton);

                return buttonRow;
            };

            const handleButtonInteraction = (interaction) => {
                const customId = interaction.customId;

                if (customId.startsWith('theme_')) {
                    const themeKey = customId.split('_')[1];
                    const theme = themes.get(themeKey);

                    const buttonRow = createButtonRow(themeKey);

                    interaction.update({
                        content: `Current Theme: **${theme.title}**`,
                        components: [buttonRow],
                    });
                }
            };

            const buttonRow = createButtonRow('amethyst');

            interaction.reply({
                content: `Current Theme: **${theme.title}**`,
                components: [buttonRow],
            });

            if (interaction.isButton()) {
                handleButtonInteraction(interaction);
            }
        }
    }
};
