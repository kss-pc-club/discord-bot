import { Message } from 'discord.js'
import admin from 'firebase-admin'
import { GetRoleName, CalculateGrade, GetGeneration } from '../utils/grade'
import { AddGradeRole } from '../utils/role'

const Register = (message: Message, ref: admin.database.Reference) => {
  const str = message.content.split(' ');
  if (str.length < 2) {
    message.channel.send('ERROR! 引数が足りません');
  }
  else {
    const enteryear = parseInt(str[1]);
    if (isNaN(enteryear)) {
      message.channel.send(`ERROR! 指定された値が不正です`);
    }
    else {
      let child = ref.child(`${message.author.id}`);
      child.set({
        'year': enteryear 
      });

      const grade = CalculateGrade(enteryear);
      AddGradeRole(message, message.author.id, grade);
      message.channel.send(`KSS ${GetGeneration(enteryear)} で登録されました！ あなたは現在${GetRoleName(grade)}です。`);
    }
  }
};

export default Register;
