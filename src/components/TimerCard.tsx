import React, { useState } from 'react';

import Icon from '../assets/icons/Icon-Electron.png';
import { ITimer } from '@/interfaces';

export default function TimerCard({ timer, onClick }: { timer: ITimer; onClick: (time: number) => void }) {
  return (
    <div onClick={() => onClick(timer.time)} className="flex-1 p-2 border">
      <h3>{timer.name}</h3>
      <p>{timer.time}</p>
    </div>
  );
}
