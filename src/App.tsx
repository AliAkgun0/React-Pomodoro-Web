import { usePomodoro } from './hooks/usePomodoro';
import { useTheme } from './hooks/useTheme';
import { Timer } from './components/Timer';
import { TimerTypeSelector } from './components/TimerTypeSelector';
import { ThemeToggle } from './components/ThemeToggle';
import { Statistics } from './components/Statistics';
import { Clock } from 'lucide-react';

function App() {
  const {
    timeLeft,
    isRunning,
    timerType,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer,
    switchTimerType,
  } = usePomodoro();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                FocusTime
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pomodoros completed: {completedPomodoros}
              </p>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <div className="flex flex-col items-center gap-12">
          <TimerTypeSelector
            currentType={timerType}
            onTypeChange={switchTimerType}
            disabled={isRunning}
          />

          <Timer
            timeLeft={timeLeft}
            isRunning={isRunning}
            timerType={timerType}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
          />

          <Statistics />
        </div>
      </div>
    </div>
  );
}

export default App;
