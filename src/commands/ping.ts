import { ApplicationCommandData, CommandInteraction } from 'discord.js'

const Data: ApplicationCommandData = {
  name: "ping",
  description: "Pong!と返信します",
}

const Response = async (interaction: CommandInteraction) => {
  await interaction.reply("Pong!");
};

export { Data, Response };
