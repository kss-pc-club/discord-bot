import ordinal from 'ordinal';

const GetRoleName = (grade: number): string =>
  grade >= 7 ? `OB/OG` : `${grade}年次`;

const CalculateGrade = (enteryear: number): number => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();  // April is 3
  let grade = year - enteryear + 1;
  if (month < 4) {
    grade--;
  }
  return grade;
};

const GetGeneration = (enteryear: number): string => {
  const generation = enteryear - 2013 + 1;
  return ordinal(generation);
};

export { GetRoleName, CalculateGrade, GetGeneration };
