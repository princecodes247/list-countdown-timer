export const convertTimeToSeconds = (minutes: string, seconds: string): number => {
  return parseInt(minutes.length > 0 ? minutes : '0') * 60 + parseInt(seconds.length > 0 ? seconds : '0');
};
