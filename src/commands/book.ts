import { ApplicationCommandData, CommandInteraction, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'

const Data: ApplicationCommandData = {
  name: "book",
  description: "タグから本を検索します",
  options: [{
    type: "STRING",
    name: "tag",
    description: "本のタグ",
    required: true
  }]
}

const Response = async (interaction: CommandInteraction, dbUrl: any) => {
  const tag = interaction.options.getString("tag");
  const url = dbUrl+`?tag=${tag}`;
  await interaction.deferReply();
  const response = await fetch(url);
  if (response.ok) {
    const books = await response.json() as Array<string>;
    if (books.length == 0) {
      const embed = new MessageEmbed()
        .setColor('#2b3840')
        .setTitle('見つかりませんでした')
        .setTimestamp();
      await interaction.editReply({embeds: [embed]});
    }
    else {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${books.length}冊見つかりました！`)
        .setTimestamp();
      books.forEach(book => embed.addFields(
        { name: book, value: '--' },
      ));
      await interaction.editReply({embeds: [embed]});
    }
  }
  else {
    const embed = new MessageEmbed()
      .setColor('#ff0022')
      .setTitle("エラーが発生しました。")
      .setTimestamp();
    await interaction.editReply({embeds: [embed]});
  }
};

export { Data, Response };
