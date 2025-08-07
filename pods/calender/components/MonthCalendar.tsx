import React, { useMemo } from 'react';
import { Calendar } from 'react-native-calendars';
import { CalendarViewProps } from '../types';
import { useTheme } from '@shared/theme';

const MonthCalendar: React.FC<CalendarViewProps> = ({
  onDateSelect,
  selectedDate,
  minDate,
  maxDate,
  markedDates,
  ...props
}) => {
  const { theme } = useTheme();
  
  const calendarTheme = useMemo(() => ({
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.background,
    textSectionTitleColor: theme.colors.text,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.background,
    todayTextColor: theme.colors.primary,
    dayTextColor: theme.colors.text,
    textDisabledColor: theme.colors.border,
    arrowColor: theme.colors.primary,
  }), [theme]);

  return (
    <Calendar
      {...props}
      theme={calendarTheme}
      onDayPress={({ dateString }) => onDateSelect?.(dateString)}
      markedDates={{
        ...markedDates,
        [selectedDate || '']: {
          ...markedDates?.[selectedDate || ''],
          selected: true,
        },
      }}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export default MonthCalendar;
