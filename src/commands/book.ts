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
  if (!tag) {
    // ほかの人からは見えない設定
    await interaction.reply({ content: "ERROR! タグが指定されていません！", ephemeral: true });
    return;
  }
  const url = dbUrl+`?tag=${encodeURIComponent(tag)}`;
  await interaction.deferReply();
  const response = await fetch(url);
  // レスポンスがきちんと返ってきた
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
        { name: book, value: '\u200b' },
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
