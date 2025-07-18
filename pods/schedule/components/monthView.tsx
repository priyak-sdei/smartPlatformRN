import { colors } from '@shared/theme';
import { LeftArrow, RightArrow } from '@src/assets/svg';
import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useMonth } from '../hooks/useMonth';

const MonthView = () => {
  const { selectedDay, markedDates, onDayPress } = useMonth();
  return (
    <View>
      <Calendar
        onDayPress={day => {
          onDayPress(day);
          console.log('selected day', day);
        }}
        renderArrow={direction =>
          direction === 'left' ? (
            <LeftArrow height={20} width={20} />
          ) : (
            <RightArrow height={20} width={20} />
          )
        }
        theme={{
          backgroundColor: colors.placeholder,
          calendarBackground: colors.background,
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.primary,
          todayTextColor: colors.primary,
          dayTextColor: colors.secondary,
          textDisabledColor: colors.placeholder,
          todayBackgroundColor: colors.secondary,
        }}
        markedDates={{
          ...markedDates,
          [selectedDay]: {
            dots: true,
            dotColor: '#000000',
            selected: true,
            selectedColor: colors.primary,
            selectedTextColor: colors.secondary,
            selectedDotColor: '#FFFF00',
          },
        }}
      />
    </View>
  );
};

export default MonthView;
