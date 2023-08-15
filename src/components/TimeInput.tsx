import React, { useState } from 'react';

import Icon from '../assets/icons/Icon-Electron.png';
import TimerCard from './TimerCard';
import { ITimer } from '@/interfaces';

export default function TimeInput({
  minutes,
  seconds,
  setMinutes,
  setSeconds
}: {
  minutes: string;
  seconds: string;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
  setSeconds: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const [minutes, setMinutes] = useState('00');
  // const [seconds, setSeconds] = useState('00');
  const minsInputRef = React.useRef<HTMLInputElement>(null);
  const secondsInputRef = React.useRef<HTMLInputElement>(null);
  const handleInput1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value as string;
    // if
    // }
    const mins = parseInt(value.trim().length > 0 ? value : '');
    console.log({ mins });
    setMinutes(
      isNaN(mins) ? '' : mins < 60 ? mins.toString() : mins / 10 > 10 ? Math.floor(mins / 10).toString() : '60'
    );
    if (mins > 60) {
      setSeconds(mins % 10 === 0 ? '' : (mins % 10).toString());
      secondsInputRef.current?.focus();
      return;
    }
    // setMinutes(mins.toString());
    if (value.length === 3) {
      if (parseInt(seconds) < 1) setSeconds('');
      secondsInputRef.current?.focus();
      return;
    }
  };
  const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value as string;

    const seconds = parseInt(value.trim().length > 0 ? value : '0');

    setSeconds(seconds < 60 ? seconds.toString() : '60');
    if (value.length === 3) {
      secondsInputRef.current?.focus();
      return;
    }
  };
  return (
    <div className="flex items-center gap-2">
      <input
        ref={minsInputRef}
        type="text"
        className="p-3 border aspect-[1/1] max-w-[50px] text-center"
        value={minutes}
        onChange={handleInput1Change}
        maxLength={3}
        placeholder="00"
      />
      <span>:</span>
      <input
        className="p-3 border aspect-[1/1] max-w-[50px] text-center"
        ref={secondsInputRef}
        placeholder="00"
        value={seconds}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // window.Main?.SetTimer(parseInt(minutes) * 60 + parseInt(seconds));
            // setMinutes('00');
            // setSeconds('00');
          }
          if (e.key === 'Backspace') {
            if (seconds === '0') {
              setSeconds('');
              minsInputRef.current?.focus();
              e.preventDefault();
            }
          }
        }}
        onChange={handleInput2Change}
        maxLength={2}
      />
    </div>
  );
}
