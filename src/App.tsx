import React, { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Navbar from '@/components/Navbar';
import { ITimer } from './interfaces';
import { Button } from './components/ui/button';
import TimeInput from './components/TimeInput';

function App() {
  console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
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
  const [timer, setTimer] = useState<number>(0);

  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };

  const handleStartTimer = (time: number) => {
    window.Main.SetTimer(time);
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
        <div className="flex-[3]">
          <div className="border">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <TimeInput minutes={minutes} seconds={seconds} setMinutes={setMinutes} setSeconds={setSeconds} />
            <Button
              variant={'default'}
              className=""
              onClick={() => {
                // window.Main.SetTimer(timer);
                setTimerList([
                  ...timerList,
                  {
                    id: timerList.length.toString(),
                    name: name,
                    time:
                      parseInt(minutes.length > 0 ? minutes : '0') * 60 + parseInt(seconds.length > 0 ? seconds : '0')
                  }
                ]);
                setName('');
                setMinutes('');
                setSeconds('');
              }}
            >
              Add
            </Button>
            <Button
              className="p-3 bg-blue-300"
              onClick={() => {
                let totalSeconds =
                  parseInt(minutes.length > 0 ? minutes : '0') * 60 + parseInt(seconds.length > 0 ? seconds : '0');
                window.Main.SetTimer(totalSeconds);
              }}
            >
              Click
            </Button>
            jD
          </div>
          <div>
            <p>Preview</p>

            <div className="flex flex-row">
              <Button
                onClick={() => {
                  window.Main.PauseTimer();
                }}
              >
                Pause
              </Button>
              <Button
                onClick={() => {
                  window.Main.StopTimer();
                }}
              >
                Stop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
