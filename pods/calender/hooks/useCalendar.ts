import { useCallback, useState } from 'react';
import { format } from 'date-fns';

export const useCalendar = (initialDate?: string) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || format(new Date(), 'yyyy-MM-dd'));
  const [currentMonth, setCurrentMonth] = useState(format(new Date(selectedDate), 'yyyy-MM'));

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleMonthChange = useCallback((month: string) => {
    setCurrentMonth(month);
  }, []);

  return {
    selectedDate,
    currentMonth,
    handleDateSelect,
    handleMonthChange,
  };
};
