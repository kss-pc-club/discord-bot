import { Message } from 'discord.js'
import { getRoleName } from './grade'

const AddGradeRole = (message: Message, target: string, grade: number) => {
  let roleName = getRoleName(grade);
  let newRole = message.member?.guild.roles.cache.find(role => role.name === roleName);
  let targetDetail = message.guild?.members.cache.get(target);
  if (!targetDetail) {
    console.warn(`[WARN] ${target} is not here!`);
    return;
  }
  else {
    if (newRole) {
      for(let i = 1; i <= 7; i++) {
        let prevRole = message.member?.guild.roles.cache.find(role => role.name === getRoleName(i));
        if (prevRole) {
          targetDetail.roles.remove(prevRole);
        }
      }
      targetDetail.roles.add(newRole);
    }
    else {
      console.warn(`[WARN] ${roleName} is undefined`);
    }
  }  
};

export { AddGradeRole };
