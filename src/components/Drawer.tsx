import React, { useState } from 'react';

import Icon from '../assets/icons/Icon-Electron.png';
import TimerCard from './TimerCard';
import { ITimer } from '@/interfaces';

export default function Drawer({
  timerList,
  onClick,
  onRemove
}: {
  timerList: ITimer[];
  onClick: (time: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex-1 border-r">
      {timerList.length > 0 ? (
        <div className="flex flex-col gap-2 py-2">
          {React.Children.toArray(
            timerList.map((timer, index) => <TimerCard onRemove={onRemove} onClick={onClick} timer={timer} />)
          )}
        </div>
      ) : (
        <div className="p-4 text-center">
          <p className="italic text-gray-600">No timers yet...</p>
        </div>
      )}
    </div>
  );
}
