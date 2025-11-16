import { useEffect, useState } from 'react';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import { supabase, getUserId } from '../lib/supabase';

interface Stats {
  totalSessions: number;
  completedSessions: number;
  totalFocusTime: number;
  todayFocusTime: number;
}

export function Statistics() {
  const [stats, setStats] = useState<Stats>({
    totalSessions: 0,
    completedSessions: 0,
    totalFocusTime: 0,
    todayFocusTime: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const userId = getUserId();
      await supabase.rpc('set_config', {
        setting: 'app.current_user_id',
        value: userId,
      });

      const { data: sessions, error } = await supabase
        .from('pomodoro_sessions')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (sessions) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalSessions = sessions.length;
        const completedSessions = sessions.filter((s) => s.completed).length;
        const totalFocusTime = sessions
          .filter((s) => s.type === 'focus' && s.completed)
          .reduce((acc, s) => acc + s.duration, 0);
        const todayFocusTime = sessions
          .filter(
            (s) =>
              s.type === 'focus' &&
              s.completed &&
              new Date(s.completed_at) >= today
          )
          .reduce((acc, s) => acc + s.duration, 0);

        setStats({
          totalSessions,
          completedSessions,
          totalFocusTime,
          todayFocusTime,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-3" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      icon: Target,
      value: stats.completedSessions,
      label: 'Completed Sessions',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Clock,
      value: formatTime(stats.totalFocusTime),
      label: 'Total Focus Time',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: TrendingUp,
      value: formatTime(stats.todayFocusTime),
      label: 'Today\'s Focus Time',
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      icon: Award,
      value: stats.totalSessions,
      label: 'Total Sessions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <div className={`${item.bgColor} ${item.color} p-3 rounded-full w-fit mb-3`}>
            <item.icon className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {item.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
