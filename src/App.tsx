import React, { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Navbar from '@/components/Navbar';
import { ITimer } from './interfaces';
import { Button } from './components/ui/button';
import TimeInput from './components/TimeInput';
import { convertTimeToSeconds } from 'electron/utils/convertTimeToSeconds';
import { calculateTargetDate } from 'electron/utils/calculateTargetDate';
import { calculateTimeLeft } from 'electron/utils/calculateTimeLeft';
import PreviewWindow from './components/PreviewWindow';

function App() {
  // console.log(window.ipcRenderer);
  let [targetDate, setTargetDate] = useState(new Date());
  const [isOpen, setOpen] = useState(false);
  // const [countdownMeta, setCountdownMeta] = useState()
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);
  const [timerList, setTimerList] = useState<ITimer[]>([
    {
      id: '1',
      name: 'test',
      time: 10
    },
    {
      id: '2',
      name: 'teqst',
      time: 10
    }
  ]);

  // const [timeLeft, setTimeLeft] = useState<number>(0);

  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const [timeLeft, setTimeLeft] = useState<{
    total?: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(calculateTimeLeft(calculateTargetDate(targetDate.getTime() / 1000)));

  const handleStartTimer = (time: number) => {
    console.log({ formerTargetDate: targetDate });
    setTargetDate(calculateTargetDate(time));
    console.log({ newTargetDate: targetDate });
    console.log({ omoh: calculateTimeLeft(calculateTargetDate(time)) });
    setTimeLeft(calculateTimeLeft(calculateTargetDate(time)));
  };

  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <Navbar />
      <div className="flex flex-auto">
        <Drawer timerList={timerList} onClick={handleStartTimer} />
        <div className="flex-[3] flex flex-col">
          <div className="border">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <TimeInput minutes={minutes} seconds={seconds} setMinutes={setMinutes} setSeconds={setSeconds} />
            <Button
              variant={'default'}
              className=""
              onClick={() => {
                setTimerList([
                  ...timerList,
                  {
                    id: timerList.length.toString(),
                    name: name,
                    time: convertTimeToSeconds(minutes, seconds)
                  }
                ]);
                setName('');
                setMinutes('');
                setSeconds('');
              }}
            >
              Add
            </Button>
          </div>
          {/* <p>{timeLeft.seconds}</p> */}
          <PreviewWindow
            setTargetDate={setTargetDate}
            targetDate={targetDate}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
