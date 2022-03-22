import { Message } from 'discord.js'

const Response = (message: Message) => {
  message.channel.send('Pong!');
};

export { Response };
