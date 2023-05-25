const Discord = require("discord.js");
const Canvas = require("canvas");
const database = require("../utils/schemas/userSchema");
const functions = require("../utils/functions");

/* Register Fonts */
Canvas.registerFont("./utils/assets/Fonts/Montserrat-ExtraBold.ttf", { family: "Montserrat-ExtraBold" });
Canvas.registerFont("./utils/assets/Fonts/Montserrat-SemiBold.ttf", { family: "Montserrat-SemiBold" });
Canvas.registerFont("./utils/assets/Fonts/Inter-Regular.ttf", { family: "Inter-Regular" });
Canvas.registerFont("./utils/assets/Fonts/Inter-Medium.ttf", { family: "Inter-Medium" });

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("folio")
        .setDescription("View your Folio!")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Select a user (leave blank to view your own)")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("ephemeral")
            .setDescription("Toggle message visibility")
            .setRequired(false)
            .addChoices(
                { name: "Enable", value: "enable" },
                { name: "Disable", value: "disable" }
            )
        ),
    async execute(interaction) {

        const ephemeral = interaction.options.getString("ephemeral");
        await interaction.deferReply({ ephemeral: ephemeral === "enable" ? true : false });

        const user = interaction.options.getUser("user");

        if (!user) {

            await database.findOne({ userId: interaction.user.id }).then(async result => {

                const row = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel("Quick Links")
                        .setCustomId(`links-${interaction.user.id}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(result.links.length <= 0),
                    new Discord.ButtonBuilder()
                        .setLabel("View Projects")
                        .setCustomId(`projects-${interaction.user.id}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(result.projects.length <= 0),
                    new Discord.ButtonBuilder()
                        .setLabel("Gallery")
                        .setCustomId(`gallery-${interaction.user.id}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(result.images.length <= 0),
                    new Discord.ButtonBuilder()
                        .setLabel("Like")
                        .setCustomId(`like-${interaction.user.id}`)
                        .setStyle(Discord.ButtonStyle.Primary)
                        .setEmoji("1098998809985560616")
                );

                /* */
                const canvas = Canvas.createCanvas(1200, 1024);
                const ctx = canvas.getContext("2d");

                const theme = await Canvas.loadImage(`./utils/assets/Themes/${result.premiumUsers.includes(interaction.user.id) ? "Premium" : "Basic"}/${result.theme}.png`);
                ctx.drawImage(theme, 0, 0, canvas.width, canvas.height);

                const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: "png" }));
                functions.drawAvatar(ctx, avatar, 24, 142, 76, 70);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "76px \"Montserrat-ExtraBold\"";

                let name;
                if (result.name) name = result.name; else name = interaction.user.username;
                ctx.fillText(`${name}`, 243, 138, 864);

                const verifiedEnabled = result.verifiedUsers.includes(interaction.user.id);
                const premiumEnabled = result.premiumUsers.includes(interaction.user.id);

                const nameWidth = ctx.measureText(name).width;

                let badgeX = 235 + nameWidth + 20;

                if (verifiedEnabled || premiumEnabled) {
                    if (verifiedEnabled) {
                        const verifiedBadge = await Canvas.loadImage("./utils/assets/Badges/verified.png");
                        ctx.drawImage(verifiedBadge, badgeX, 82, 59, 59);
                        badgeX += 59 + 10;
                    }

                    if (premiumEnabled) {
                        const premiumBadge = await Canvas.loadImage("./utils/assets/Badges/premium.png");
                        ctx.drawImage(premiumBadge, badgeX, 82, 59, 59);
                        badgeX += 59 + 20;
                    }
                };

                ctx.fillStyle = '#EDEDED';
                ctx.font = '36px "Inter-Regular"';
                ctx.fillText(`${result.occupation}`, 243, 200, 864);

                ctx.fillStyle = '#FFFFFF';
                ctx.font = '38px "Montserrat-SemiBold"';
                ctx.fillText(`♥️${result.likes.length} Likes • ${functions.formatLastEdit(result.lastEdit)}`, 102, 915, 996);

                let description;
                if (result.description === "null") {
                    ctx.fillStyle = "#CCCBC9";
                    description = "This creator hasn't set up a description yet, but we're sure they're up to something great.";
                } else {
                    ctx.fillStyle = "#FFFFFF"
                    description = result.description;
                };

                ctx.font = '36px "Inter-Regular"';
                functions.wrapText(ctx, description, 1032, 56, 88, 348);

                const file = new Discord.AttachmentBuilder(canvas.toBuffer(), "result.png");
                await interaction.editReply({ files: [file], components: [row] });

            });

        } else {

            await database.findOne({ userId: user.id }).then(async result => {
                
                const row = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel("Quick Links")
                        .setCustomId(`links-${user.id}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(result.links.length <= 0),
                    new Discord.ButtonBuilder()
                        .setLabel("View Projects")
                        .setCustomId(`projects-${user.id}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(result.projects.length <= 0),
                    new Discord.ButtonBuilder()
                        .setLabel("Gallery")
                        .setCustomId(`gallery-${user.id}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(result.images.length <= 0),
                    new Discord.ButtonBuilder()
                        .setLabel("Like")
                        .setCustomId(`like-${user.id}`)
                        .setStyle(Discord.ButtonStyle.Primary)
                        .setEmoji("1098998809985560616")
                );

                /* */
                const canvas = Canvas.createCanvas(1200, 1024);
                const ctx = canvas.getContext("2d");

                const theme = await Canvas.loadImage(`./utils/assets/Themes/${result.premiumUsers.includes(user.id) ? "Premium" : "Basic"}/${result.theme}.png`);
                ctx.drawImage(theme, 0, 0, canvas.width, canvas.height);

                const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "png" }));
                functions.drawAvatar(ctx, avatar, 24, 142, 76, 70);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "76px \"Montserrat-ExtraBold\"";

                let name;
                if (result.name) name = result.name; else name = user.username;
                ctx.fillText(`${name}`, 243, 138, 864);

                const verifiedEnabled = result.verifiedUsers.includes(user.id);
                const premiumEnabled = result.premiumUsers.includes(user.id);

                const nameWidth = ctx.measureText(name).width;

                let badgeX = 235 + nameWidth + 20;

                if (verifiedEnabled || premiumEnabled) {
                    if (verifiedEnabled) {
                        const verifiedBadge = await Canvas.loadImage("./utils/assets/Badges/verified.png");
                        ctx.drawImage(verifiedBadge, badgeX, 82, 59, 59);
                        badgeX += 59 + 10;
                    }

                    if (premiumEnabled) {
                        const premiumBadge = await Canvas.loadImage("./utils/assets/Badges/premium.png");
                        ctx.drawImage(premiumBadge, badgeX, 82, 59, 59);
                        badgeX += 59 + 20;
                    }
                };

                ctx.fillStyle = '#EDEDED';
                ctx.font = '36px "Inter-Regular"';
                ctx.fillText(`${result.occupation}`, 243, 200, 864);

                ctx.fillStyle = '#FFFFFF';
                ctx.font = '38px "Montserrat-SemiBold"';
                ctx.fillText(`♥️${result.likes.length} Likes • ${functions.formatLastEdit(result.lastEdit)}`, 102, 915, 996);

                let description;
                if (result.description === "null") {
                    ctx.fillStyle = "#CCCBC9";
                    description = "This creator hasn't set up a description yet, but we're sure they're up to something great.";
                } else {
                    ctx.fillStyle = "#FFFFFF"
                    description = result.description;
                };

                ctx.font = '36px "Inter-Regular"';
                functions.wrapText(ctx, description, 1032, 56, 88, 348);

                const file = new Discord.AttachmentBuilder(canvas.toBuffer(), "result.png");
                await interaction.editReply({ files: [file], components: [row] });

            });

        };
    },
};