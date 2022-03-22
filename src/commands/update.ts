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
  // to be implemented
  // ref.once('value').then(snapshot => {
  //   const json = snapshot.toJSON() as Members;
  //   for (const item in json) {
  //     const year = json[item].year;
  //     const grade = CalculateGrade(year);
  //     AddGradeRole(message, item, grade);
  //   }
  //   message.channel.send('学年を更新しました！');
  //   console.log('[LOG] Updated grade!');
  // });
};

export { Data, Response };
