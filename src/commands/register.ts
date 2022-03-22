import { ApplicationCommandData, CommandInteraction } from 'discord.js'
import admin from 'firebase-admin'
import { GetRoleName, CalculateGrade, GetGeneration } from '../utils/grade'
import { AddGradeRole } from '../utils/role'

const Data: ApplicationCommandData = {
  name: "register",
  description: "各学年のロールを割り振ります",
  options: [{
    type: "INTEGER",
    name: "year",
    description: "入学した年度",
    required: true,
    minValue: 2013
  }]
}

const Response = async (interaction: CommandInteraction, ref: admin.database.Reference) => {
  const enteryear = interaction.options.getInteger("year");
  if (!enteryear) {
    await interaction.reply({ content: "ERROR! 年度が指定されていません！", ephemeral: true });
  }
  else {
    const grade = CalculateGrade(enteryear);
    if (enteryear <= 2012 || grade <= 0) {
      await interaction.reply({ content: "ERROR! 入学年度が不正です！", ephemeral: true });
    }
    else {
      const child = ref.child(`${interaction.member?.user.id}`);
      child.set({
        'year': enteryear
      });

      AddGradeRole(interaction, interaction.member?.user.id!, grade);
      await interaction.reply(`KSS ${GetGeneration(enteryear)} で登録されました！ あなたは現在${GetRoleName(grade)}です。`);
    }
  }
};

export { Data, Response };
