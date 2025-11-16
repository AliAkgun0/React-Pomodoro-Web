import { TimerType } from '../hooks/usePomodoro';

interface TimerTypeSelectorProps {
  currentType: TimerType;
  onTypeChange: (type: TimerType) => void;
  disabled: boolean;
}

export function TimerTypeSelector({ currentType, onTypeChange, disabled }: TimerTypeSelectorProps) {
  const types: { value: TimerType; label: string }[] = [
    { value: 'focus', label: 'Focus' },
    { value: 'short_break', label: 'Short Break' },
    { value: 'long_break', label: 'Long Break' },
  ];

  return (
    <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
      {types.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onTypeChange(value)}
          disabled={disabled}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            currentType === value
              ? value === 'focus'
                ? 'bg-blue-500 text-white'
                : value === 'short_break'
                ? 'bg-green-500 text-white'
                : 'bg-amber-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
