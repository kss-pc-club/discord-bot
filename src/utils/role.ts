import { CommandInteraction } from 'discord.js'
import { GetRoleName } from './grade'

/**
 * 学年のRoleを振り分けます
 * @param interaction - Discord.jsのInteraction
 * @param target - 振り分け対象のUserID
 * @param grade - 振り分け対象の学年
 */
const AddGradeRole = (interaction: CommandInteraction, target: string, grade: number) => {
  const roleName = GetRoleName(grade);
  const newRole = interaction.guild?.roles.cache.find(role => role.name === roleName);
  const targetDetail = interaction.guild?.members.cache.get(target);
  // 対象のUserが存在しない場合は何もしない
  if (!targetDetail) {
    console.warn(`[WARN] ${target} is not here!`);
  }
  else {
    if (newRole) {
      // 現在ついている学年Roleをすべて消す
      for (let i = 1; i <= 7; i++) {
        const prevRole = targetDetail.roles.cache.find(role => role.name === GetRoleName(i));
        if (prevRole) {
          targetDetail.roles.remove(prevRole);
        }
      }
      // 新しいRoleを追加
      targetDetail.roles.add(newRole);
    }
    else {
      console.warn(`[WARN] ${roleName} is undefined`);
    }
  }
};

export { AddGradeRole };
