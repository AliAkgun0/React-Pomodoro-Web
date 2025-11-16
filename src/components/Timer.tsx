import { Play, Pause, RotateCcw } from 'lucide-react';
import { TimerType } from '../hooks/usePomodoro';

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  timerType: TimerType;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function Timer({ timeLeft, isRunning, timerType, onStart, onPause, onReset }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = (() => {
    const durations = {
      focus: 25 * 60,
      short_break: 5 * 60,
      long_break: 15 * 60,
    };
    return ((durations[timerType] - timeLeft) / durations[timerType]) * 100;
  })();

  return (
    <div className="relative">
      <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
        <circle
          cx="160"
          cy="160"
          r="150"
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="160"
          cy="160"
          r="150"
          className={`transition-all duration-1000 ${
            timerType === 'focus'
              ? 'stroke-blue-500'
              : timerType === 'short_break'
              ? 'stroke-green-500'
              : 'stroke-amber-500'
          }`}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 150}`}
          strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-7xl font-bold text-gray-800 dark:text-white tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex gap-4 mt-8">
          {!isRunning ? (
            <button
              onClick={onStart}
              className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg hover:shadow-xl"
            >
              <Play className="w-8 h-8" fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={onPause}
              className="p-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-lg hover:shadow-xl"
            >
              <Pause className="w-8 h-8" fill="currentColor" />
            </button>
          )}

          <button
            onClick={onReset}
            className="p-4 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-colors shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
