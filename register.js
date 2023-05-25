const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("node:fs");
const config = require("./config.json");
const commands = [];

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new Discord.REST({ version: '10' }).setToken(config.botToken);

(async () => {

    try {

        console.log(chalk.bold.yellowBright(`Started refreshing ${commands.length} application (/) commands.`));

        const data = await rest.put(
            Discord.Routes.applicationCommands(config.clientId),
            { body: commands },
        );
        
        console.log(chalk.bold.yellowBright(`Successfully reloaded ${data.length} application (/) commands.`));
        
    } catch (error) {
        console.error(colorette.bold(colorette.redBright(error)));
    }

})();