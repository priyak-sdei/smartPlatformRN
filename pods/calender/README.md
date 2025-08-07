# Calendar Pod

A flexible calendar component with schedule management that supports both week and month views using react-native-calendars.

## Installation

The calendar pod is already integrated into the project. Make sure you have the required dependencies:

```bash
yarn add react-native-calendars date-fns @types/date-fns
```

## Features

- Week and Month calendar views
- Schedule list with time slots
- Animated transitions between dates
- Event management with status indicators
- Automatic scrolling to first event
- Theme integration
- Localization support

## Usage

### Basic Calendar with Schedule

```typescript
import { CalendarView, useCalendar, ScheduleList } from '@pods/calender';
import { useTheme } from '@shared/theme';

const MyComponent = () => {
  const { selectedDate, handleDateSelect } = useCalendar();
  const { theme } = useTheme();
  const scheduleListRef = useRef<{ scrollToFirstEvent: () => void }>(null);

  // Example events data
  const events = [
    {
      id: '1',
      title: 'Meeting',
      startTime: '09:00',
      endTime: '10:00',
      type: 'meeting',
      status: 'pending',
      user: {
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg'
      }
    }
  ];

  return (
    <>
      <CalendarView
        mode="month" // or "week"
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: theme.colors.primary,
          },
        }}
      />
      <ScheduleList
        ref={scheduleListRef}
        events={events}
        onEventPress={(event) => console.log('Event pressed:', event)}
      />
    </>
  );
};
```

## Components

### CalendarView Props

| Prop | Type | Description |
|------|------|-------------|
| mode | 'week' \| 'month' | Display mode of the calendar |
| onDateSelect | (date: string) => void | Callback when a date is selected |
| selectedDate | string | Currently selected date (YYYY-MM-DD format) |
| minDate | string | Minimum selectable date |
| maxDate | string | Maximum selectable date |
| markedDates | Object | Marked dates configuration |
| onChangeMode | (mode: 'week' \| 'month') => void | Callback when view mode changes |

### ScheduleList Props

| Prop | Type | Description |
|------|------|-------------|
| events | ScheduleEvent[] | Array of events to display |
| onEventPress | (event: ScheduleEvent) => void | Callback when an event is pressed |
| ref | React.RefObject | Reference for scrolling to first event |

### ScheduleEvent Type

```typescript
interface ScheduleEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed';
  user: {
    name: string;
    avatar?: string;
  };
}
```

## Hooks

### useCalendar

A custom hook for managing calendar state.

```typescript
const {
  selectedDate,         // Current selected date
  currentMonth,        // Current visible month
  handleDateSelect,    // Function to handle date selection
  handleMonthChange    // Function to handle month changes
} = useCalendar(initialDate);
```

## Styling

The calendar components use the app's theme system. You can customize the appearance by providing theme colors:

```typescript
{
  primary: '#d92029',      // Used for selection
  secondary: '#001D51',    // Used for alternate states
  text: '#222222',         // Text color
  border: '#E5E5EA',       // Border color
  background: '#FFFFFF',   // Background color
}
```

## Animation

The schedule list includes built-in animations:
- Slide and fade transitions when changing dates
- Automatic scrolling to first event
- Smooth scroll behavior

## Best Practices

1. Always provide a theme through ThemeProvider
2. Use the useCalendar hook for consistent state management
3. Handle event presses for interactive feedback
4. Consider performance with large event lists
5. Implement error boundaries for robust error handling

## Contributing

Feel free to submit issues and enhancement requests.
