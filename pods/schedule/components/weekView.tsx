import { verticalScale } from '@src/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
}
export interface CalendarProps {
  events: CalendarEvent[];
}

const WeekView = ({ events }: CalendarProps) => {
  return (
    <View style={styles.weekViewContainer}>
      <Calendar events={events} height={500} />
    </View>
  );
};

export default WeekView;

const styles = StyleSheet.create({
  weekViewContainer: {
    marginTop: verticalScale(15),
  },
});
