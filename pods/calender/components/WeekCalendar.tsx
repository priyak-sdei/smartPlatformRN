import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format, startOfWeek, addDays, isToday, parseISO, isSameDay } from 'date-fns';
import { CalendarViewProps } from '../types';
import { useTheme } from '@shared/theme';

const WeekCalendar: React.FC<CalendarViewProps> = ({
  onDateSelect,
  selectedDate,
}) => {
  const { theme } = useTheme();

  const weekDays = useMemo(() => {
    const currentDate = selectedDate ? parseISO(selectedDate) : new Date();
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      days.push({
        fullDate: format(date, 'yyyy-MM-dd'),
        day: format(date, 'EEE'),
        date: format(date, 'd'),
        isToday: isToday(date),
        isSelected: selectedDate ? isSameDay(date, parseISO(selectedDate)) : false
      });
    }
    return days;
  }, [selectedDate]);

  const handleDatePress = (date: string) => {
    onDateSelect?.(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekContainer}>
        {weekDays.map((item) => (
          <TouchableOpacity
            key={item.fullDate}
            style={[
              styles.dayContainer,
              item.isSelected && { 
                backgroundColor: theme.colors.primary,
                borderRadius: 12
              }
            ]}
            onPress={() => handleDatePress(item.fullDate)}
          >
            <Text style={[
              styles.dayText,
              { color: item.isSelected ? '#fff' : theme.colors.text }
            ]}>
              {item.day.slice(0, 1)}
            </Text>
            <Text style={[
              styles.dateText,
              { color: item.isSelected ? '#fff' : theme.colors.text }
            ]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 40,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WeekCalendar;
