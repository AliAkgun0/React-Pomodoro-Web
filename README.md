# FocusTime - Master Your Productivity

A beautiful, modern Pomodoro timer web application designed to help you maintain deep focus and boost productivity. Built with React, TypeScript, and Tailwind CSS, with real-time statistics tracking powered by Supabase.

## Features

### ⏱️ Intelligent Timer System
- **Focus Sessions**: 25-minute deep work blocks
- **Short Breaks**: 5-minute recovery periods
- **Long Breaks**: 15-minute extended breaks (after every 4 pomodoros)
- Smooth circular progress visualization with real-time countdown

### 📊 Comprehensive Statistics
- Track completed pomodoro sessions
- Monitor total focus time accumulated
- Visualize today's focus performance
- Beautiful stat cards with color-coded metrics

### 🔔 Smart Notifications
- Browser notifications alert you when sessions complete
- Get reminders to switch between focus and break modes
- Customizable notification preferences

### 🌓 Theme Support
- Light and dark mode with seamless transitions
- Automatic theme detection based on system preferences
- One-click theme toggle with persistent storage

### 💾 Cloud Synchronization
- All sessions automatically saved to Supabase database
- Access your statistics across multiple devices
- Secure, anonymous user identification

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **UI Icons**: Lucide React
- **Backend**: Supabase (Database & Real-time Updates)
- **Build Tool**: Vite
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**

   Update your `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## How to Use

### Starting Your Focus Session
1. Click the **Play button** to begin a 25-minute focus session
2. Stay focused on your task until the timer ends
3. A notification will alert you when time's up

### Managing Your Sessions
- **Pause**: Pause the current session without resetting
- **Reset**: Cancel the current session and start fresh
- **Switch Mode**: Change between Focus, Short Break, and Long Break (disabled while timer is running)

### Tracking Progress
- View your completed sessions count in the header
- Check the statistics panel for detailed metrics
- Monitor your daily and total focus time

### Theme Switching
- Click the sun/moon icon in the top-right corner
- Your preference is automatically saved

## Database Schema

FocusTime stores all session data in Supabase with the following structure:

```sql
pomodoro_sessions (
  id: uuid,
  user_id: text,
  duration: integer,
  type: 'focus' | 'short_break' | 'long_break',
  completed: boolean,
  completed_at: timestamp,
  created_at: timestamp
)
```

All data is secured with Row Level Security (RLS) policies, ensuring users can only access their own data.

## Project Structure

```
src/
├── components/
│   ├── Timer.tsx              # Main timer display with progress ring
│   ├── TimerTypeSelector.tsx  # Session type switcher
│   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   └── Statistics.tsx         # Statistics dashboard
├── hooks/
│   ├── usePomodoro.ts         # Timer logic and state management
│   └── useTheme.ts            # Theme management
├── lib/
│   └── supabase.ts            # Supabase client configuration
└── App.tsx                    # Main application component
```

## Key Features Explained

### Smart Timer Logic
- Automatic session progression from focus → break cycles
- Long breaks trigger after every 4 completed focus sessions
- Session completion automatically saves to database
- Graceful pause/resume functionality

### Progressive Statistics
- Real-time statistics calculation from database
- Automatic daily breakdown of focus time
- Visual hierarchy with color-coded metrics
- Responsive loading states

### Offline-First Approach
- Local storage for theme preferences
- Automatic retry on database sync failures
- Seamless experience even with network interruptions

## Browser Notifications

Enable notifications for the best experience:
- Allow notifications when prompted on first start
- Receive alerts when each session completes
- Switch between focus and break modes with clarity

## Performance

- **Optimized Bundle**: ~83kb gzipped JavaScript
- **Fast Build**: Powered by Vite for instant development server startup
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: 60fps transitions and interactions

## Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
npm run preview    # Preview production build locally
```

### Code Quality
- TypeScript for type safety
- ESLint for code consistency
- Tailwind CSS for maintainable styling

## Customization

### Adjust Timer Durations
Edit the `TIMER_DURATIONS` object in `src/hooks/usePomodoro.ts`:

```typescript
const TIMER_DURATIONS = {
  focus: 25 * 60,        // in seconds
  short_break: 5 * 60,
  long_break: 15 * 60,
};
```

### Modify Color Scheme
Tailwind utility classes are used throughout. Update `src/components/Timer.tsx` and other components to customize colors:

```typescript
'stroke-blue-500'   // for focus sessions
'stroke-green-500'  // for short breaks
'stroke-amber-500'  // for long breaks
```

## Troubleshooting

### Notifications Not Working
- Ensure your browser has notification permissions enabled
- Check browser settings for FocusTime notification permissions
- Reload the page and click the play button again

### Statistics Not Updating
- Verify your Supabase credentials in `.env`
- Check browser console for any API errors
- Ensure you have internet connectivity

### Theme Not Persisting
- Check if localStorage is enabled in your browser
- Clear browser cache and reload
- Try a different browser to rule out local issues

## Privacy & Security

- Anonymous user identification via browser storage
- No personal data collection
- All data encrypted in transit via Supabase
- Row Level Security ensures data isolation
- Open source and auditable code

## License

MIT - Feel free to use and modify for your own projects

## Contributing

We welcome contributions! Feel free to submit issues and pull requests to help improve FocusTime.

---

**Ready to focus?** Start your first pomodoro session today and watch your productivity soar! 🚀
