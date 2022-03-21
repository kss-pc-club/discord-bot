import ordinal from 'ordinal';

const getRoleName = (grade: number): string => {
  return grade >= 7 ? `OB/OG` : `${grade}年次`;
}

const calculateGrade = (enteryear: number): number => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();  // April is 3
  let grade = year - enteryear + 1;
  if (month < 4) {
    grade--;
  }
  return grade;
};

const getGeneration = (enteryear: number): string => {
  let generation = enteryear - 2013 + 1;
  return ordinal(generation);
};

export { getRoleName, calculateGrade, getGeneration };
