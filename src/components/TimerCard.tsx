import React, { useState } from 'react';

import Icon from '../assets/icons/Icon-Electron.png';
import { ITimer } from '@/interfaces';
import { Button } from './ui/button';
import { formatTimeToDisplay } from 'electron/utils/formatTimeToDisplay';

export default function TimerCard({
  timer,
  onClick,
  onRemove
}: {
  timer: ITimer;
  onClick: (time: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div onClick={() => onClick(timer.time)} className="flex flex-1 p-2 border cursor-pointer hover:bg-gray-100">
      <div className="flex-1">
        <h3 className="text-sm text-grey-600">{timer.name || 'No name'}</h3>
        <p className="text-xs font-semibold">{formatTimeToDisplay(timer.time)}</p>
      </div>
      <label htmlFor="">
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(timer.id);
            // onClick(timer.time);
          }}
        >
          x
        </Button>
      </label>
    </div>
  );
}
