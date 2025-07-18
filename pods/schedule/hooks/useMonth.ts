import moment from 'moment';
import { useState } from 'react';

export function useMonth() {
  const [selectedDay, setSelectedDay] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [markedDates, setMarkedDates] = useState({});
  const onDayPress = (day: any) => {
    setSelectedDay(day.dateString);
    setMarkedDates(day.dateString);
  };
  return {
    selectedDay,
    markedDates,
    onDayPress,
  };
}
