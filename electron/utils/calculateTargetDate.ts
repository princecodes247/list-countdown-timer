export const calculateTargetDate = (seconds: number): Date => {
  const now = new Date();
  // const targetDate = new Date(now.getTime() + minutes * 60000 + seconds * 1000);
  const targetDate = new Date(now.getTime() + seconds * 1000);
  return targetDate;
};
