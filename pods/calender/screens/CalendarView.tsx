import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarViewProps } from '../types';
import MonthCalendar from '../components/MonthCalendar';
import WeekCalendar from '../components/WeekCalendar';
import { useTheme } from '@shared/theme';

const CalendarView: React.FC<CalendarViewProps> = ({
  mode = 'month',
  selectedDate,
  onDateSelect,
  customTheme,
  showWeekNumbers,
  showEventIndicators,
  headerStyle,
  markedDates,
  ...props
}) => {
  const { theme } = useTheme();

  const defaultTheme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.background,
    textColor: theme.colors.text,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor:theme.colors.background,
    todayTextColor: theme.colors.primary,
    dayTextColor: theme.colors.text,
    monthTextColor: theme.colors.text,
    indicatorColor: theme.colors.primary,
    ...customTheme,
  };

  return (
    <View style={[styles.container, { backgroundColor: defaultTheme.backgroundColor }]}>
      {mode === 'month' ? (
        <MonthCalendar
          mode={mode}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          theme={defaultTheme}
          showWeekNumbers={showWeekNumbers}
          showEventIndicators={showEventIndicators}
          headerStyle={headerStyle}
          markedDates={markedDates}
          {...props}
        />
      ) : (
        <WeekCalendar
          mode={mode}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          theme={defaultTheme}
          showEventIndicators={showEventIndicators}
          markedDates={markedDates}
          {...props}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default CalendarView;
