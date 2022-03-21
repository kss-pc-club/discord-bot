import { Message } from 'discord.js'

const Ping = (message: Message) => {
  message.channel.send('Pong!');
};

export default Ping;
