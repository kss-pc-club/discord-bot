import { ApplicationCommandData, CommandInteraction } from 'discord.js'

const Data: ApplicationCommandData = {
  name: "ping",
  description: "Pong!と返信します",
}

const Response = (message: Message) => {
  message.channel.send('Pong!');
};

export { Data, Response };
