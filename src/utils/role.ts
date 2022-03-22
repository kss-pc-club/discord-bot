import { Message } from 'discord.js'
import { GetRoleName } from './grade'

const AddGradeRole = (message: Message, target: string, grade: number) => {
  const roleName = GetRoleName(grade);
  const newRole = message.member?.guild.roles.cache.find(role => role.name === roleName);
  const targetDetail = message.guild?.members.cache.get(target);
  if (!targetDetail) {
    console.warn(`[WARN] ${target} is not here!`);
    return;
  }
  else {
    if (newRole) {
      for (let i = 1; i <= 7; i++) {
        const prevRole = message.member?.guild.roles.cache.find(role => role.name === GetRoleName(i));
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
