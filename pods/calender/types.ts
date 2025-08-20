import { CalendarProps } from 'react-native-calendars';

export interface CalendarTheme {
  backgroundColor?: string;
  calendarBackground?: string;
  textColor?: string;
  selectedDayBackgroundColor?: string;
  selectedDayTextColor?: string;
  todayTextColor?: string;
  dayTextColor?: string;
  monthTextColor?: string;
  indicatorColor?: string;
}

export interface CalendarViewProps extends Partial<CalendarProps> {
  mode: 'week' | 'month';
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
  minDate?: string;
  maxDate?: string;
  customTheme?: CalendarTheme;
  showWeekNumbers?: boolean;
  showEventIndicators?: boolean;
  headerStyle?: any;
  markedDates?: {
    [key: string]: {
      marked?: boolean;
      selected?: boolean;
      selectedColor?: string;
      dotColor?: string;
      events?: ScheduleEvent[];
    };
  };
}

export interface ScheduleEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
  status?: 'pending' | 'in-progress' | 'completed';
  user: {
    name: string;
    avatar?: string;
  };
}

export interface TimeSlot {
  time: string;
  events: ScheduleEvent[];
}
