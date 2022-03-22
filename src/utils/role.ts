import { CommandInteraction } from 'discord.js'
import { GetRoleName } from './grade'

const AddGradeRole = (interaction: CommandInteraction, target: string, grade: number) => {
  const roleName = GetRoleName(grade);
  const newRole = interaction.guild?.roles.cache.find(role => role.name === roleName);
  const targetDetail = interaction.guild?.members.cache.get(target);
  if (!targetDetail) {
    console.warn(`[WARN] ${target} is not here!`);
    return;
  }
  else {
    if (newRole) {
      for (let i = 1; i <= 7; i++) {
        const prevRole = targetDetail.roles.cache.find(role => role.name === GetRoleName(i));
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
