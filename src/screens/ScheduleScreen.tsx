import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { CalendarView, useCalendar } from '@pods/calender';
import { useTheme } from '@shared/theme';
import ScheduleList from '@pods/calender/components/ScheduleList';

// Mock data for schedule events mapped by date
const mockEventsByDate: {
  [key: string]: Array<{
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
  }>;
} = {
  '2025-08-13': [
    {
      id: '1',
      title: 'Support Program',
      startTime: '09:00',
      endTime: '11:00',
      type: 'support',
      status: 'in-progress',
      user: {
        name: 'Brooklyn Williamson',
        avatar: 'https://i.pravatar.cc/150?u=brooklyn',
      },
    },
    {
      id: '2',
      title: 'Townhall Meeting',
      startTime: '11:00',
      endTime: '14:00',
      type: 'meeting',
      status: 'pending',
      user: {
        name: 'Jason',
        avatar: 'https://i.pravatar.cc/150?u=jason',
      },
    },
  ],
  '2025-08-14': [
    {
      id: '3',
      title: 'Support Program',
      startTime: '15:00',
      endTime: '18:00',
      type: 'support',
      status: 'pending',
      user: {
        name: 'James',
        avatar: 'https://i.pravatar.cc/150?u=james',
      },
    },
    {
      id: '4',
      title: 'Apartment Visit',
      startTime: '14:00',
      endTime: '15:00',
      type: 'meeting',
      status: 'pending',
      user: {
        name: 'Kimberly',
        avatar: 'https://i.pravatar.cc/150?u=kimberly',
      },
    },
  ],
};

const ScheduleScreen = () => {
  const { theme } = useTheme();
  const { selectedDate, handleDateSelect } = useCalendar();
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const scheduleListRef = useRef<{ scrollToFirstEvent: () => void }>(null);

  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'month' ? 'week' : 'month'));
  };

  const handleEventPress = (event: any) => {
    console.log('Event pressed:', event);
  };

  useEffect(() => {
    // Start slide out animation
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: -50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset position and start slide in animation
      slideAnimation.setValue(50);
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After animation completes, scroll to the first event
        scheduleListRef.current?.scrollToFirstEvent();
      });
    });
  }, [selectedDate, slideAnimation, fadeAnimation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Shift Schedule
        </Text>
        <TouchableOpacity
          onPress={toggleViewMode}
          style={[
            styles.viewModeButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={styles.viewModeText}>{viewMode}</Text>
        </TouchableOpacity>
      </View>

      <CalendarView
        mode={viewMode}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        markedDates={{
          ...Object.keys(mockEventsByDate).reduce((acc, date) => ({
            ...acc,
            [date]: {
              marked: true,
              dotColor: theme.colors.primary,
            },
          }), {}),
          [selectedDate]: {
            selected: true,
            selectedColor: theme.colors.primary,
          },
        }}
      />

      <Animated.View 
        style={[
          styles.scheduleContainer,
          {
            opacity: fadeAnimation,
            transform: [{ translateX: slideAnimation }],
          }
        ]}
      >
        <ScheduleList 
          ref={scheduleListRef}
          events={mockEventsByDate[selectedDate] || []} 
          onEventPress={handleEventPress} 
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewModeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  scheduleContainer: {
    flex: 1,
    marginTop: 16,
  },
});

export default ScheduleScreen;
