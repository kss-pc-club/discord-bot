import ordinal from 'ordinal';

/**
 * 渡された学年に対し、学年Roleの文字列を返す
 * @param grade - 学年
 * @returns 学年Roleの名前
 */
const GetRoleName = (grade: number): string =>
  grade >= 7 ? `OB/OG` : `${grade}年次`;

/**
 * 入学年度から学年を求める
 * @param enteryear - 入学年度
 * @returns 学年（というより入学して何年たったか）
 */
const CalculateGrade = (enteryear: number): number => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  let grade = year - enteryear + 1;
  if (month < 4) {
    grade--;
  }
  return grade;
};

/**
 * 入学年度から第何期生かを求める
 * @param enteryear - 入学年度
 * @returns 第何期生かを表す序数
 */
const GetGeneration = (enteryear: number): string => {
  const generation = enteryear - 2013 + 1;
  return ordinal(generation);
};

export { GetRoleName, CalculateGrade, GetGeneration };
