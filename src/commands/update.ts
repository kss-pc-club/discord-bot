import { Message } from 'discord.js'
import admin from 'firebase-admin'
import { AddGradeRole } from '../utils/role'
import { CalculateGrade } from '../utils/grade'

const Update = (message: Message, ref: admin.database.Reference) => {
  type Members = {
    [userid : string] : {
      year: number
    }
  }
  ref.once('value').then(snapshot => {
    const json = snapshot.toJSON() as Members;
    for(let item in json) {
      const year = json[item]['year'];
      const grade = CalculateGrade(year);
      AddGradeRole(message, item, grade);
    }
    message.channel.send('学年を更新しました！');
    console.log('[LOG] Updated grade!');
  });
};

export default Update;
