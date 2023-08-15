export const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date().getTime();
  const difference = targetDate.getTime() - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    total: difference / 1000,
    days,
    hours,
    minutes,
    seconds
  };
};
