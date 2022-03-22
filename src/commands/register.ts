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
    const enteryear = str[1];
    const enteryear_num = Number(enteryear);
    const grade = CalculateGrade(enteryear_num);

    let invalidArgument = false;
    // 数字4桁以外
    invalidArgument = invalidArgument || !/\d{4}/.test(enteryear)
    // 来年度以降
    invalidArgument = invalidArgument || grade <= 0
    // 1期生より前（2012年以前）
    invalidArgument = invalidArgument || enteryear_num <= 2012

    if (invalidArgument) {
      message.channel.send(`ERROR! 指定された値が不正です`);
    }
    else {
      let child = ref.child(`${message.author.id}`);
      child.set({
        'year': enteryear_num
      });

      AddGradeRole(message, message.author.id, grade);
      message.channel.send(`KSS ${GetGeneration(enteryear_num)} で登録されました！ あなたは現在${GetRoleName(grade)}です。`);
    }
  }
};

export default Register;
