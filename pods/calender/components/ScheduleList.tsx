import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScheduleEvent } from '../types';
import { colors, moderateScale, useTheme } from '@shared/theme';

interface ScheduleListProps {
  events: ScheduleEvent[];
  onEventPress?: (event: ScheduleEvent) => void;
}

export interface ScheduleListRef {
  scrollToFirstEvent: () => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

const ScheduleList: React.ForwardRefRenderFunction<ScheduleListRef, ScheduleListProps> = (
  { events, onEventPress },
  ref
) => {
  const { theme } = useTheme();
  const flatListRef = React.useRef<FlatList>(null);

  useImperativeHandle(ref, () => ({
    scrollToFirstEvent: () => {
      if (events.length > 0) {
        const firstEventTime = events.reduce((earliest, event) => {
          const eventHour = event.startTime.split(':')[0];
          return eventHour < earliest ? eventHour : earliest;
        }, '23');
        
        const index = timeSlots.findIndex(slot => 
          slot.startsWith(firstEventTime.padStart(2, '0'))
        );
        
        if (index !== -1) {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
          });
        }
      }
    }
  }));

  const getEventsForTimeSlot = (time: string) => {
    return events.filter(event => event.startTime.startsWith(time));
  };

  const renderTimeSlot = ({ item: time }: { item: string }) => {
    const slotEvents = getEventsForTimeSlot(time);
    if (slotEvents.length === 0) {
      return (
        <View style={styles.timeSlotContainer}>
          <Text style={[styles.timeText, { color: theme.colors.text }]}>{time}</Text>
          <View style={[styles.emptySlot, { borderColor: theme.colors.border }]} />
        </View>
      );
    }

    return (
      <View style={styles.timeSlotContainer}>
        <Text style={[styles.timeText, { color: theme.colors.text }]}>{time}</Text>
        <View style={styles.eventsContainer}>
          {slotEvents.map(event => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { backgroundColor: theme.colors.background }]}
              onPress={() => onEventPress?.(event)}
            >
              <View style={styles.eventHeader}>
                <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                  {event.title}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: event.status === 'in-progress' ? theme.colors.primary : theme.colors.secondary }
                ]}>
                  <Text style={styles.statusText}>
                    {event.status === 'in-progress' ? 'In Progress' : 'Start'}
                  </Text>
                </View>
              </View>
              <View style={styles.eventTime}>
                <Text style={[styles.timeRangeText, { color: theme.colors.text }]}>
                  {event.startTime} - {event.endTime}
                </Text>
              </View>
              <View style={styles.userInfo}>
                {event.user.avatar && (
                  <Image
                    source={{ uri: event.user.avatar }}
                    style={styles.avatar}
                  />
                )}
                <Text style={[styles.userName, { color: theme.colors.text }]}>
                  {event.user.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={timeSlots}
      renderItem={renderTimeSlot}
      keyExtractor={(item) => item}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
  },
  timeSlotContainer: {
    flexDirection: 'row',
    minHeight: moderateScale(60),
    marginBottom: moderateScale(8),
  },
  timeText: {
    width: moderateScale(60),
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  emptySlot: {
    flex: 1,
    borderLeftWidth: 1,
    marginLeft: moderateScale(8),
  },
  eventsContainer: {
    flex: 1,
    marginLeft: moderateScale(8),
  },
  eventCard: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(16),
  },
  statusText: {
    color: colors.background,
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  eventTime: {
    marginBottom: moderateScale(8),
  },
  timeRangeText: {
    fontSize: 12,
    opacity: 0.7,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    marginRight: moderateScale(8),
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default forwardRef(ScheduleList);
