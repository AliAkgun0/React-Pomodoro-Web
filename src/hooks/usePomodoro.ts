import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, getUserId } from '../lib/supabase';

export type TimerType = 'focus' | 'short_break' | 'long_break';

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  timerType: TimerType;
  completedPomodoros: number;
}

const TIMER_DURATIONS = {
  focus: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60,
};

export function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>('focus');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const saveSession = async (type: TimerType, duration: number, completed: boolean) => {
    try {
      const userId = getUserId();
      await supabase.rpc('set_config', {
        setting: 'app.current_user_id',
        value: userId,
      });

      await supabase.from('pomodoro_sessions').insert({
        user_id: userId,
        duration,
        type,
        completed,
        completed_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const onTimerComplete = useCallback(async () => {
    const duration = TIMER_DURATIONS[timerType];
    await saveSession(timerType, duration, true);

    if (timerType === 'focus') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);

      if (newCount % 4 === 0) {
        setTimerType('long_break');
        setTimeLeft(TIMER_DURATIONS.long_break);
      } else {
        setTimerType('short_break');
        setTimeLeft(TIMER_DURATIONS.short_break);
      }
    } else {
      setTimerType('focus');
      setTimeLeft(TIMER_DURATIONS.focus);
    }

    setIsRunning(false);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: timerType === 'focus' ? 'Time for a break!' : 'Time to focus!',
        icon: '/vite.svg',
      });
    }
  }, [timerType, completedPomodoros]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onTimerComplete]);

  const startTimer = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(true);
    startTimeRef.current = Date.now();
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = async () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[timerType]);

    if (startTimeRef.current && timeLeft < TIMER_DURATIONS[timerType]) {
      const elapsed = TIMER_DURATIONS[timerType] - timeLeft;
      await saveSession(timerType, elapsed, false);
    }

    startTimeRef.current = null;
  };

  const switchTimerType = (type: TimerType) => {
    setIsRunning(false);
    setTimerType(type);
    setTimeLeft(TIMER_DURATIONS[type]);
    startTimeRef.current = null;
  };

  return {
    timeLeft,
    isRunning,
    timerType,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer,
    switchTimerType,
  };
}
