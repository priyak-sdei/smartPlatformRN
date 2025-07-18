import { useState } from 'react';
import { Mode } from 'react-native-big-calendar';

export function useSchedule() {
  const events = [
    {
      title: 'Meeting',
      start: new Date(2025, 1, 11, 10, 0),
      end: new Date(2020, 1, 11, 10, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2025, 1, 11, 15, 45),
      end: new Date(2020, 1, 11, 16, 30),
    },
  ];
  const [calendarMode, setCalendarMode] = useState<Mode | undefined>('month');

  return {
    events,
    calendarMode,

    setCalendarMode,
  };
}
