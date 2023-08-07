export interface ITimer {
  id: string;
  name: string;
  time: number;
  isRunning?: boolean;
  isPaused?: boolean;
  isFinished?: boolean;
  isCancelled?: boolean;
}
