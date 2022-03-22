import { ApplicationCommandData, CommandInteraction } from 'discord.js'

const Data: ApplicationCommandData = {
  name: "ping",
  description: "Pong!と返信します",
}

const Response = async (interaction: CommandInteraction) => {
  // to be implemented
  // message.channel.send('Pong!');
};

export { Data, Response };
