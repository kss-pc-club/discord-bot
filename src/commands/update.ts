import { ApplicationCommandData, CommandInteraction } from 'discord.js'
import admin from 'firebase-admin'
import { AddGradeRole } from '../utils/role'
import { CalculateGrade } from '../utils/grade'

type Members = {
  [userid: string]: {
    year: number
  }
}

const Data: ApplicationCommandData = {
  name: "update",
  description: "学年を最新情報に更新します"
}

const Response = async (interaction: CommandInteraction, ref: admin.database.Reference) => {
  ref.once('value').then(async snapshot => {
    const json = snapshot.toJSON() as Members;
    for (const item in json) {
      const year = json[item].year;
      const grade = CalculateGrade(year);
      AddGradeRole(interaction, item, grade);
    }
    await interaction.reply('学年を更新しました！')
    console.log('[LOG] Updated grade!');
  });
};

export { Data, Response };
