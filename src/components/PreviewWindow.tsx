import { calculateTimeLeft } from 'electron/utils/calculateTimeLeft';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { calculateTargetDate } from 'electron/utils/calculateTargetDate';
import { convertTimeToSeconds } from 'electron/utils/convertTimeToSeconds';
import { formatTimeToDisplay } from 'electron/utils/formatTimeToDisplay';

export default function PreviewWindow({
  targetDate,
  setTargetDate,
  timeLeft,
  setTimeLeft
}: {
  targetDate: Date;
  setTargetDate: (date: Date) => void;
  timeLeft: {
    total?: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  setTimeLeft: (
    value: React.SetStateAction<{
      total?: number;
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }>
  ) => void;
}) {
  const [pause, setPause] = useState<{
    pauseTime: Date;
    formerEndTime: Date;
  } | null>(null);

  let interval: NodeJS.Timer;
  useEffect(() => {
    console.log({ timeLeft });
    if (pause) return;
    setPause(null);
    window.Main.SetTimer(calculateTimeLeft(targetDate).total);
    interval = setInterval(() => {
      if (pause) {
        // clearInterval(interval);
        console.log('is pausedddd');
        return;
      }
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      console.log({ difference, now, targetDate: targetDate.getTime(), timeLeft });

      if (difference <= 0) {
        console.log('hitting ifa');
        setPause(null);
        clearInterval(interval);
        setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, pause]);

  const handlePauseTimer = () => {
    if (pause) {
      const computedTime = new Date().getTime() + (pause.formerEndTime.getTime() - pause.pauseTime.getTime());
      const computedTargetDate = new Date(computedTime);
      console.log({ computedTime, computedTargetDate, pause });
      setTargetDate(computedTargetDate);
      setTimeLeft(calculateTimeLeft(computedTargetDate));
      setPause(null);
      window.Main.SetTimer(calculateTimeLeft(computedTargetDate).total);
      return;
    }
    clearInterval(interval);
    window.Main.PauseTimer();
    setPause({
      formerEndTime: targetDate,
      pauseTime: new Date()
    });
  };

  const handleStopTimer = () => {
    window.Main.StopTimer();
  };

  return (
    <div className="flex flex-col flex-1 p-6 border">
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-4xl">
          {formatTimeToDisplay(convertTimeToSeconds(timeLeft.minutes.toString(), timeLeft.seconds.toString()))}
        </h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button onClick={handlePauseTimer}>Pause</Button>
        <Button onClick={handleStopTimer}>Stop</Button>
      </div>
    </div>
  );
}
