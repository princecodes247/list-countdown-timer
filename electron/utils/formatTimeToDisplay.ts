export const formatTimeToDisplay = (time: number): string => {
  return (
    Math.floor(time / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    (time % 60).toString().padStart(2, '0')
  );
};
