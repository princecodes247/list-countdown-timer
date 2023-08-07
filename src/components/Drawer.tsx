import React, { useState } from 'react';

import Icon from '../assets/icons/Icon-Electron.png';
import TimerCard from './TimerCard';
import { ITimer } from '@/interfaces';

export default function Drawer({ timerList, onClick }: { timerList: ITimer[]; onClick: (time: number) => void }) {
  return (
    <div className="flex-1 border">
      jo
      <div className="flex flex-col ">
        {React.Children.toArray(timerList.map((timer, index) => <TimerCard onClick={onClick} timer={timer} />))}
      </div>
    </div>
  );
}
